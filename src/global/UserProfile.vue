<!-- src/components/UserProfile.vue -->
<template>
  <LoadingComponent
    v-if="loading"
  />
  <ErrorHeader
    v-if="no_user&&!loading"
    error-description="This user does not exist, please try again"
    error-title="User Not Found"
    error-code="404"
  />
  <VRow
    v-if="!no_user&&!loading"
  >
    <VCol cols="12">
      <VCard
        title="Account Details"
      >
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded="lg"
            size="200"
            class="me-6"
          >
            <VImg
              :src="userdata.avatar_url"
            />
          </VAvatar>
          <!-- 👉 User Info -->
          <VCardTitle>
            <h3>{{ username }}</h3>
          </VCardTitle>
        </VCardText>
        <VDivider />
        <VRow class="match-height" />
      </VCard>
    </VCol>
    <VCol 
      v-if="listings.length>=1"
      cols="12"
    >
      <VCard title="Listings">
        <VRow
          class="match-height"
        >
          <VCol
            v-for="(post, index) in processedListings"
            :key="index"
            cols="6"
          >
            <VCard>
              <PostPreview
                :photo="post.preview"
                :title="post.title"
                :likes="post.likes"
                :price="post.price"
                :description="post.description"
                :link="post.redirect"
              />
            </VCard>
          </VCol>
        </VRow>

      </VCard>
    </VCol>
  </VRow>
  <VCol
    v-else
    cols="12"
  >

  </VCol>
</template>

<script setup>
import ErrorHeader from '@core/components/ErrorHeader.vue'
import PostPreview from '@/views/pages/user-profile/PostPreview.vue'
import { defineProps, onMounted, ref } from 'vue'
import LoadingComponent from '@/layouts/components/Loading.vue'
import axiosInstance from '@/axiosInstance'

const props = defineProps({
  username: String,
})
const isLarge = computed(()=> typeof window !== 'undefined' && window.innerWidth > 700)
const loading = ref(true)
const no_user = computed(() => userdata.value.username.length === 0)

const userdata = ref({
  username:'',
  avatar_url:'',
  register:'',
})
const listings = ref([])
const requestUser = async () => {
  try {
    const response = await axiosInstance.post('/user/', { username: props.username })
    if (response.status === 200) {
      loading.value = false
      console.log(response.data)
      const message = response.data.message
      userdata.value.username = response.data.username
      userdata.value.register = response.data.register
      userdata.value.avatar_url = response.data.avatar
      listings.value = response.data.listings
    } else {
      throw new Error('Network response was not ok')
    }
  } catch (error) {
    loading.value = false
    console.error('There was a problem with the fetch operation:', error)
  }
}
const processedListings = computed(() => {
  return listings.value.map(listing => {
    return {
      ...listing,
      displayPrice: `$${listing.price.toFixed(2)}`,
    }
  })
})
onMounted(() => {
  requestUser()
})
</script>
