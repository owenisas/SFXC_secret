<template>
  <VDialog
    v-model="localShow"
    width="500"
  >
    <VCard
      class="pa-4"
    >
      <VCardTitle
        class="headline grey lighten-2"
        primary-title
      >
        Coming Soon!
      </VCardTitle>

      <VCardText>
        Please follow our page for updates
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn
          variant="text"
          href="https://www.instagram.com/the_sfxc_secret/"
        >
          Link To Our Page
        </VBtn>
        <VBtn
          color="primary"
          text
          @click="close"
        >
          Close
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup>
const props = defineProps(  {
  show:{
    type:Boolean,
    required:true,
  },
})
const emit = defineEmits(['closedialog'])
const localShow = ref(props.show)

const close = () =>{
  localShow.value = false
  emit('closedialog')}
watch(
  () => props.show,
  newVal => {
    localShow.value = newVal
  },
)
</script>
