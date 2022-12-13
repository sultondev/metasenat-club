<template>
  <div class="flex items-center gap-[16px] flex-wrap p-[24px] rounded-[8px] bg-white w-[381px]">
    <div class="py-[14px] px-[10px] rounded-[12px]" :class="bgClr">
      <img :src="getImageUrl(imageName)" class="w-[28px] h-[20px]" alt="">
    </div>
    <div class="">
      <p class="text-[12px] text-[#7A7A9D] ">
        {{ text }}
      </p>
      <p class="text-[20px] font-bold">
        {{ sums ? numberWithSpaces(sums) : "Loading..." }} <span class="text-[#B2B7C1]">{{
          currency
        }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">

import {useSponsors} from "@/composables/sponsors";

const {numberWithSpaces} = useSponsors()

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