<template>
  <div class="flex items-center gap-[16px] flex-wrap p-[24px] rounded-[8px] bg-white w-[381px]">
    <slot></slot>
    <div class="">
      <p class="text-[12px] text-[#7A7A9D]">
        {{ text }}
      </p>
      <p class="text-[20px] font-bold">
        {{ moneyCount ? moneyCount : "Loading..." }} <span class="text-[#B2B7C1]">{{ currency }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface BannerProps {
  text: string;
  moneyCount: string;
  currency: string;
}

defineProps<BannerProps>()
</script>