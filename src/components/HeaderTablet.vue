<template>
  <Tablet :tablets="tablets" :variant="1"></Tablet>
</template>

<script setup lang="ts">
import Tablet from "@/components/UI/Tablets.vue";
import {ref} from "vue";

const tablets = ref([
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