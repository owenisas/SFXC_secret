<template>
  <VCard
    max-height="500"
  >
    <div class="d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row">
      <div class="ma-auto pa-5">
        <RouterLink :to="link">
          <VImg
            width="137"
            :src="preview"
          />
        </RouterLink>
      </div>

      <VDivider :vertical="$vuetify.display.mdAndUp" />
      <div>
        <VCardText class="position-relative">
          <!-- User Avatar -->
          <RouterLink :to="'/user/'+user">
            <VAvatar
              size="70"
              class="avatar-center"
            >
              <VImg :src="avatar" />              
            </VAvatar>
          </RouterLink>
          <!-- Title, Subtitle & Action Button -->
          <VCardTitle class="pa-0">
            {{ user }}
          </VCardTitle>
          <VCardSubtitle class="text-caption pa-0">
            London, UK
          </VCardSubtitle>
        </VCardText>
        <VDivider />
        <VCardItem>
          <VCardTitle>
            {{ title }}
          </VCardTitle>
        </VCardItem>

        <VCardText>
          {{ truncatedDescription }}
        </VCardText>

        <VCardText class="text-subtitle-1">
          <span>Price :</span> <span class="font-weight-bold">{{ price }}</span>
        </VCardText>

        <VCardActions class="justify-space-between">
          <VBtn @click="toggleIcon">
            <VIcon
              :icon="iconName"
              color="error"
            />
            <span class="ms-2">{{ likes }}</span>
          </VBtn>

          <VBtn
            color="secondary"
            icon="mdi-share-variant-outline"
            @click="shareContent"
          />
        </VCardActions>
      </div>
    </div>
  </VCard>
</template>

<script setup>
import avatar1 from '@/assets/images/avatars/avatar-1.png'
import { ref, defineProps, computed } from 'vue'
const props = defineProps({
  preview: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  user:{
    type: String,
    required: true,
  },
  avatar:{
    type: String,
    required: true,
  },
})
const shareContent = () => {
  if (navigator.share) {
    navigator
      .share({
        title: props.title,
        text: 'Check out this Item!',
        url: 'https://marketplace.owenisas.com'+props.link,
      })
      .then(() => {
        console.log('Content shared successfully')
      })
      .catch(error => {
        console.error('Error sharing content:', error)
      })
  } else {
    console.error('Web Share API not supported')
  }
}

const maxLength = 20
const iconName = ref('mdi-heart-outline')
const truncatedDescription = computed(() => {
  if (props.description.length > maxLength) {
    return props.description.slice(0, maxLength) + '...'
  }

  return props.description
})
const toggleIcon = () => {
  iconName.value =
    iconName.value === 'mdi-heart-outline' ? 'mdi-heart' : 'mdi-heart-outline'
}
</script>
