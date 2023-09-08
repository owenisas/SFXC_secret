<template>
  <VBtn
    color="primary"
    class="product-buy-now"
    target="_blank"
    rel="noopener noreferrer"
    :to="href"
  >
    {{ t('message.create_a_post') }}
  </VBtn>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } =useI18n()
const store = useStore()
const isLoggedIn = computed(() => store.state.isLoggedIn)
const href = computed(() => {
  return isLoggedIn.value ? '/create_post' : '/login'
})
</script>

<style lang="scss" scoped>
.product-buy-now {
  position: fixed;
  z-index: 4;
  inset-block-end: 5%;
  inset-inline-end: 79px;

  .v-application &.v-btn.v-btn--elevated {
    box-shadow: 0 1px 20px 1px rgb(var(--v-theme-primary)) !important;

    &:hover {
      box-shadow: none !important;
    }
  }
  @media (max-width: 600px) {
    bottom: 30px;
    right: 30px;
  }
}
</style>
