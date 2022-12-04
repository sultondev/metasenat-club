<template>
  <section class="sect-main py-[24px] xl:max-h-[88px] custom:px-[120px] sm:px-[20px] bg-white" v-cloak>
    <div class="container mx-auto ">
      <ul class="main-list flex xl:justify-between xl:items-center xl:flex-row md:flex-col md:items-start gap-[24px]">
        <li class="main-list__item flex items-center border-[2px] border-[#E0E7FF] overflow-hidden box-content rounded-[6px] text-[12px]">
          <slot name="left"></slot>
        </li>
        <li class="main-list__item flex gap-[20px] items-center">
          <slot name="right"></slot>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">


</script>

<style></style>