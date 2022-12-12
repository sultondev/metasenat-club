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

type TabletObj = {
  title: string,
  link: string
}

interface TabletProps {
  tablets: TabletObj[]
  variant: number
}

defineProps<TabletProps>()
</script>

<style scoped>

.router-link-active {
  background-color: #3366FF;
  color: #fff;
  transition: all 0.3s;
}

.router-link-active:hover {
  background: #3366FF;
}

</style>