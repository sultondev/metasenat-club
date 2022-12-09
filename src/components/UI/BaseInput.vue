<template>
  <input :type="inpType??'text'" class="w-full text-[15px] py-[8px]" minlength="2" :required="required ?? true" :id="id"
         :class="classes"
         :placeholder="hint"
         v-model="value"/>
</template>

<script setup lang="ts">


import {ref, watch} from "vue";

interface BaseInputProps {
  classes?: string | [] | object;
  hint?: string;
  id?: string;
  required?: boolean;
  inpType?: string;
}

interface Emits {
  (e: "update:modelValue", val: string): void
}

const props = defineProps<BaseInputProps>()
const emit = defineEmits<Emits>()

const value = ref<string>("")

watch(() => value.value, () => {
  emit("update:modelValue", value.value)
})
</script>

<style>

</style>

<!--<template>-->
<!--  <input type="text" v-model="mValue" :placeholder="placeholder" :class="classes" :id="props.id">-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import {ref, watch} from "vue";-->

<!--interface Props {-->
<!--  modelValue: any;-->
<!--  placeholder?: string;-->
<!--  classes: string;-->
<!--  id: string-->
<!--}-->

<!--interface Emits {-->
<!--  (e: "update:modelValue", value: string): void-->
<!--}-->

<!--const props = defineProps<Props>()-->
<!--const emit = defineEmits<Emits>()-->

<!--const mValue = ref(props.modelValue)-->

<!--watch(() => mValue.value, () => {-->
<!--  emit("update:modelValue", mValue.value)-->
<!--})-->

<!--</script>-->