<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()
const currentTheme = computed(() => {
  return vuetifyTheme.current.value.colors
})
</script>

<template>
  <VCard>
    <VCardText>
      <h6 class="text-h6">
        2,856
      </h6>

      <VueApexCharts
        :options="chartOptions"
        :series="series"
        :height="95"
      />

      <p class="text-center font-weight-semibold mb-0">
        Sessions
      </p>
    </VCardText>
  </VCard>
</template>
