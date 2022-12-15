<template>
  <button :class="classes" @click="$emit(actionName)">
    <slot></slot>
    <span>
    {{ text }}
    </span>
  </button>
</template>

<script setup lang="ts">

interface componentProps {
  text: string
  classes: string
  actionName: string
}

const props = defineProps<componentProps>()
</script>