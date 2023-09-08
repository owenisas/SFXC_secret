<template>
  <VCard
    color="grey-lighten-1"
  >
    <template #title>
      <span class="text-subtitle-2 text-no-wrap">
        {{ props.item.user }}
      </span>
    </template>
    <template #prepend>
      <RouterLink :to="`/user/${props.item.user}`">
        <VAvatar
          rounded="lg"
          size="30"
        >
          <VImg
            :src="props.item.avatar"
          />
        </VAvatar>
      </RouterLink>
    </template>
    <RouterLink :to="props.item.redirect">
      <VImg :src="props.item.preview" />
    </RouterLink>
    <VCardActions>
      <span class="text-subtitle-2 text-no-wrap">
        ${{ props.item.price }}
      </span>
      <VList lines='1'>
        <VListItem>
          <template #append>
            <div class="justify-self-end">
              <VBtn @click="toggleIcon">
                <VIcon
                  :icon="iconName"
                  color="error"
                />
                <span class="ms-2">{{ props.item.likes }}</span>
              </VBtn>
            </div>
          </template>
        </VListItem>
      </VList>
    </VCardActions>
  </VCard>
</template>

<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
  item:{
    type: Object,
    required: true,
  },
})
const iconName = ref('mdi-heart-outline')
const toggleIcon = () => {
  iconName.value =
    iconName.value === 'mdi-heart-outline' ? 'mdi-heart' : 'mdi-heart-outline'
}
</script>
