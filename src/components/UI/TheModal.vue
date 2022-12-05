<template>
  <div class="modal fixed top-0 w-auto h-auto z-[1000]">
    <div class="modal__backdrop bg-[#00000080] w-full h-screen w-screen flex justify-center items-center"
         @click.self="this.$emit('close-modal')">
      <div class="modal__container min-w-[586px] bg-white">
        <slot>Default</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style>

</style>