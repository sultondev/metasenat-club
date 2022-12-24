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
.table {
  @apply border-spacing-y-3 border-separate text-sm w-full
}

.table tbody tr td {
  @apply py-5 px-4
}

.table thead tr th {
  @apply py-2 px-4
}
</style>