<template>
  <section class="dashboard" v-cloak>
    <div class="container mx-auto">
      <div class="mb-[28px]" v-if="dashboardFields">
        <ul class="dashboard-list flex justify-between gap-[28px] flex-wrap items-center">
          <li class="" v-for="banner in bannerList">
            <DashboardBanner :bg-clr="banner.bgClr" :image-name="banner.imgPath" :sums="banner.sums"
                             :currency="banner.currency" :text="banner.text"/>
          </li>
        </ul>
      </div>
      <div class="" v-else>
        Loading...
      </div>
      <div class="mx-auto">
        <DashboardChart></DashboardChart>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {computed, inject, Ref, ref} from "vue";
import DashboardBanner from "@/components/UI/DashboardBanner.vue"
import DashboardChart from "@/components/DashboardChart.vue"

type fieldsType = {
  total_must_pay?: number
  total_need?: number
  total_paid?: number
}

const axios: any = inject('axios')
const dashboardFields: Ref<fieldsType> = ref({})
const loading = ref(true)
const bannerList = computed(() => [
  {
    text: "Jami so‘ralgan summa",
    imgPath: "money-1",
    sums: dashboardFields.value.total_paid,
    currency: "UZS",
    bgClr: "ban1"
  },
  {
    text: "Jami so‘ralgan summa",
    imgPath: "money-2",
    sums: dashboardFields.value.total_need,
    currency: "UZS",
    bgClr: "ban2"
  },
  {
    text: "To'lanishi kerak summa",
    imgPath: "money-3",
    sums: dashboardFields.value.total_must_pay,
    currency: "UZS",
    bgClr: "ban3"
  }
])

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