<template>
  <div v-if="variant  == 1">
    <label :for="id" class="text-xs font-medium" :class="labelClasses">
      {{ labelTitle }}
    </label>
    <slot></slot>
  </div>
  <div v-else-if="variant == 2">
    <label :for="id" :class="labelClasses">
      <slot name="defVal"></slot>
      <slot></slot>
    </label>
  </div>
</template>

<script setup lang="ts">
interface BaseFormProps {
  id: string;
  variant: number | string
  labelTitle?: string;
  labelClasses?: string;
  labelDefaultValue?: string
}


defineProps<BaseFormProps>()
</script>

<style>

</style>