<template>
  <div class="loading-container">
    <VProgressCircular
      indeterminate
      color="primary"
      :size="70"
      :width="7"
    />
  </div>
</template>

<script>
export default {
  name: 'LoadingComponent',
}
</script>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
