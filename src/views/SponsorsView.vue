<template>
  <section class="sponsors py-[48px]">
    <div class="container mx-auto overflow-x-scroll">
      <div class="sponsors-head px-[16px] mb-[12px]">
        <h6 class="text-[#B1B1B8] ">#</h6>
        <h6 class="text-[#B1B1B8] ">F.I.SH.</h6>
        <h6 class="text-[#B1B1B8] text-center uppercase">Tel.Raqami</h6>
        <h6 class="text-[#B1B1B8] text-center uppercase">Homiylik summasi</h6>
        <h6 class="text-[#B1B1B8] text-center uppercase">Sarflangan summa</h6>
        <h6 class="text-[#B1B1B8] text-center uppercase">Sana</h6>
        <h6 class="text-[#B1B1B8] text-center uppercase">Holati</h6>
        <h6 class="text-[#B1B1B8] text-center uppercase">Amallar</h6>
      </div>
      <div class="overflow-x-scroll" v-if="sponsorStore.sponsorsList.length > 0">
        <ul class="sponsors-body flex flex-col gap-[12px] overflow-x-scroll">
          <li class="sponsors-body__item min-w-[1200px] py-[25px] px-[16px] bg-white rounded-[8px]"
              v-for="(sponsor, idx) in sponsorStore.sponsorsList">
            <span class="">{{ idx + 1 }}</span>
            <span class="font-bold">{{ sponsor.full_name }}</span>
            <span class="text-center font-medium">{{ sponsor.phone }}</span>
            <span class="text-center font-bold">{{ numFormat(sponsor.sum) }} <span
                class="text-[#B2B7C1] font-medium">UZS</span>
            </span>
            <span class="text-center font-bold">{{ numFormat(sponsor.spent) }} <span
                class="text-[#B2B7C1] font-medium">UZS</span></span>
            <span class="text-center font-medium">{{ sponsor.created_at }}</span>
            <span class="text-center">{{ sponsor.get_status_display }}</span>
            <button class="text-center mx-auto"><img src="@/assets/icons/website/eye.svg" alt=""></button>
          </li>
        </ul>
      </div>
      <div class="" v-else>
        Loading..
      </div>
      <div class="" v-if="response.data">
        <div class="flex justify-between">
          <div class="">
            {{ response.data.count }} tadan 1-10 ko'rsatilmoqda
          </div>
          <ThePagination :count="10"></ThePagination>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {inject, onMounted, ref} from "vue";

const numFormat = inject("numFormat")
const axios: any = inject("axios")
import ThePagination from "@/components/ThePagination.vue"
import {useSponsorStore} from "@/store/useSponsorStore";

const protectedApi = inject("protectedApi")
const sponsorStore = useSponsorStore()
const response: any = ref({})

async function fetchData(url: string, page?: string) {
  const request = await axios.get(page ? url + page : url)
  if (request) {
    response.value = request
    sponsorStore.sponsorsList = request.data.results;
  }
  console.log(sponsorStore.sponsorsList)
  console.log(response.value)
}


fetchData("sponsor-list")


</script>

<style>
.sponsors-head {
  display: grid;
  grid-template-columns: 40px 240px 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 46px;
}

.sponsors-body__item {
  display: grid;
  grid-template-columns: 40px 240px 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 46px;

}
</style>