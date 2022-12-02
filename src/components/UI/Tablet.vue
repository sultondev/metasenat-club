<template>
  <router-link v-for="tablet in tablets" :to="tablet.link"
               class="main-list__links main-list__third uppercase
               min-h-[40px] flex items-center min-w-[192px]
               justify-center tracking-[1.13px]
               transition-all text-[#3366FF99]
               hover:bg-[#E0E7FF]">
    {{ tablet.title }}
  </router-link>
</template>

<script setup lang="ts">

interface TabletProps {
  tablets: [
    {
      title: string,
      link: string,
    }
  ]
}

defineProps<TabletProps>()
</script>