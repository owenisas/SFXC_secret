<template>
  <Loading
    v-if="isLoading"
  />
  <ErrorHeader
    v-if="no_listing&&!loading"
    error-description="This post does not exist, please try again"
    error-title="Post Not Found"
    error-code="404"
  />
  <VRow
    v-if="!no_listing&&!loading"
  >
    <VCol 
      cols="12"
    >
      <VCard>
        <VTabs v-model="navigationTab">
          <VTab
            v-for="item in tabItems"
            :key="item"
            :value="item"
          >
            {{ item }}
          </VTab>
        </VTabs>

        <VDivider />

        <!-- tabs content -->
        <VWindow v-model="navigationTab">
          <VWindowItem
            v-for="item in tabItems"
            :key="item"
            :value="item"
          >
            <VCardItem>
              <VCardTitle>
                {{ Listingdata.title }}
              </VCardTitle>
            </VCardItem>
            <VAvatar
              v-for="(image, index) in Listingdata.image_url"
              :key="index"
              rounded="lg"
              size="300"
            >
              <VImg
                :src="image"
              />
            </VAvatar>
            <VCardText>
              {{ Listingdata.description }}
            </VCardText>
            <VCardText>
              {{ days }}
            </VCardText>
            <VCardActions class="justify-space-between">
              <VBtn @click="toggleIcon">
                <VIcon
                  :icon="iconName"
                  color="error"
                />
                <span class="ms-2">{{ Listingdata.likes }}</span>
              </VBtn>
            </VCardActions>
          </VWindowItem>
        </VWindow>
      </VCard>
    </VCol>
    <VCol
      cols="9"
    >
      <VCard
        title="Details"
      />
    </VCol>
    <VCol
      cols="12"
      md="3"
      class="d-flex justify-end"
    >
      <!-- Maybe add tabs here for different functions -->
      <PostChat class="bottom-card" />
    </VCol>
    <VCol cols="5">
      <VCol />
    </Vcol>
  </VRow>
  <!-- add upload change when unmount -->
</template>

<script setup>
import PostChat from '@/views/chat/PostChat.vue'
import { defineProps, onMounted, ref, onUnmounted } from 'vue'
import generate from '@/assets/generate.gif'
import Loading from '@/layouts/components/Loading.vue'
import axiosInstance from '@/axiosInstance'
import ErrorHeader from '@core/components/ErrorHeader.vue'
const props = defineProps({
  postid: String,
})
const isLoading = ref(true)
const iconName = ref('mdi-heart-outline')
const no_listing = computed(() => Listingdata.value.title.length === 0)

const toggleIcon = () => {
  iconName.value =
    iconName.value === 'mdi-heart-outline' ? 'mdi-heart' : 'mdi-heart-outline'
  Listingdata.value.likes =
    iconName.value === 'mdi-heart' ? Listingdata.value.likes + 1 :Listingdata.value.likes -1
}
const labels = ref(  'Try AI Chat!')
const navigationTab = ref('ITEM ONE')
const tabItems = [
  'ITEM ONE',
  'ITEM TWO',
  'ITEM THREE',
]
function AIgenerate(prompt) {
  console.log("future function")
  labels.value = 'testing'
}
const days = ref('')
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
const is_liked = ref(false)
const sendlike = async is_liked => {
  try {
    const response = await axiosInstance.post('/like_post', { postid: props.postid, is_liked: is_liked })
    if (response.status === 200) {
      console.log(response.data)
    } else {
      throw new Error('Network response was not ok')
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error)
  }
}
const requestPost = async () => {
  try {
    const response = await axiosInstance.post('/post/', { postid: props.postid })
    if (response.status === 200) {
      console.log(response.data)
      const message = response.data.message
      Listingdata.value.title = response.data.title
      Listingdata.value.price = response.data.price
      Listingdata.value.description = response.data.description
      Listingdata.value.created_date = new Date(response.data.created_date)
      days.value = formatTimeDiff(new Date() - new Date(response.data.created_date))
      Listingdata.value.likes = response.data.likes
      Listingdata.value.image_url = response.data.image_url
      is_liked.value = response.data.liked
      if (is_liked.value === true){
        iconName.value = 'mdi-heart-outline'
      }
      isLoading.value = false
    } else {
      throw new Error('Network response was not ok')
    }
  } catch (error) {
    isLoading.value = false
    console.error('There was a problem with the fetch operation:', error)
  }
}
const Listingdata = ref({
  title:'',
})
onMounted(() => {
  requestPost()
})
onUnmounted(() => {
  if (iconName.value === 'mdi-heart'){
    sendlike(true)
  }else if (is_liked.value === true && iconName.value === 'mdi-heart-outline'){
    sendlike(false)
  }
})
</script>

<style scoped>
.no-hover:hover {
  background-color: transparent !important;
}
.bottom-card {
  width: 100%;
}

@media (min-width: 960px) {
  .bottom-card {
    position: sticky;
    bottom: 0;
  }
}
</style>
