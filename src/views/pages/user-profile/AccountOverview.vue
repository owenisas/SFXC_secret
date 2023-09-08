<script setup>
import PostPreview from '@/views/pages/user-profile/PostPreview.vue'
import MobilePostPreview from '@/MobileComponent/MobilePostPreview.vue'
import LoadingComponent from '@/layouts/components/Loading.vue'
import { onMounted } from 'vue'
import axiosInstance from '@/axiosInstance'
import { useStore } from 'vuex'

const isLarge = computed(()=> typeof window !== 'undefined' && window.innerWidth > 700)
const store = useStore()
const PostData = ref([

])
const isLoading = ref(true)
const posts = ref([])
const refInputEl = ref()
const accountData = ref(null)
function formatTimeDiff(timeDiff) {
  const seconds = Math.floor(timeDiff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  if (days > 0) {
    return `${days} days ago`
  } else if (hours > 0) {
    return `${hours} hours ago`
  } else if (minutes > 0) {
    return `${minutes} minutes ago`
  } else {
    return `${seconds} seconds ago`
  }
}
onMounted(
  async () => {
    try {
      const response = await axiosInstance.post('/private-profile')
      if (response.status === 200) {
        console.log(response.data)
        accountData.value = {
          username: response.data.username,
          avatarImg: response.data.avatar,
          email: response.data.email,
          country: response.data.location,
          created_date: formatTimeDiff(new Date() - new Date(response.data.created_date)),
          location: response.data.location,
          description: response.data.description,
        }
        PostData.value = response.data.listings
        isLoading.value = false
        console.log(PostData)
      }
      else {
        store.commit('loadInitialState')

      }
    } catch (error) {
      console.error(error)
    }
  })
</script>

<template>
  <LoadingComponent
    v-if="isLoading"
  />
  <VRow
    v-else
  >
    <VCol cols="12">
      <VCard title="Account Details">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded="lg"
            size="200"
            class="me-6"
          >
            <VImg
              :src="accountData.avatarImg"
            />
          </VAvatar>
          <!-- 👉 User Info -->
          <div class="d-flex flex-wrap gap-2">
            <VCardTitle>
              <h3>{{ accountData.username }}</h3>
            </VCardTitle>
            <VCol
              cols="12"
            >
              <span>{{ accountData.description }}</span>
            </VCol>
          </div>
        </VCardText>
        <VDivider />
        <VRow class="match-height">
          <VCol />
        </VRow>
      </VCard>
    </VCol>
    <VCol
      v-if="PostData.length>=1"
      cols="12"
    >
      <VCard title="Listings">
        <VRow
          class="match-height"
        >
          <VCol
            v-for="(post, index) in PostData"
            :key="index"
            cols="6"
          >
            <VCard
              v-if="isLarge"
            >
              <PostPreview
                :photo="post.preview"
                :title="post.title"
                :likes="post.likes"
                :price="post.price"
                :description="post.description"
                :link="post.redirect"
              />
            </VCard>
            <MobilePostPreview
              v-else
              :item="post"
            />
          </VCol>
        </VRow>
      </VCard>
    </VCol>
  </VRow>
</template>
