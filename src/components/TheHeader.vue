<template>
  <section class="sect-main py-[24px]  custom:px-[120px] sm:px-[20px] bg-white" v-cloak>
    <div class="container mx-auto ">
      <ul class="flex xl:justify-between xl:items-center xl:flex-row xs:flex-col md:items-start gap-[24px]">
        <li :class="leftClasses">
          <slot name="left"></slot>
        </li>
        <li :class="rightClasses">
          <slot name="right"></slot>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">

interface TheHeaderProps {
  leftClasses: string
  rightClasses: string
}

defineProps<TheHeaderProps>()

</script>

<style></style>