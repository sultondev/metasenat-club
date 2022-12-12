<template>
  <Tablet :tablets="tablets" :variant="1"></Tablet>
</template>

<script setup lang="ts">
import Tablet from "@/components/UI/Tablets.vue";
import {Ref, ref} from "vue";


type TabletObj = {
  title: string,
  link: string
}

const tablets: Ref<TabletObj[]> = ref([
  {
    title: "dashboard",
    link: "/main/dashboard",
  },
  {
    title: "sponsors",
    link: "/main/sponsors",
  },
  {
    title: "students",
    link: "/main/students",
  },
])

</script>

<style scoped>

</style>