<script setup>
import axiosInstance from '@/axiosInstance'
import { onMounted, watchEffect } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
function isBrowser() {
  const userAgent = navigator.userAgent || ''

  const browserKeywords = [
    'Chrome',
    'Safari',
    'Firefox',
    'Edge',
    'MSIE',
    'Trident',
    'Opera',
    'OPR',
  ]

  return browserKeywords.some(keyword => userAgent.includes(keyword))
}
const bow = isBrowser()
const domain = window.location.hostname
onMounted(
  async () => {
    try {
      const response = await axiosInstance.post('/')
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token)
        store.commit('loadInitialState')

      }else if (response.status === 202){
        store.commit('loadInitialState')

      }

    // Process the response
    } catch (error) {
      console.error(error)
    }
  })
</script>

<template>
  <VApp>
    <VLayout class="layout-wrapper layout-nav-type-vertical">
      <RouterView />
    </VLayout>
  </VApp>
</template>
