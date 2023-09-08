<script setup>
import { useTheme } from 'vuetify'
import { defineComponent, ref } from 'vue'
import VueFacebookLoginComponentNextEs from 'vue-facebook-login-component-next'
const VFacebookLogin = ref(null)
const vuetifyTheme = useTheme()
const authProviders = [
  {
    icon: 'mdi-facebook',
    color: '#4267b2',
    colorInDark: '#4267b2',
  },
  {
    icon: 'mdi-twitter',
    color: '#1da1f2',
    colorInDark: '#1da1f2',
  },
  {
    icon: 'mdi-github',
    color: '#272727',
    colorInDark: '#fff',
  },
  {
    icon: 'mdi-google',
    color: '#db4437',
    colorInDark: '#db4437',
  },
]
defineComponent({
  setup() {

    return {
      VFacebookLogin,
    }
  },
})
</script>

<template>
  <VBtn
    v-for="link in authProviders"
    :key="link.icon"
    :icon="link.icon"
    variant="text"
    :color="vuetifyTheme.global.name.value === 'dark' ? link.colorInDark : link.color"
  />
  <VFacebookLogin app-id="966242223397117"/>
</template>
