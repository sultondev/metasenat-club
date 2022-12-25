<template>
  <div class="banner-wrapper">
    <div class="banner__image" :class="bgClr">
      <img :src="getImageUrl(imageName)" class="w-[28px] h-[20px]" alt="">
    </div>
    <div class="">
      <p class="banner__text">
        {{ text }}
      </p>
      <p class="banner__data">
        {{ sums ? numberWithSpaces(sums) : "Loading..." }}
        <span class="text-[#B2B7C1]">{{
            currency
          }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {numberWithSpaces} from "@/helpers/sum"

interface BannerProps {
  text: string;
  sums: any;
  currency: string;
  imageName: string;
  bgClr: string;
}

defineProps<BannerProps>()

function getImageUrl(name: string) {
  return new URL(`../../assets/icons/website/${name}.svg`, import.meta.url).href
}

function getBannerClr() {
  return 'bg-[banner]'
}
</script>

<style>
.banner-wrapper {
  @apply flex items-center gap-[16px] flex-wrap p-[24px] rounded-[8px] bg-white w-[380px]
}

.banner__image {
  @apply py-3.5 px-2.5 rounded-xl
}

.banner__text {
  @apply text-xs text-[#7A7A9D]
}

.banner__data {
  @apply text-xl font-bold
}
</style>