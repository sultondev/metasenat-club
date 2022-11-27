<template>
  <section class="dashboard">
    <div class="container mx-auto">
      <div class="mb-[28px]" v-if="dashboardFields">
        <ul class="dashboard-list flex justify-between">

          <li class="flex items-center gap-[16px] flex-wrap p-[24px] rounded-[8px] bg-white min-w-[380px]">
            <div class="bg-[#4C6FFF1A] py-[14px] px-[10px] rounded-[12px]">
              <img src="@/assets/icons/website/money-1.svg" alt="">
            </div>
            <div class="">
              <p class="text-[14px] text-[#7A7A9D]">
                Jami to‘langan summa
              </p>
              <p class="text-[20px] font-bold">
                {{ dashboardFields.total_paid }} <span class="text-[#B2B7C1]">UZS</span>
              </p>
            </div>
          </li>

          <li class="flex items-center gap-[16px] flex-wrap p-[24px] rounded-[8px] bg-white min-w-[380px]">
            <div class="bg-[#4C6FFF1A] py-[14px] px-[10px] rounded-[12px]">
              <img src="@/assets/icons/website/money-2.svg" alt="">
            </div>
            <div class="">
              <p class="text-[14px] text-[#7A7A9D]">
                Jami so‘ralgan summa
              </p>
              <p class="text-[20px] font-bold">
                {{ dashboardFields.total_need }} <span class="text-[#B2B7C1]">UZS</span>
              </p>
            </div>
          </li>
          <li class="flex items-center gap-[16px] flex-wrap p-[24px] rounded-[8px] bg-white min-w-[380px]">
            <div class="bg-[#4C6FFF1A] py-[14px] px-[10px] rounded-[12px]">
              <img src="@/assets/icons/website/money-2.svg" alt="">
            </div>
            <div class="">
              <p class="text-[14px] text-[#7A7A9D]">
                To‘lanishi kerak summa
              </p>
              <p class="text-[20px] font-bold">
                {{ dashboardFields.total_must_pay }} <span class="text-[#B2B7C1]">UZS</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="" v-else>
        Loading...
      </div>
      <div class="w-full mx-auto">
        <img src="@/assets/images/dashboard/statistic.svg" class="w-full" alt="">
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {inject, ref} from "vue";

const axios: any = inject('axios')
const dashboardFields: any = ref([])
const loading = ref(true)

async function fetchData(url: string) {
  const response = await axios.get(url)
  if (response.status === 200) {
    dashboardFields.value = response.data;
    loading.value = false
  }
}

fetchData("dashboard")

</script>

<style></style>