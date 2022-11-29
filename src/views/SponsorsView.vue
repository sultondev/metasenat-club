<template>
  <section class="sponsors" v-cloak>
    <div class="container mx-auto  ">
      <div class="overflow-x-scroll mb-[6px]">
        <div class="sponsors-head px-[16px] mb-[12px]">
          <h6 class="text-[#B1B1B8] text-[12px] font-medium">#</h6>
          <h6 class="sponsors-head__item-name font-medium text-[#B1B1B8] text-[12px]">F.I.SH.</h6>
          <h6 class="text-[#B1B1B8] text-[12px] font-medium text-center uppercase">Tel.Raqami</h6>
          <h6 class="text-[#B1B1B8] text-[12px] font-medium text-center uppercase whitespace-nowrap">Homiylik
            summasi</h6>
          <h6 class="text-[#B1B1B8] text-[12px] font-medium text-center uppercase whitespace-nowrap">Sarflangan
            summa</h6>
          <h6 class="text-[#B1B1B8] text-[12px] font-medium text-center uppercase">Sana</h6>
          <h6 class="text-[#B1B1B8] text-[12px] font-medium text-center uppercase">Holati</h6>
          <h6 class="text-[#B1B1B8] text-[12px] font-medium text-center uppercase">Amallar</h6>
        </div>
        <div class="" v-if="sponsorStore.sponsorsList.length > 0">
          <ul class="sponsors-body flex flex-col gap-[12px] min-w-[1200px]">
            <li class="sponsors-body__item  px-[12px] bg-white rounded-[8px] max-h-[68px]"
                v-for="(sponsor, idx) in sponsorStore.sponsorsList">

              <span class="text-[15px] ">{{ sponsorStore.activePage * sponsorStore.pageSize + idx - 9 }}</span>
              <span class="sponsors-body__item-name text-[14px] text-left font-bold">{{ sponsor.full_name }}</span>
              <span class="text-[14px] whitespace-nowrap text-center font-medium">{{ sponsor.phone }}</span>
              <span class="text-[14px] whitespace-nowrap text-center font-bold">
              {{ numFormat(sponsor.sum) }}
              <span class="text-[#B2B7C1] font-medium">UZS</span>
            </span>
              <span class="text-center font-bold whitespace-nowrap">{{ numFormat(sponsor.spent) }} <span
                  class="text-[#B2B7C1] font-medium">UZS</span></span>
              <span class="text-center font-medium whitespace-nowrap">{{ formatDateTime(sponsor.created_at) }}</span>
              <span :class="'text-center ' + `${ sponsor.get_status_display.toLowerCase().replace(/\s/g, '') }` ">{{
                  sponsor.get_status_display
                }}</span>
              <button class="text-center mx-auto"><img src="@/assets/icons/website/eye.svg" alt=""></button>
            </li>
          </ul>
        </div>
        <div class="" v-else>
          Loading..
        </div>
      </div>
      <div class="" v-if="response.data">
        <div class="flex justify-between items-center gap-[40px] ">
          <div class="whitespace-nowrap text-[15px]">
            {{ response.data.count }} tadan 1-{{ sponsorStore.pageSize }} ko'rsatilmoqda
          </div>
          <ul class="flex items-center gap-[12px]">
            <li class="flex gap-2 items-center">
              <p class="text-[15px]">Ko'rsatish</p>
            </li>
            <li class="flex items-center gap-[20px] pb-[0px]  max-w-full">
              <select name="pageSize" id="page-size" @change="selectPageSize"
                      class="border border-[#DFE3E8] py-[6px] px-[8px] bg-white rounded-[5px]"
                      :value="sponsorStore.pageSize">
                <option :value="num" class="" v-for="num in [8,9,10,11,12,13,14,15,16,17,18,19,20]"
                        :key="num+'wdadwa'">
                  {{ num }}
                </option>
              </select>
              <ThePagination :count="Math.floor(response.data.count / sponsorStore.pageSize) + 1"></ThePagination>
            </li>
          </ul>
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

function formatDateTime(arg: string) {
  const [year, month, day] = arg.slice(0, 10).split('-').join('-').split('-');
  const res: any = [day, month, year].join(".")
  return res;
}
</script>

<style>

.yangi {
  color: #5BABF2;
}

.moderatsiyada {
  color: #FFA445;
}

.tasdiqlangan {
  color: #00CF83;
}

.bekorqilingan {
  color: #979797;
}

.sponsors-head {
  display: grid;
  grid-template-columns: 10px minmax(240px, 3fr) minmax(132px, 1fr) minmax(180px, 1fr) minmax(120px, 1fr) minmax(78px, 1fr) minmax(60px, 1fr) minmax(30px, 1fr);
  /*grid-template-columns: 10px 260px 132px 108px minmax(120px, 1fr) 1fr 1fr 1fr;*/
  gap: 46px;
  place-items: center;
}

.sponsors-body__item {
  display: grid;
  grid-template-columns: 10px minmax(240px, 3fr) minmax(132px, 1fr) minmax(180px, 1fr) minmax(120px, 1fr) minmax(78px, 1fr) minmax(60px, 1fr) minmax(30px, 1fr);
  /*grid-template-columns: 10px 3fr 132px 108px minmax(120px, 1fr) 1fr 1fr 1fr;*/
  gap: 46px;
  place-items: center;
  padding: 16px 12px;
}

.sponsors-body__item-name {
  place-self: flex-start;
}

.sponsors-head__item-name {
  place-self: flex-start;
}


</style>