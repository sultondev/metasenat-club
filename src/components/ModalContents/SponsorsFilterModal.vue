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
          <input id="10000" type="radio" value="1000000" name="moeny-amount">
          1000000
        </label>
      </div>
    </div>
    <div class="mb-[28px]">
      <h6 class="text-xs uppercase font-medium">
        Sana
      </h6>
      <input type="date" class="">
    </div>
    <div class="separate__line mb-[28px] w-full h-[2px] bg-[#F5F5F7]"></div>
    <div class="">
      <button>Tozalash</button>
      <button>Natijalarini ko'rish</button>
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