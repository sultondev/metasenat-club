<template>
  <section class="filtModal min-w-[586px] p-[28px]">
    <div class="flex justify-between mb-[28px]">
      <h6 class="text-2xl">
        Filter
      </h6>
      <button class="" @click="$emit('close-modal')">
        <img src="@/assets/icons/website/close.svg" alt="">
      </button>
    </div>
    <div class="separate__line mb-[28px] w-full h-[2px] bg-[#F5F5F7]"></div>
    <div class="mb-[28px]">
      <h6 class="text-xs uppercase font-medium">
        Ariza holati
      </h6>
      <select name="" id="">
        <option v-for="item in applicationStatuses" :value="item">{{ item }}</option>
      </select>
    </div>
    <div class="mb-[28px]">
      <h6 class="text-xs uppercase font-medium">
        Homiylik summasi
      </h6>
      <div class="">
        <label for="10000">
          <input id="10000" type="checkbox" value="1000000" name="moeny-amount">
          1000000
        </label>
      </div>
    </div>
    <div class="mb-[28px]">
      <h6 class="text-xs uppercase font-medium">
        Sana
      </h6>
      <input type="date" class="border border-[#B2B7C1] rounded-[5px] bg-[#E0E7FF33]">
    </div>
    <div class="separate__line mb-[28px] w-full h-[2px] bg-[#F5F5F7]"></div>
    <div class="flex justify-end gap-[16px] transition-all">
      <button class="flex items-center  py-[9px] px-[32px] rounded-[5px] border border-[#B2B7C1] hover:bg-[#E7E7E7]">
        <span class="mr-[4px]">
          <img src="@/assets/icons/website/clean-modal.svg" alt="Eye white"></span>
        <span class="text-sm text-[#B2B7C1]">Tozalash</span>
      </button>
      <button class="bg-[#3366FF] text-white flex items-center py-[9px] px-[32px] rounded-[5px] hover:bg-[#364575]">
        <span class="mr-[20px]">
          <img src="@/assets/icons/website/eye-white.svg" alt="Eye white"></span>
        <span class="text-sm">Natijalarini ko'rish</span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">

import {ref} from "vue";

const applicationStatuses = ref([
  "barchasi",
  "yangi",
  "moderatsiyada",
  "tasdiqlangan",
  "bekor qilingan"
])
const generousSums = ref(["1000000", "5000000", "7000000", "7000000", "30000000", "50000000"])
const date = ref("")

</script>

<style>

</style>