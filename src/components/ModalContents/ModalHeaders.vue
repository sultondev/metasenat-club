<template>
  <div class="w-full flex justify-between">
    <h6 class="text-2xl font-bold">
      {{ title }}
    </h6>
    <button class="text-2xl hover:text-rose-600 transition-all ease-linear" @click="emits('closeModal')">
      <span class="icon-close"></span>
    </button>
  </div>
</template>

<script setup lang="ts">

interface Props {
  title: string
}

interface Emits {
  (e: 'closeModal'): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
</script>