<template>
  <div class="tablet-list">
    <router-link v-for="tablet in tablets" :to="tablet.link"
                 class="tablet-list__link">
      {{ tablet.title }}
    </router-link>
  </div>
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
.tablet-list {
  @apply flex border-2 rounded-md overflow-hidden
}

.tablet-list__link {
  @apply w-full text-center py-[14px] uppercase text-xs tracking-[1.13px] transition-all ease-linear font-medium text-[#3366FF99]
}

/*.main-list__link {*/
/*  @apply uppercase min-h-[40px] flex items-center px-8 min-w-[192px]  justify-center tracking-[1.13px] transition-all text-[#3366FF99] hover:bg-[#E0E7FF]*/
/*}*/


.router-link-active {
  @apply bg-primary text-white transition-all ease-linear
}

.router-link-active:hover {
  @apply bg-primary
}

</style>