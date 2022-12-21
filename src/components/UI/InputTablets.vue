<template>
  <ul class="tablet-list flex border-2 border-[#E0E7FF] overflow-hidden w-full justify-between rounded-md ">
    <li class="tablet-list__item grow flex text-center" v-for="(tablet, idx) in options">
      <label :for="tablet.id"
             class="grow text-[#3366FF] py-2 transition-all w-full ease-linear cursor-pointer"
             :class="{'bg-[#3366FF] !text-white': tablet.value === value, 'hover:bg-blue-200': tablet.value !== value }">
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

import {Ref, ref, watch} from "vue";

type option = {
  title: string
  value: string
  id: string
}

interface InputTabletsProps {
  options: option[],
  defaultValue: string
}

interface Emits {
  (e: "update:modelValue", val: string): void
}


const props = defineProps<InputTabletsProps>()
const emit = defineEmits<Emits>()
const value: Ref<string> = ref(props.defaultValue ?? "")

watch(() => value.value, () => {
  emit("update:modelValue", value.value)
  console.log(value.value)
})

watch(() => props.defaultValue, () => {
  value.value = props.defaultValue
  emit('update:modelValue', value.value)
})

if (props.defaultValue) {
  value.value = props.defaultValue
  emit("update:modelValue", value.value)
}


</script>

<style>

</style>