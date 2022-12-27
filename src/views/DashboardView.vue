<template>
  <section class="dashboard" v-cloak>
    <div class="responsive-container">
      <div class="mb-[28px]" v-if="dashboardFields">
        <ul class="dashboard-list">
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
import {useI18n} from "vue-i18n";

type fieldsType = {
  total_must_pay?: number
  total_need?: number
  total_paid?: number
}

const {t} = useI18n()
const axios: any = inject('axios')
const dashboardFields: Ref<fieldsType> = ref({})
const loading = ref(true)

const bannerList = computed(() => [
  {
    text: t('dashboard.first_banner'),
    imgPath: "money-1",
    sums: dashboardFields.value.total_paid,
    currency: "UZS",
    bgClr: "bg-banner-01",
    icon: 'bg-red'
  },
  {
    text: t('dashboard.second_banner'),
    imgPath: "money-2",
    sums: dashboardFields.value.total_need,
    currency: "UZS",
    bgClr: "bg-banner-02"
  },
  {
    text: t('dashboard.third_banner'),
    imgPath: "money-3",
    sums: dashboardFields.value.total_must_pay,
    currency: "UZS",
    bgClr: "bg-banner-03"
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

<style>

.dashboard-list {
  @apply flex justify-between xl:flex-row sm:flex-col sm:items-center sm:gap-7
}
</style>