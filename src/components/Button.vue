<script setup lang="ts">
defineProps({
  variant: {
    type: String,
    required: false,
    default: 'primary'
  }
})
</script>

<template>
  <button
    class="w-full sm:w-fit h-8 shrink-0 flex items-center justify-center gap-1.5 px-4 rounded-md font-montserrat-medium text-foreground disabled:bg-light-1"
    :class="{
      'bg-primary text-white': variant === 'primary',
      'border border-light-2': variant === 'outline'
    }"
  >
    <slot />
  </button>
</template>
