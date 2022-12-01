<template>
  <section class="sponsors" v-cloak>
    <div class="mx-auto ex-sm:w-full ">
      <div class="overflow-x-scroll mb-[6px]">

        <div class="" v-if="sponsorStore.sponsorsList.length > 0">

          <Table classes="w-full table-auto border-separate border-spacing-y-4">
            <template #thead>
              <tr class="text-xs text-[#B1B1B8] uppercase text-center">
                <th class="text-left px-4">#</th>
                <th class=" text-left">F.I.SH.</th>
                <th class="">Tel.Raqami</th>
                <th class="px-4 whitespace-nowrap">Homiylik summasi</th>
                <th class="px-4 whitespace-nowrap">Sarflangan summa</th>
                <th class="px-4">Sana</th>
                <th class="">Holati</th>
                <th class=" px-4">Amallar</th>
              </tr>
            </template>

            <template #tbody>
              <tr v-for="(sponsor, idx) in sponsorStore.filterSponsorsByName(sponsorStore.sponsorsFilter)"
                  :key="sponsor.id" class="border-spacing-y-3 border-separate text-sm">
                <td class="py-[23px] bg-white rounded-l-[12px] px-4">
                  {{ (sponsorStore.activePage * sponsorStore.pageSize) + idx - sponsorStore.pageSize + 1 }}
                </td>
                <td class="py-[23px]  bg-white font-bold text-ellipsis">{{ sponsor.full_name }}</td>
                <td class="py-[23px]  bg-white text-center whitespace-nowrap">{{ sponsor.phone }}</td>
                <td class="py-[23px]  bg-white text-center whitespace-nowrap font-medium">
                  <span class="font-medium text-slate-700">
                    {{ numberWithSpaces(sponsor.sum) }}
                  </span> <span>UZS</span>
                </td>
                <td class="py-[23px]  bg-white text-center whitespace-nowrap font-medium">
                  <span class="font-medium text-slate-700">
                  {{ numberWithSpaces(sponsor.spent) }}
                  </span> <span class="">UZS</span>
                </td>
                <td class="py-[23px]  bg-white text-center whitespace-nowrap px-4">{{
                    formatDateTime(sponsor.created_at)
                  }}
                </td>
                <td :class="'py-[23px]  bg-white text-center  whitespace-nowrap '+ statusColor(sponsor.get_status_display)">
                  {{ sponsor.get_status_display }}
                </td>
                <td class="py-[23px]  bg-white text-center rounded-r-[12px] px-4">
                  <button class="text-center mx-auto"><img src="@/assets/icons/website/eye.svg" alt=""></button>
                </td>
              </tr>
            </template>
          </Table>

          <NotFound :condition="sponsorStore.filterSponsorsByName(sponsorStore.sponsorsFilter).length < 1"
                    text="Uzur siz qidirayotgan homiy ro'yxatda yo'q">
            <img src="@/assets/icons/website/empty.svg" alt="" class="mx-auto">
          </NotFound>

        </div>
        <div class="mx-auto" v-else>
          <img src="@/assets/images/website/loading.gif" class="block mx-auto w-[100px] h-[100px]" alt="Loading Gif">
        </div>
      </div>
      <div class="" v-if="sponsorStore.sponsorsList.length > 1">
        <div class="flex justify-between items-center gap-[40px] ">
          <div class="whitespace-nowrap text-[15px]">
            {{ sponsorStore.count }} tadan
            {{ (sponsorStore.activePage - 1) * sponsorStore.pageSize + 1 }}-{{ sponsorListEnd }}
            ko'rsatilmoqda
          </div>
          <ul class="flex items-center gap-[12px]">
            <li class="flex gap-2 items-center">
              <p class="text-[15px]">Ko'rsatish</p>
            </li>
            <li class="flex items-center gap-[20px] pb-[0px]  max-w-full">
              <select name="pageSize" id="page-size" @change="selectPageSize"
                      class="border border-[#DFE3E8] py-[6px] px-[8px] bg-white rounded-[5px]"
                      :value="sponsorStore.pageSize">
                <option :value="num" class="" v-for="num in [10, 15, 20, 25, 35, 40, 45, 50]"
                        :key="num+'wdadwa'">
                  {{ num }}
                </option>
              </select>
              <ThePagination :count="sponsorStore.getPaginationCount"></ThePagination>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {computed, inject, ref} from "vue";
import Table from "@/components/UI/Table.vue"
import {useSponsorStore} from "@/store/useSponsorStore";
import ThePagination from "@/components/ThePagination.vue"
import {useRoute, useRouter} from "vue-router";
import {useSponsors} from "@/composables/sponsors";
import NotFound from "@/components/UI/NotFound.vue"


const {numberWithSpaces, formatDateTime, statusColor} = useSponsors()
const sponsorStore = useSponsorStore()
const fetchData: any = inject("fetchData")
const router = useRouter()
const route = useRoute();
const {page, size} = route.query;
// Dynamic list length sometimes may not be the same with original
// sponsorsListList length because of select Page Size
const sponsorListLength = ref(sponsorStore.sponsorsList.length)


const sponsorListEnd = computed(() => (sponsorStore.sponsorsList.length >= sponsorStore.pageSize || sponsorListLength.value === sponsorStore.sponsorsList.length ?
    sponsorStore.sponsorsList.length * sponsorStore.activePage : sponsorStore.count))


async function selectPageSize(event: any) {
  sponsorStore.pageSize = event.target.value;
  sponsorListLength.value = event.target.value;
  if (sponsorStore.activePage > sponsorStore.getPaginationCount) {
    try {
      const response = await fetchData(`/sponsor-list/?page=${sponsorStore.getPaginationCount}&page_size=${event.target.value}`)
      if (response.status === 200) {
        sponsorStore.sponsorsList = response.data.results
        sponsorStore.activePage = sponsorStore.getPaginationCount
        await router.push({
          path: "/main/sponsors",
          query: {page: sponsorStore.getPaginationCount, size: event.target.value}
        })
      }
    } catch (error) {
      console.log(error)
    }
  } else {
    try {
      const response = await fetchData(`/sponsor-list/?page=${sponsorStore.activePage}&page_size=${event.target.value}`)
      if (response.status === 200) {
        sponsorStore.sponsorsList = response.data.results
        await router.push({path: "/main/sponsors", query: {page: sponsorStore.activePage, size: event.target.value}})
      }
    } catch (error) {
      console.log(error)
    }
  }
}

Init()


async function Init() {
  if (route.query.page || route.query.pageSize) {
    sponsorStore.pageSize = Number(size)
    sponsorStore.activePage = Number(page)
    const response: any = await fetchData(`/sponsor-list/?page=${!isNaN(Number(page)) ? page : sponsorStore.activePage}&page_size=${!isNaN(Number(size)) ? size : sponsorStore.pageSize}`)
    console.log(response.data)
    sponsorStore.count = response.data.count
    if (response.status === 200) {
      sponsorStore.sponsorsList = response.data.results;
    }
  } else {
    const response: any = await fetchData(`/sponsor-list/?page=${sponsorStore.activePage}&page_size=${sponsorStore.pageSize}`)
    if (response.status === 200) {
      await router.push({
        path: "/main/sponsors",
        query: {page: sponsorStore.activePage, size: sponsorStore.pageSize}
      })
      sponsorStore.sponsorsList = response.data.results;
      sponsorStore.count = response.data.count;

    }
  }
}

</script>

<style>

</style>