<template>
  <button :class="[classes, 'outline-none transition-all easy flex items-center cursor-pointer']"
          @click="$emit(actionName)">
    <slot></slot>
    <span>
    {{ text }}
    </span>
  </button>
</template>

<script setup lang="ts">

interface componentProps {
  text: string
  classes?: string | [] | {}
  actionName: string
}

const props = defineProps<componentProps>()
</script>