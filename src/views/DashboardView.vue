<template>
  <section class="dashboard" v-cloak>
    <div class="container mx-auto">
      <div class="mb-[28px]" v-if="dashboardFields">
        <ul class="dashboard-list flex justify-between gap-[28px] flex-wrap items-center">

          <li class="flex-wrap">
            <DashboardBanner text="Jami to‘langan summa"
                             :money-count="numberWithSpaces(dashboardFields.total_paid) || 'Loading...'"
                             currency="UZS">
              <div class="bg-[#4C6FFF1A] py-[14px] px-[10px] rounded-[12px]">
                <img src="@/assets/icons/website/money-1.svg" class="w-[28px] h-[20px]" alt="">
              </div>
            </DashboardBanner>
          </li>

          <li class="flex-wrap">
            <DashboardBanner text="Jami so‘ralgan summa"
                             :money-count="numberWithSpaces(dashboardFields.total_need) || 'Loading...' "
                             currency="UZS">
              <div class="bg-[#EDC7001A] py-[14px] px-[10px] rounded-[12px]">
                <img src="@/assets/icons/website/money-2.svg" class="w-[28px] h-[20px]" alt="">
              </div>
            </DashboardBanner>
          </li>
          <li class="flex-wrap">
            <DashboardBanner text="To'lanishi kerak summa"
                             :money-count="numberWithSpaces(dashboardFields.total_must_pay)  || 'Loading...'"
                             currency="UZS">
              <div class="bg-[#ED72001A] py-[14px] px-[10px] rounded-[12px]">
                <img src="@/assets/icons/website/money-3.svg" class="w-[28px] h-[20px]" alt="">
              </div>
            </DashboardBanner>
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
import {useSponsors} from "@/composables/sponsors";
import DashboardBanner from "@/components/UI/DashboardBanner.vue"

const axios: any = inject('axios')
const dashboardFields: any = ref([])
const {numberWithSpaces} = useSponsors()
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