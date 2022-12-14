<template>
  <table :class="'table ' + props.classes " :classes="classes">
    <thead>
    <slot name="thead"></slot>
    </thead>
    <tbody>
    <slot name="tbody"></slot>
    </tbody>
  </table>
</template>

<script setup lang="ts">
const props = defineProps<{ classes: string }>()
</script>

<style>
</style>