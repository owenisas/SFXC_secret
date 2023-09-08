<script setup>
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
import axiosInstance from '@/axiosInstance'
import default_avatar from '@/assets/images/default_avatar.jpg'
const store = useStore()
const isLoggedIn = computed(() => !!store.state.isLoggedIn)
const user = computed(() => store.state.user) // Parse the user data back into an object
const privileges = computed(() => user.value !== null ? "User" : "Not Logged In")
const avatar = ref('')
const avatarBadgeProps = {
  dot: true,
  location: 'bottom right',
  offsetX: 3,
  offsetY: 3,
  color: 'success',
  bordered: true,
}
const userdata = ref({
  username: user,
  privileges: privileges,
  avatar: avatar,
})
const logout = () =>{
  store.commit('setLoggedIn', false)
  store.commit('setUser', null)
  localStorage.removeItem('session_token')
  window.location.reload()
}
onMounted(
  async () => {
    try {
      const response = await axiosInstance.post('/user-avatar')
      if (response.status === 200) {
        avatar.value = response.data.avatar
      }
      else {
        avatar.value =
        store.commit('loadInitialState')
      }
    } catch (error) {
      console.error(error)
    }
  })
</script>

<template>
  <VAvatar
    style="cursor: pointer;"
    color="primary"
    variant="tonal"
  >
    <VImg :src="userdata.avatar" />
    <VBadge v-bind="avatarBadgeProps">
      <VAvatar
        style="cursor: pointer;"
        color="primary"
        variant="tonal"
      >
        <VImg
          :src="userdata.avatar"
          :alt="default_avatar"
        />

        <!-- SECTION Menu -->
        <VMenu
          activator="parent"
          width="230"
          location="bottom end"
          offset="14px"
        >
          <VList>
            <!-- 👉 User Avatar & Name -->
            <VListItem>
              <template #prepend>
                <VListItemAction start>
                  <VBadge v-bind="avatarBadgeProps">
                    <VAvatar
                      color="primary"
                      size="40"
                      variant="tonal"
                    >
                      <VImg :src="userdata.avatar" />
                    </VAvatar>
                  </VBadge>
                </VListItemAction>
              </template>

              <VListItemTitle class="font-weight-semibold">
                {{ userdata.username }}
              </VListItemTitle>
              <VListItemSubtitle class="text-disabled">
                {{ userdata.privileges }}
              </VListItemSubtitle>
            </VListItem>

            <VDivider class="my-2" />
            
            <div
              v-if="isLoggedIn"
            >
              <!-- 👉 Profile -->
              <VListItem to="user-profile">
                <template #prepend>
                  <VIcon
                    class="me-2"
                    icon="mdi-account-outline"
                    size="22"
                  />
                </template>

                <VListItemTitle>Profile</VListItemTitle>
              </VListItem>

              <!-- 👉 Settings -->
              <VListItem to="/account-settings">
                <template #prepend>
                  <VIcon
                    class="me-2"
                    icon="mdi-cog-outline"
                    size="22"
                  />
                </template>

                <VListItemTitle>Settings</VListItemTitle>
              </VListItem>

              <!-- 👉 Pricing -->
              <VListItem link>
                <template #prepend>
                  <VIcon
                    class="me-2"
                    icon="mdi-currency-usd"
                    size="22"
                  />
                </template>

                <VListItemTitle>Pricing</VListItemTitle>
              </VListItem>

              <!-- 👉 FAQ -->
              <VListItem link>
                <template #prepend>
                  <VIcon
                    class="me-2"
                    icon="mdi-help-circle-outline"
                    size="22"
                  />
                </template>

                <VListItemTitle>FAQ</VListItemTitle>
              </VListItem>

              <!-- Divider -->
              <VDivider class="my-2" />

              <!-- 👉 Logout -->
              <VListItem
                link
                @click="logout"
              >
                <template #prepend>
                  <VIcon
                    color="error"
                    class="me-2"
                    icon="mdi-logout-variant"
                    size="22"
                  />
                </template>

                <VListItemTitle>Logout</VListItemTitle>
              </VListItem>
            </div>
          </VList>
        </VMenu>
      <!-- !SECTION -->
      </VAvatar>
    </VBadge>
  </vavatar>
</template>
