<template>
  <h4>
    Registration
  </h4>
  <div class="">
    <BaseForm id="ism" hint="Ism" label-title="Name" v-model="name"></BaseForm>
    {{ name }}
  </div>

</template>

<script setup lang="ts">
import BaseForm from "@/components/UI/BaseFormGroup.vue"
import {ref} from "vue";

const name = ref("")

</script>

<style></style>