<template>
  <VContainer>
    <VTextarea
      v-model="tagInput"
      label="Enter a new tag, adding tags helps others "
      rows="1"
    />

    <VBtn
      color="primary"
      @click="addTag"
    >
      Add Tag
    </VBtn>

    <VChipGroup>
      <VChip
        v-for="(tag, index) in tags"
        :key="index"
      >
        {{ tag }}
        <span
          class="tag-close"
          @click="deleteTag(index)"
        >&times;</span>
      </VChip>
    </VChipGroup>
    <VRow>
      <VCol cols="12">
        <VCard
          v-if='!props.loading'
          title="Suggestions"
        >
          <VChip
            v-for="(suggestion, index) in props.suggestions"
            :key="index"
            color="primary"
          >
            {{ suggestion }}
            <VBtn
              color="black"
              size="20"
              icon="mdi-playlist-plus"
              @click="addtotags(suggestion)"
            />
          </VChip>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import * as events from 'events'
const props = defineProps({
  suggestions:{
    type: String,
    required: true,
  },
  loading:{
    type:Boolean,
    required: true,
  },
})

const emit = defineEmits(['child-event'])
const emitEvent = () => {
  emit(events, tags)
}
const tagInput = ref('')
const tags = ref([])
const suggestions = ref(['Iphone', 'Apple'])
function addTag() {
  if (tagInput.value.trim() !== '') {
    tags.value.push(tagInput.value)
    tagInput.value = ''
  }
}

function deleteTag(index) {
  tags.value.splice(index, 1)
}
function addtotags(suggestion){
  tags.value.push(suggestion)
}
</script>
