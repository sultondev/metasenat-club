<template>
  <TheHeader
      left-classes="flex items-center overflow-hidden box-content rounded-[6px] text-[12px] border-[2px] border-[#E0E7FF] w-fit"
      right-classes="flex gap-[20px] items-center">
    <template #left>
      <HeaderTablet/>
    </template>
    <template #right>
      <HeaderFilter/>
    </template>
  </TheHeader>


  <main class="main py-[48px] custom:px-[120px] sm:px-[20px]">
    <router-view></router-view>
  </main>

  <teleport to="#modal">
    <TheModal @close-modal="mainStore.toggleFilterModal" :show="mainStore.filterModalOpen"
              :is-modal-open="mainStore.filterModalOpen">
      <SponsorsFilterModal @close-modal="mainStore.toggleFilterModal"></SponsorsFilterModal>
    </TheModal>
  </teleport>
</template>

<script setup lang="ts">
import TheNavbar from "@/components/TheNavbar.vue"
import TheHeader from "@/components/TheHeader.vue"
import HeaderTablet from "@/components/HeaderTablet.vue"
import HeaderFilter from "@/components/HeaderFilter.vue"
import TheModal from "@/components/UI/TheModal.vue"
import SponsorsFilterModal from "@/components/ModalContents/Sponsors/SponsorsFilterModal.vue"
import {useMainStore} from "@/store/useMainStore";

const mainStore: any = useMainStore()
</script>

<style scoped>


</style>