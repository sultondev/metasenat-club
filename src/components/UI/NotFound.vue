<template>
  <div class="text-2xl py-[40px] mx-auto"
       v-show="props.condition">
    <div class="max-w-fit mx-auto">
      <span>{{ props.text }}</span>
      <slot></slot>
    </div>
  </div>

</template>

<script setup lang="ts">
const props = defineProps<{ condition: boolean, text: string }>()
</script>

