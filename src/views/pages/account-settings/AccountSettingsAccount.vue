<script setup>
import Cropper from 'cropperjs'
import { computed, onMounted } from 'vue'
import axiosInstance from '@/axiosInstance'
import { useStore } from 'vuex'
import LoadingComponent from '@/layouts/components/Loading.vue'

const store = useStore()
const refInputEl = ref()
const accountData =  ref(null)
const accountDataLocal = ref(null)
const isAccountDeactivated = ref(false)
const validateAccountDeactivation = [v => !!v || 'Please confirm account deactivation']
const isLoading = ref(true)

const compareChanges = () => {
  const changes = {}

  for (const key in accountDataLocal.value) {
    if (accountDataLocal.value[key] !== accountData.value[key]) {
      changes[key] = {
        original: accountData.value[key],
        updated: accountDataLocal.value[key],
      }
    }
  }

  return changes
}

const resetForm = () => {
  accountDataLocal.value = structuredClone(toRaw(accountData.value))
}
const changeAvatar = file => {
  const fileReader = new FileReader()
  const {files} = file.target
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        nextTick().then(() => {
          const img = document.createElement('img')
          img.style.display = 'none' // Hide the image
          img.src = fileReader.result
          document.body.appendChild(img) // Append the image to the body
          img.onload = () => {
            const cropper = new Cropper(img, {
              aspectRatio: 1,
              viewMode: 1,
              autoCropArea: 1,
              center: true,
              guides: false,
              movable: false,
              zoomable: false,
              rotatable: false,
              scalable: false,
              ready: function() { // Add a ready event handler
                const canvas = cropper.getCroppedCanvas()
                if (canvas) { // Check if the canvas is not null
                  accountDataLocal.value.avatarImg = canvas.toDataURL('image/jpeg', 1.0)
                } else {
                  console.warn('Failed to crop image:', img.src)
                }
                cropper.destroy()
                document.body.removeChild(img) // Remove the image from the body
              },
            })
          }
        })
      }
    }
  }
}


// reset avatar image
const resetAvatar = () => {
  accountDataLocal.value.avatarImg = accountData.value.avatarImg
}

const timezones = [
  '(GMT-11:00) International Date Line West',
  '(GMT-11:00) Midway Island',
  '(GMT-10:00) Hawaii',
  '(GMT-09:00) Alaska',
  '(GMT-08:00) Pacific Time (US & Canada)',
  '(GMT-08:00) Tijuana',
  '(GMT-07:00) Arizona',
  '(GMT-07:00) Chihuahua',
  '(GMT-07:00) La Paz',
  '(GMT-07:00) Mazatlan',
  '(GMT-07:00) Mountain Time (US & Canada)',
  '(GMT-06:00) Central America',
  '(GMT-06:00) Central Time (US & Canada)',
  '(GMT-06:00) Guadalajara',
  '(GMT-06:00) Mexico City',
  '(GMT-06:00) Monterrey',
  '(GMT-06:00) Saskatchewan',
  '(GMT-05:00) Bogota',
  '(GMT-05:00) Eastern Time (US & Canada)',
  '(GMT-05:00) Indiana (East)',
  '(GMT-05:00) Lima',
  '(GMT-05:00) Quito',
  '(GMT-04:00) Atlantic Time (Canada)',
  '(GMT-04:00) Caracas',
  '(GMT-04:00) La Paz',
  '(GMT-04:00) Santiago',
  '(GMT-03:30) Newfoundland',
  '(GMT-03:00) Brasilia',
  '(GMT-03:00) Buenos Aires',
  '(GMT-03:00) Georgetown',
  '(GMT-03:00) Greenland',
  '(GMT-02:00) Mid-Atlantic',
  '(GMT-01:00) Azores',
  '(GMT-01:00) Cape Verde Is.',
  '(GMT+00:00) Casablanca',
  '(GMT+00:00) Dublin',
  '(GMT+00:00) Edinburgh',
  '(GMT+00:00) Lisbon',
  '(GMT+00:00) London',
]
const currencies = [
  'USD',
  'CNY',
  'HKD',
]
const username_error = ref('')
const email_error = ref('')
function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}
const submit = async() => {
  const changes = compareChanges()
  console.log(changes)
  if (Object.keys(changes).length > 0) {
    const formData = new FormData()
    if (changes.avatarImg) {
      formData.append('image0', dataURLtoFile(accountDataLocal.value.avatarImg, 'avatar.jpg'))
    }

    delete changes.avatarImg
    formData.append("UserData", JSON.stringify(changes))
    try {
      const response = await axiosInstance.post('/account/settings', formData)
      if (response.status === 200){
        localStorage.setItem('session_token', response.data.session_token)
        displayAlert()
      }else if(response.status === 202){
        if (response.data.email_error){
          email_error.value = response.data.email_error
        } else if (response.data.username_error){
          username_error.value = response.data.username_error
        }
      }

      // Handle the response
      console.log(response.data)
    } catch (error) {
      // Handle the error
      console.error(error)
    }
  }
}
const displayAlert = () => {
  showAlert.value = true
  setTimeout(() => {
    showAlert.value = false
  }, 5000)
}
const emailRules = [
  v => !!v || 'E-mail is required',
  v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
  v => (v && v.length <= 255) || 'E-mail must be less than 255 characters',

]
const showAlert = ref(false)
const user = computed(() => store.state.user) // Parse the user data back into an object
onMounted(
  async () => {
    try {
      const response = await axiosInstance.post('/private-settings')
      if (response.status === 200) {
        accountData.value = {
          username: response.data.username,
          avatarImg: response.data.avatarImg,
          email: response.data.email,
          org: 'ThemeSelection',
          phone: '+1 (917) 543-9876',
          address: '123 Main St, New York, NY 10001',
          state: 'New York',
          zip: '10001',
          country: response.data.location,
          language: 'English',
          timezone: '(GMT-11:00) International Date Line West',
          currency: 'USD',
        }
        accountDataLocal.value = structuredClone(toRaw(accountData.value))
        isLoading.value = false
      }
      else {
        store.commit('loadInitialState')

      }
    } catch (error) {
      console.error(error)
    }
  })
