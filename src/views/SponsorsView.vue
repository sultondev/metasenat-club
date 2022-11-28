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
        <ul class="sponsors-body flex flex-col gap-[12px] overflow-x-scroll min-w-[1200px]">
          <li class="sponsors-body__item  py-[25px] px-[16px] bg-white rounded-[8px]"
              v-for="(sponsor, idx) in sponsorStore.sponsorsList">
            <span class="">{{ idx + 1 }}</span>
            <span class="font-bold">{{ sponsor.full_name }}</span>
            <span class="text-center font-medium">{{ sponsor.phone }}</span>
            <span class="text-center font-bold">{{ numFormat(sponsor.sum) }} <span
                class="text-[#B2B7C1] font-medium">UZS</span>
            </span>
            <span class="text-center font-bold">{{ numFormat(sponsor.spent) }} <span
                class="text-[#B2B7C1] font-medium">UZS</span></span>
            <span class="text-center font-medium">{{ sponsor.created_at.slice(0, 10).split('-').join('.') }}</span>
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
          <div class="flex">
            <select name="pageSize" id="page-size" @change="selectPageSize" :value="sponsorStore.pageSize">
              <option :value="num" class="" v-for="num in [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]"
                      :key="num+'wdadwa'">
                {{ num }}
              </option>
            </select>
            <ThePagination :count="Math.floor(response.data.count / sponsorStore.pageSize) + 1"></ThePagination>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {inject, ref} from "vue";
import {useSponsorStore} from "@/store/useSponsorStore";
import ThePagination from "@/components/ThePagination.vue"

const numFormat: any = inject("numFormat")
const axios: any = inject("axios")
const props = defineProps(["page"])
const sponsorStore = useSponsorStore()
const response: any = ref({})

function selectPageSize(event: any) {
  sponsorStore.pageSize = event.target.value;
  // here I refecht data to add new list items
  sponsorStore.changeActivePage(sponsorStore.activePage)
}


async function fetchData(url: string, page?: string) {
  const request = await axios.get(page ? url + page : url)
  if (request) {
    response.value = request
    sponsorStore.sponsorsList = request.data.results;
  }
  console.log(response.value)
}


fetchData("sponsor-list", `/?page=${sponsorStore.activePage}&page_size=${sponsorStore.pageSize}`)


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