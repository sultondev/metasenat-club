<template>
  <section class="sect-main py-6 bg-white" v-cloak>
    <div class="responsive-container">
      <ul class="sect-list"
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

<style scoped>
.sect-list {
  @apply flex md:gap-8 justify-between lg:flex-row sm:flex-col sm:gap-4
}
</style>