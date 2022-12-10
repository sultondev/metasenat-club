<template>
  <InputTablet :options="tablets" v-model="bla">

  </InputTablet>
  {{ bla }}
</template>

<script setup lang="ts">
import InputTablet from "@/components/UI/InputTablet.vue";
import {ref} from "vue";

const bla = ref("")

const tablets = ref([
  {
    title: "Test 1",
    value: "test1",
    id: "test1"
  },

  {
    title: "Test 2",
    value: "test2",
    id: "test2"
  },
])

const valueOf = ref("")

</script>