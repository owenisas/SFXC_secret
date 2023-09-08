<template>
  <Loading v-if="isLoading" />
  <VSheet
    v-else
    class="mx-auto"
    elevation="8"
  >
    <VCardTitle>
      NEW!🔥🔥🔥
    </VCardTitle>
    <VCardActions>
      <VBtn
        to="/newest"
        color="primary"
      >
        See all
      </VBtn>
    </VCardActions>
    <VCol
      v-for="(portion, index) in portions"
      :key="index"
      class="d-none d-sm-block"
      cols="12"
    >
      <VSlideGroup
        v-model="model[index]"
        class="pa-4"
        selected-class="bg-primary"
        show-arrows
      >
        <VSlideGroupItem
          v-for="(item, index2) in portion"
          :key="index2"
          v-slot="{ isSelected, toggle, selectedClass }"
        >
          <VCard
            color="grey-lighten-1"
            class="ma-4"
            :class="[selectedClass]"
            height="200"
            width="200"
            @click="toggle"
          >
            <VImg :src="item.preview" />
            <div class="d-flex fill-height align-center justify-center">
              <VScaleTransition>
                <VIcon
                  v-if="isSelected"
                  color="white"
                  size="48"
                  icon="mdi-close-circle-outline"
                />
              </VScaleTransition>
            </div>
          </VCard>
        </VSlideGroupItem>
      </VSlideGroup>
      <VExpandTransition>
        <VSheet
          v-if="model != null && newest[model]"
          height="300"
        >
          <div class="d-flex fill-height align-center justify-center">
            <MainPostPreview
              :user="newest[model].user"
              :title="newest[model].title"
              :link="newest[model].redirect"
              :likes="newest[model].likes"
              :price="newest[model].price"
              :description="newest[model].description"
              :preview="newest[model].preview"
              :avatar="newest[model].avatar"
            />
          </div>
        </VSheet>
      </VExpandTransition>
    </VCol>
    <VRow
      class="d-sm-none"
      no-gutters
    >
      <VCol
        v-for="(item, index) in newest"
        :key="index"
        cols="6"
      >
        <MobilePostPreview :item="item" />
      </VCol>
    </VRow>
  </VSheet>
</template>

<script setup>
import MainPostPreview from '@/views/home/MainPostPreview.vue'
import eCommerce2 from '@/assets/images/eCommerce/2.png'
import { defineProps, onMounted, ref } from 'vue'
import axiosInstance from '@/axiosInstance'
import MobilePostPreview from '@/MobileComponent/MobilePostPreview.vue'
import Loading from '@/layouts/components/Loading.vue'
import { buildSegCompareObj } from '@fullcalendar/core'
const props = defineProps({
  forYou: {
    type: Array,
    required: true,
  },
  newest: {
    type: Array,
    required: true,
  },
  isLoading:{
    type: Boolean,
    required: true,
  },
})
const portions = computed(() => {
  let portions = []
  for (let i = 0; i < props.newest.length; i += 5) {
    portions.push(props.newest.slice(i, i + 5))
  }
  
  return portions
})
const iconName = ref('mdi-heart-outline')
let model = ref([])  // Initialize model as an empty array

const itemsPerSlide = 3
const currentSlide = ref(0)

const toggleIcon = () => {
  iconName.value =
    iconName.value === 'mdi-heart-outline' ? 'mdi-heart' : 'mdi-heart-outline'
}

onMounted(
  async () => {
    console.log(portions.value)
  })
</script>

