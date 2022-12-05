<template>
  <section class="details">
    {{ id }}
  </section>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";

const route = useRoute()
const id = route.query.id

console.log("nigga")
</script>

<style scoped></style>