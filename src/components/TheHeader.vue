<template>
  <section class="sect-main py-6 bg-white" v-cloak>
    <div class="responsive-container">
      <ul class="sect-list" :class="{'md:gap-8 sm:gap-4': props.isFull.left}">
        <li :class="leftClasses" v-if="isFull ? isFull.left : true">
          <slot name="left"></slot>
        </li>
        <li :class="rightClasses" v-if="isFull ? isFull.right : true">
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
  isFull: {
    left: boolean
    right: boolean
  }
}

const props = defineProps<TheHeaderProps>()

</script>

<style scoped>
.sect-list {
  @apply flex justify-between lg:flex-row sm:flex-col md:gap-8 sm:gap-4
}
</style>