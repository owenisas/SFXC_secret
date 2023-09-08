<script setup>
import { VerticalNavLayout } from '@layouts'
import SFXC from '@/assets/SFXC.jpg'

// Components
import Footer from '@/layouts/components/Footer.vue'
import Notice from '@/layouts/components/Notice.vue'

const show = ref(false)
</script>

<template>
  <VerticalNavLayout>
    <Notice
      :show="show"
      @closedialog="show = false"
    />
    <!-- 👉 navbar -->
    <template #navbar>
      <VBtn
        class="text-h5"
        variant="text"
        @click="show = !show"
      >
        主頁
      </VBtn>
      <VSpacer />
      <VImg :src="SFXC" />
      <VSpacer />

      <a
        href="https://github.com/owenisas"
        target="_blank"
        rel="noopener noreferrer"
        style="color: inherit"
      >
        <VIcon
          class="ms-6 me-4"
          icon="mdi-github"
        />
      </a>
    </template>
    <!-- 👉 Pages -->
    <div class="layout-page-content">
      <RouterView />
    </div>

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>

<style lang="scss">
.app-bar-search {
  .v-input__control {
    width: 236px
  }

  .v-field__outline__start {
    border-radius: 28px 0 0 28px !important;
    flex-basis: 20px !important;
  }

  .v-field__outline__end {
    border-radius: 0 28px 28px 0 !important;
  }
}
</style>
