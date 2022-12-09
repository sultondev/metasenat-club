<template>
  <label :for="id" class="text-xs font-medium" :class="labelClasses">
    {{ labelTitle }}
  </label>
  <slot></slot>
</template>

<script setup lang="ts">
interface BaseFormProps {
  id: string;
  labelTitle: string;
  labelClasses?: string;
}


defineProps<BaseFormProps>()
</script>

<style>

</style>