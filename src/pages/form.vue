<template>
  <VCard>
    <div class="d-flex justify-start align-center">
      <VCardTitle class="text-h4">
        投稿表格
      </VCardTitle>
      <VCardSubtitle>
        歡迎匿名投稿
      </VCardSubtitle>
    </div>
  </VCard>
  <VDivider class="ma-4" />
  <VCard>
    <VCardTitle>
      請問你係？
    </VCardTitle>
    <VTextField
      v-model="identity"
      label="Your Answer"
      :rules="[rules.required, rules.maxLength]"
    />
  </VCard>
  <VDivider class="ma-4" />
  <VCard>
    <VCardTitle>
      投稿類型？
    </VCardTitle>
    <VRadioGroup
      v-model="type"
      class="ml-4"
    >
      <VRadio
        v-for="i in choices"
        :key="i"
        class="font-weight-bold"
        :label="i"
        :value="i"
        :rules="[rules.required]"
      >
        <VTextField
          v-if="i==='Other:'"
          :rules="[rules.maxLength]"
        />
      </VRadio>
    </VRadioGroup>
  </VCard>
  <VDivider class="ma-4" />
  <VCard>
    <VCardTitle>
      投稿内容？
    </VCardTitle>
    <VTextField
      v-model="content"
      :rules="[rules.required, rules.maxLength]"
      label="Your Answer"
    />
  </VCard>
  <VDivider class="ma-4" />
  <VCard>
    <VCardTitle>
      有冇附件?（put down ur file/link pls)
    </VCardTitle>
    <VFileInput
      v-model="file"
      disabled
      label="Coming Soon"
    />
    <VTextField
      v-model="attachmentLink"
      label="Your Answer"
      :rules="[rules.required, rules.maxLength]"
    />
  </VCard>
  <div class="pa-4 d-flex justify-center">
    <VBtn
      style="height: 60px; width: 200px"
      :disabled="!allValid"
      @click="submit"
    >
      Submit
    </VBtn>
  </div>
</template>

<script setup>
import axiosInstance from '@/axiosInstance'
import { useRoute } from 'vue-router'

const router = useRoute()
const choices = ref([
  "奇異怪談\n", "情情塔塔\n", "吹水逸聞\n", "尋人啓事\n", "好game/歌/memes分享\n", "Other:",
])
const content = ref(null)
const identity = ref(null)
const type = ref(null)
const detail = ref(null)
const file = ref(0)
const attachmentLink = ref(null)
const rules = {
  required: value => !!value || 'Required.',
  maxLength: value => (value && value.length <= 100) || 'Maximum 100 characters allowed.',
}
const allValid = computed(() => {
  return [
    rules.required(content.value) && rules.maxLength(content.value),
    rules.required(identity.value) && rules.maxLength(identity.value),
    rules.required(type.value) && rules.maxLength(type.value),
  ].every(rule => rule === true)
})
const submit = async () => {
  try {
    const formData = new FormData()
    formData.append('identity', identity.value)
    formData.append('type', type.value)
    formData.append('content', content.value)
    if (detail.value){
      formData.append('detail', detail.value)
    }
    if (file.value) {
      formData.append('file', file.value)
    }else if (attachmentLink.value){
      formData.append('attachmentLink', attachmentLink.value)
    }
    const response = await axiosInstance.post('sfxc/form', formData)
    if (response.status === 200) {
      window.location.href = "/success"
      console.log(response)
    }
  } catch (error) {
    // Handle error - show an error message to the user
  }
}
</script>
