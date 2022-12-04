<template>
  <img :src="getImageUrl('money-1')" alt="">
</template>

<script setup lang="ts">

defineProps<{ path?: string }>()

function getImageUrl(name: string) {
  return new URL(`../../assets/icons/website/${name}.svg`, import.meta.url).href
}
</script>