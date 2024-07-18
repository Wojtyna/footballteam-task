<script setup lang="ts">
import { computed } from 'vue'
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/vue/24/solid'

const BUTTON_SIZE = 32
const FALLBACK_BUTTONS_COUNT = 5

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  visibleButtons: {
    type: Number,
    required: false,
    default: 3
  },
  totalPages: {
    type: Number,
    required: true
  },
  visible: {
    type: Boolean,
    required: true
  }
})
const emit = defineEmits(['onPageChange'])

const changePage = (page: number) => {
  emit('onPageChange', page)
}

const startPage = computed(() => {
  if (props.currentPage === 1) {
    return 1
  }
  return props.currentPage - 1
})
const pages = computed(() => {
  const range = []
  for (
    let i = Math.min(startPage.value, props.visibleButtons - 1);
    i <= Math.min(startPage.value + props.visibleButtons - 1, props.totalPages);
    i++
  ) {
    range.push({
      name: i,
      isDisabled: i === props.currentPage
    })
  }

  return range
})
const isInFirstPage = computed(() => {
  return props.currentPage === 1
})
const isInLastPage = computed(() => {
  return props.currentPage === props.totalPages
})

const isPageActive = (page: number) => {
  return props.currentPage === page
}
const onClickPreviousPage = () => {
  changePage(props.currentPage - 1)
}
const onClickPage = async (page: number) => {
  changePage(page)
}
const onClickNextPage = () => {
  changePage(props.currentPage + 1)
}
</script>

<template>
  <ul
    class="w-fit max-w-full flex bg-white border rounded-md text-primary overflow-hidden"
    :style="{
      width: visible
        ? (Math.min(visibleButtons, totalPages) + 2) * BUTTON_SIZE + 'px'
        : 'fit-content'
    }"
  >
    <!-- FALLBACK -->
    <li
      v-for="(_, index) in Array(FALLBACK_BUTTONS_COUNT).fill(null)"
      v-if="!visible"
      class="size-8 border-light-2 bg-light-1 animate-pulse"
      :class="{ 'border-l': index }"
    />
    <!-- END FALLBACK -->

    <li v-if="visible">
      <button
        type="button"
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
        :class="{ 'text-foreground hover:bg-transparent': isInFirstPage }"
        class="size-8 border-r flex justify-center items-center hover:bg-light-1 shrink-0"
      >
        <ChevronDoubleLeftIcon class="size-3" />
      </button>
    </li>
    <li v-if="visible" v-for="page in pages" :key="page.name" class="flex-1">
      <button
        type="button"
        @click="onClickPage(page.name)"
        :disabled="page.isDisabled"
        :class="{
          'bg-primary text-white border-r-0 hover:bg-primary': isPageActive(page.name)
        }"
        class="w-full h-full border-r flex justify-center items-center text-sm font-montserrat-semibold hover:bg-light-1"
      >
        {{ page.name }}
      </button>
    </li>
    <li v-if="visible">
      <button
        type="button"
        @click="onClickNextPage"
        :disabled="isInLastPage"
        :class="{ 'text-foreground hover:bg-transparent': isInLastPage }"
        class="size-8 flex justify-center items-center hover:bg-light-1 shrink-0"
      >
        <ChevronDoubleRightIcon class="size-3" />
      </button>
    </li>
  </ul>
</template>
