<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: false
  },
  placeholder: {
    type: String,
    required: false,
    default: 'Aa...'
  },
  specValue: {
    type: String,
    required: false
  },
  required: Boolean,
  minlength: String,
  type: {
    type: String,
    required: false,
    default: 'text'
  }
})
const emit = defineEmits(['onChange'])

const inputRef = ref<HTMLInputElement | null>(null)
const inputValue = ref<string>('')

watchEffect(() => {
  inputValue.value = props.specValue || ''
})

const triggerFilterInput = () => {
  inputRef.value?.focus()
}

const handleInputChange = ({ target }: Event) => {
  const { value } = <HTMLInputElement>target
  inputValue.value = value
  emit('onChange', value, props.name)
}
</script>

<template>
  <div class="flex-1">
    <div v-if="title" class="pb-2 font-montserrat-medium">{{ title }}</div>
    <div
      class="w-full min-w-40 sm:max-w-96 h-8 flex items-center gap-2 bg-background border border-background py-3 px-4 rounded-md hover:cursor-text"
      :class="{ 'bg-transparent border-light-1': inputValue !== '' }"
      @click="triggerFilterInput"
    >
      <slot name="before" />
      <input
        class="bg-transparent placeholder:font-montserrat-medium min-w-0 w-full"
        ref="inputRef"
        :placeholder="placeholder"
        :name="name"
        :value="inputValue"
        :type="type"
        :required="required"
        :minlength="minlength"
        @input="handleInputChange"
      />
      <slot name="after" />
    </div>
  </div>
</template>
