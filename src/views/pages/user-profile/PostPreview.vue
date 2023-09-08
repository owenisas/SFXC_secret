<template>
  <VCard>
    <div class="d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row">
      <div class="ma-auto pa-5">
        <a :href="link">
          <VImg
            width="137"
            :src="photo"
          />
        </a>
      </div>

      <VDivider :vertical="$vuetify.display.mdAndUp" />
      <div>
        <VCardItem>
          <VCardTitle>{{ title }}</VCardTitle>
        </VCardItem>

        <VCardText>
          {{ description }}
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
import { ref, defineProps } from 'vue'
const props = defineProps({
  photo: {
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


const iconName = ref('mdi-heart-outline')

const toggleIcon = () => {
  iconName.value =
    iconName.value === 'mdi-heart-outline' ? 'mdi-heart' : 'mdi-heart-outline'
}
</script>
