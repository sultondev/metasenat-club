<template>
  <input type="text" v-model="mValue" :placeholder="placeholder" :class="classes" :id="props.id">
</template>

<script setup lang="ts">
import {ref, watch} from "vue";

interface Props {
  modelValue: any;
  placeholder?: string;
  classes: string;
  id: string
}

interface Emits {
  (e: "update:modelValue", value: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const mValue = ref(props.modelValue)

watch(() => mValue.value, () => {
  emit("update:modelValue", mValue.value)
})

</script>