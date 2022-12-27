<template>
  <Tablet :tablets="tablets" :variant="1"></Tablet>
</template>

<script setup lang="ts">
import Tablet from "@/components/UI/Tablets.vue";
import {computed, Ref, ref} from "vue";
import {useI18n} from "vue-i18n";

const {t} = useI18n()
type TabletObj = {
  title: string,
  link: string
}

const tablets: Ref<TabletObj[]> = computed(() => [
  {
    title: t('header_tabs.first'),
    link: "/main/dashboard",
  },
  {
    title: t('header_tabs.second'),
    link: "/main/sponsors",
  },
  {
    title: t('header_tabs.third'),
    link: "/main/students",
  },
])

</script>

<style scoped>

</style>