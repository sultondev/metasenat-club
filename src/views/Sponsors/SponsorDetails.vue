<template>

  <div class="">
    <TheHeader left-classes="I" right-classes="2">
      <template #left>
        <div class="">
          jwaidjwal
        </div>
      </template>
    </TheHeader>

    <section class="details">

    </section>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import TheHeader from "@/components/TheHeader.vue"

const route = useRoute()
const id = route.query.id


console.log(route.params)
</script>

<style scoped></style>