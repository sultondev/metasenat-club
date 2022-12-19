<template>
  <section class="sect-main py-[24px] bg-white" v-cloak>
    <div class="container mx-auto ">
      <ul class="flex xl:justify-between xl:items-center xl:flex-row xs:flex-col md:items-start"
          :class="listClass">
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
  leftClasses?: string | [] | {}
  rightClasses?: string | [] | {}
  listClass?: string | [] | {}
}

defineProps<TheHeaderProps>()

</script>

<style></style>