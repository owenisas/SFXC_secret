<template>
  <div class="w-100 h-100 d-flex align-center justify-space-between">
    <!-- 👉 Footer: left content -->
    <span class="d-flex align-center">
      &copy;
      {{ new Date().getFullYear() }}
      Made By
      <VImg
        :src="logo"
        alt="Custom Icon"
        class="custom-icon"
      />
      <a
        href="http://owenisas.com"
        rel="noopener noreferrer"
        class="text-primary ms-1"
      >Owenisas</a>
    </span>
  </div>
</template>

<script setup>
import logo from '@/assets/logo.png'

</script>

<style>
.custom-icon {
  font-size: 1.25rem;
  width: 1.25rem;
  height: 1.25rem;
}
</style>