</script>

<template>
  <LoadingComponent v-if="isLoading" />
  <VRow v-else>
    <VCol cols="12">
      <VAlert
        v-model="showAlert"
        type="success"
        title="Changes Saved!"
        dismissible
      />
      <VCard title="Account Details">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded="lg"
            size="100"
            class="me-6"
          >
            <VImg
              :src="accountDataLocal.avatarImg"
            />
          </VAvatar>

          <!-- 👉 Upload Photo -->
          <form
            ref="refForm"
            class="d-flex flex-column justify-center gap-5"
          >
            <div class="d-flex flex-wrap gap-2">
              <VBtn
                color="primary"
                @click="refInputEl?.click()"
              >
                <VIcon
                  icon="mdi-cloud-upload-outline"
                  class="d-sm-none"
                />
                <span class="d-none d-sm-block">Upload new photo</span>
              </VBtn>

              <input
                ref="refInputEl"
                type="file"
                name="file"
                accept=".jpeg,.png,.jpg,GIF"
                hidden
                @input="changeAvatar"
              >

              <VBtn
                type="reset"
                color="error"
                variant="tonal"
                @click="resetAvatar"
              >
                <span class="d-none d-sm-block">Reset</span>
                <VIcon
                  icon="mdi-refresh"
                  class="d-sm-none"
                />
              </VBtn>
            </div>

            <p class="text-body-1 mb-0">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p>
          </form>
        </VCardText>

        <VDivider />

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <VRow>
              <!-- 👉Username -->
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="accountDataLocal.username"
                  :error="username_error.length!==0"
                  :error-messages="username_error"
                  label="Username"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol
                cols="12"
                md="6"
              >
                <VTextField
                  v-model="accountDataLocal.email"
                  :rules="emailRules"
                  :error="email_error.length!==0"
                  :error-messages="email_error"
                  label="E-mail"
                  type="email"
                />
              </VCol>

              <!-- 👉 Phone -->
              <!--              <VCol -->
              <!--                cols="12" -->
              <!--                md="6" -->
              <!--              > -->
              <!--                <VTextField -->
              <!--                  v-model="accountDataLocal.phone" -->
              <!--                  label="Phone Number" -->
              <!--                /> -->
              <!--              </VCol> -->

              <!-- 👉 Country -->
              <VCol
                cols="12"
                md="6"
              >
                <VSelect
                  v-model="accountDataLocal.country"
                  label="Country"
                  :items="['USA', 'Canada', 'UK', 'India', 'Australia']"
                />
              </VCol>

              <!--              &lt;!&ndash; 👉 Language &ndash;&gt; -->
              <!--              <VCol -->
              <!--                cols="12" -->
              <!--                md="6" -->
              <!--              > -->
              <!--                <VSelect -->
              <!--                  v-model="accountDataLocal.language" -->
              <!--                  label="Language" -->
              <!--                  :items="['English', 'Chinese', 'Cantonese']" -->
              <!--                /> -->
              <!--              </VCol> -->

              <!--              &lt;!&ndash; 👉 Timezone &ndash;&gt; -->
              <!--              <VCol -->
              <!--                cols="12" -->
              <!--                md="6" -->
              <!--              > -->
              <!--                <VSelect -->
              <!--                  v-model="accountDataLocal.timezone" -->
              <!--                  label="Timezone" -->
              <!--                  :items="timezones" -->
              <!--                  :menu-props="{ maxHeight: 200 }" -->
              <!--                /> -->
              <!--              </VCol> -->

              <!--              &lt;!&ndash; 👉 Currency &ndash;&gt; -->
              <!--              <VCol -->
              <!--                cols="12" -->
              <!--                md="6" -->
              <!--              > -->
              <!--                <VSelect -->
              <!--                  v-model="accountDataLocal.currency" -->
              <!--                  label="Default Currency" -->
              <!--                  :items="currencies" -->
              <!--                  :menu-props="{ maxHeight: 200 }" -->
              <!--                /> -->
              <!--              </VCol> -->

              <!-- 👉 Form Actions -->
              <VCol
                cols="12"
                class="d-flex flex-wrap gap-4"
              >
                <VBtn
                  @click="submit"
                >
                  Save changes
                </VBtn>

                <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"
                  @click.prevent="resetForm"
                >
                  Reset
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <!-- 👉 Delete Account -->
      <VCard title="Delete Account">
        <VCardText>
          <!-- 👉 Checkbox and Button  -->
          <VAlert
            color="warning"
            variant="tonal"
            class="mb-4"
          >
            <VAlertTitle class="mb-1">
              Are you sure you want to delete your account?
            </VAlertTitle>
            <p class="mb-0">
              Once you delete your account, there is no going back. Please be certain.
            </p>
          </VAlert>
          <div>
            <VCheckbox
              v-model="isAccountDeactivated"
              :rules="validateAccountDeactivation"
              label="I confirm my account deactivation"
            />
          </div>

          <VBtn
            :disabled="!isAccountDeactivated"
            color="error"
            class="mt-3"
          >
            Deactivate Account
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
