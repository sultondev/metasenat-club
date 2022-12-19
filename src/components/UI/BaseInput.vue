<template>
  <input :type="inpType??'text'" class="w-full text-[15px] appearance-none"
         :required="required ?? true" :id="id"
         :class="[classes, {'border-rose-600': isWrong}]"
         :placeholder="hint"
         v-model="value"
         ref="baseInput"
  />
</template>

<script setup lang="ts">
import {Ref, ref, watch} from "vue";

interface BaseInputProps {
  classes?: string | [] | object
  hint?: string;
  id?: string;
  required?: boolean
  inpType?: string
  onlyNum?: boolean
  defaultValue?: any
  isWrong?: boolean
}

interface Emits {
  (e: "update:modelValue", val: string): void
}

const props = defineProps<BaseInputProps>()
const emit = defineEmits<Emits>()
const baseInput = ref("")
const value: Ref<string> = ref("")

watch(() => value.value, () => {
  if (props.onlyNum) {
    value.value = value.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
  }
  emit("update:modelValue", value.value)
})

if (props.defaultValue) {
  value.value = props.defaultValue
  emit("update:modelValue", value.value)
}


</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type=number] {
  -moz-appearance: textfield; /* Firefox */
}

</style>