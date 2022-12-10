<template>
  <ul class="tablet-list flex my-[32px] overflow-hidden border-2 border-[#B2B7C1] w-fit rounded-md ">
    <li class="tablet-list__item" v-for="(tablet, idx) in options">
      <label :for="tablet.id" class="py-2 px-8 text-[#3366FF]"
             :class="{'bg-[#3366FF] text-white': tablet.value === value}">
        <input type="radio" :id="tablet.id" :value="tablet.value"
               name="tablet"
               v-model="value"
               class="appearance-none">
        {{ tablet.title }}
      </label>
    </li>
  </ul>
</template>

<script setup lang="ts">

import {ref, watch} from "vue";

type option = {
  title: string
  value: string
  id: string
  selected: boolean
}

interface InputTabletProps {
  options: option[]
}

interface Emits {
  (e: "update:modelValue", val: string[]): void
}


const props = defineProps<InputTabletProps>()
const emit = defineEmits<Emits>()
const value: any = ref("")

watch(() => value.value, () => {
  emit("update:modelValue", value.value)
})

// watch(() => props.resetValue, () => {
//   value.value = props.resetValue
// })

</script>

<style>

</style>