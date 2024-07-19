<script setup lang="ts">
import { type ButtonHTMLAttributes, type PropType } from 'vue'
const props = defineProps({
  variant: {
    type: String,
    required: false,
    default: 'primary'
  },
  loading: {
    type: Boolean,
    required: false,
    default: false
  },
  type: {
    type: String as PropType<ButtonHTMLAttributes['type']>,
    default: 'button'
  }
})
const emit = defineEmits(['click'])

const handleClickEvent = () => {
  if (!props.loading) emit('click')
}
</script>

<template>
  <button
    class="w-full sm:w-fit h-8 shrink-0 flex items-center justify-center gap-2 px-4 rounded-md font-montserrat-medium text-foreground disabled:bg-light-1"
    :class="{
      'bg-primary text-white': variant === 'primary',
      'border border-light-2': variant === 'outline',
      'opacity-50 cursor-not-allowed': loading
    }"
    :type="type"
    @click="handleClickEvent"
  >
    <div
      v-if="loading"
      class="inline-block size-4 animate-spin rounded-full border-[2px] border-solid border-current border-e-transparent align-[-0.125em] mr-1"
      role="status"
    >
      <span
        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      />
    </div>
    <slot />
  </button>
</template>
