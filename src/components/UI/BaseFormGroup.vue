<template>
  <div v-if="variant  === '1'" class="w-full">
    <label :for="id" class="uppercase block text-xs font-medium focus mb-2" :class="[labelClasses]">
      {{ labelTitle }}
    </label>
    <slot></slot>
    <div v-for="wrong in wrongData" class="text-red-500 text-xs mt-2" :class="wrong.classes" v-show="wrong.condition">
      {{ wrong.message }}
    </div>
  </div>
  <div v-else-if="variant === '2'">
    <label :for="id" class="uppercase block text-xs font-medium focus mb-2">
      {{ labelTitle }}
    </label>
    <label :for="id" :class="[labelClasses, {'!border-rose-600': isWrong}]">
      <slot name="defVal"></slot>
      <slot></slot>
    </label>
    <div class="max-w-full whitespace-normal ">
      <div v-for="wrong in wrongData" class="whitespace-normal mt-2
       text-red-500 text-xs" v-show="wrong.condition">{{ wrong.message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type wrongType = {
  message: string
  condition: boolean,
  classes?: string | [] | {}
}


interface BaseFormProps {
  id?: string;
  variant: number | string
  labelTitle?: string;
  labelClasses?: string | [] | {};
  labelDefaultValue?: string
  isWrong?: boolean
  wrongData?: wrongType[] | wrongType
}

const props = defineProps<BaseFormProps>()
</script>

<style>

</style>