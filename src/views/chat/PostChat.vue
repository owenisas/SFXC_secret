<template>
  <VCard
    title="Future Chat system"
  >
    <VCol
      cols="12"
      class="container"
    >
      <VImg
        class="px-0 py-0 transparent no-hover"
        src="https://www.gstatic.com/lamda/images/sparkle_resting_v2_1ff6f6a71f2d298b1a31.gif"
        alt="Generate IMG"
        max-width="24"
        @click="AIgenerate"
      />
      <div class="text">
        AI Chat
      </div>
    </VCol>
    <VTextField
      :label="labels"
    >
      <template #prepend-inner>
        <VAvatar
          size="25"
          :image="generate"
        />
      </template>
    </VTextField>
  </VCard>
</template>

<script setup>
import generate from '@/assets/generate.gif'
import axios from 'axios'
import { ref } from 'vue'
function AIgenerate(prompt) {
  console.log("future function")
  labels.value = 'testing'
}
const labels = ref(  'Try AI Chat!')

</script>
