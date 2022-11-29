<template>
  <section class="dashboard" v-cloak>
    <div class="container mx-auto">
      <div class="mb-[28px]" v-if="dashboardFields">
        <ul class="dashboard-list flex justify-between gap-[28px]">

          <li class="flex items-center gap-[16px] flex-wrap p-[24px] rounded-[8px] bg-white w-[381px]">
            <div class="bg-[#4C6FFF1A] py-[14px] px-[10px] rounded-[12px]">
              <img src="@/assets/icons/website/money-1.svg" class="w-[28px] h-[20px]" alt="">
            </div>
            <div class="">
              <p class="text-[12px] text-[#7A7A9D]">
                Jami to‘langan summa
              </p>
              <p class="text-[20px] font-bold">
                {{ numFormat(dashboardFields.total_paid) }} <span class="text-[#B2B7C1]">UZS</span>
              </p>
            </div>
          </li>

          <li class="flex items-center gap-[16px] flex-wrap p-[24px] rounded-[8px] bg-white w-[381px]">
            <div class="bg-[#EDC7001A] py-[14px] px-[10px] rounded-[12px]">
              <img src="@/assets/icons/website/money-2.svg" class="w-[28px] h-[20px]" alt="">
            </div>
            <div class="">
              <p class="text-[14px] text-[#7A7A9D]">
                Jami so‘ralgan summa
              </p>
              <p class="text-[20px] font-bold">
                {{ numFormat(dashboardFields.total_need) }} <span class="text-[#B2B7C1]">UZS</span>
              </p>
            </div>
          </li>
          <li class="flex items-center gap-[16px] flex-wrap p-[24px] rounded-[8px] bg-white w-[381px]">
            <div class="bg-[#ED72001A] py-[14px] px-[10px] rounded-[12px]">
              <img src="@/assets/icons/website/money-3.svg" class="w-[28px] h-[20px]" alt="">
            </div>
            <div class="">
              <p class="text-[14px] text-[#7A7A9D]">
                To‘lanishi kerak summa
              </p>
              <p class="text-[20px] font-bold">
                {{ numFormat(dashboardFields.total_must_pay) }} <span class="text-[#B2B7C1]">UZS</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="" v-else>
        Loading...
      </div>
      <div class="mx-auto">
        <img src="@/assets/images/dashboard/chart.svg"
             class="w-full object-cover 2xl:min-h-[420px] 3xl:min-h-[520px] xl:min-w-[1200px] xl:h-[402px] "
             alt="">
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {inject, ref} from "vue";

const axios: any = inject('axios')
const dashboardFields: any = ref([])
const numFormat: any = inject('numFormat')
const loading = ref(true)

async function fetchData(url: string) {
  const response = await axios.get(url)
  if (response.status === 200) {
    dashboardFields.value = response.data;
    loading.value = false
  }
}

fetchData("/dashboard")

</script>

<style></style>