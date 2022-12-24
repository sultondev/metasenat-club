<template>
  <TheHeader
      left-classes="header-left"
      right-classes="header-right"
  >
    <template #left>
      <HeaderTablet/>
    </template>
    <template #right>
      <HeaderFilter/>
    </template>
  </TheHeader>


  <main class="main mb-[84px] mt-7">
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import TheHeader from "@/components/TheHeader.vue"
import HeaderTablet from "@/components/HeaderTablet.vue"
import HeaderFilter from "@/components/HeaderFilter.vue"
import TheModal from "@/components/UI/TheModal.vue"
import SponsorsFilterModal from "@/components/ModalContents/Sponsors/SponsorsFilterModal.vue"
import {useMainStore} from "@/store/useMainStore";
import {useRoute, useRouter} from "vue-router";
import {ref, watch} from "vue";

const mainStore: any = useMainStore()
const router = useRouter()
const route = useRoute()
const currentRoute: any = ref(route.name || "")

watch(() => route.name, () => {
  currentRoute.value = route.name
  console.log(currentRoute.value)
})

</script>

<style>
.header-left {
  @apply lg:w-[580px] md:w-full
}

.header-right {
  @apply flex items-center gap-5
}

</style>