<template>
  <section class="sponsors" v-cloak>
    <div class="mx-auto ex-sm:w-full ">
      <div class="overflow-x-scroll mb-[6px]">

        <div class="" v-if="listOfSponsors.length > 0">

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
              <tr v-for="(sponsor, idx) in filterSponsorsByName"
                  :key="sponsor.id" class="border-spacing-y-3 border-separate text-sm">
                <td class="py-[23px] bg-white rounded-l-[12px] px-4">
                  {{ (page - 1) * size + idx + 1 }}
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

          <NotFound :condition="filterSponsorsByName.length === 0"
                    text="Uzur siz qidirayotgan homiy ro'yxatda yo'q">
            <img src="@/assets/icons/website/empty.svg" alt="" class="mx-auto">
          </NotFound>

        </div>
        <div class="mx-auto" v-else-if="listOfSponsors.length === 0 && !fetchError.error">
          <img src="@/assets/images/website/loading.gif" class="block mx-auto w-[100px] h-[100px]" alt="Loading Gif">
        </div>
        <div class="" v-else>
          <p class="">{{ fetchError.message }}</p>
        </div>
      </div>
      <div class="" v-if="listOfSponsors.length > 1">
        <div class="flex justify-between items-center gap-[40px] ">
          <div class="whitespace-nowrap text-[15px]">
            {{ totalCount }} tadan
            {{ (page - 1) * size + 1 }}-{{ sponsorListEnd }}
            ko'rsatilmoqda
          </div>
          <ul class="flex items-center gap-[12px]">
            <li class="flex gap-2 items-center">
              <p class="text-[15px]">Ko'rsatish</p>
            </li>
            <li class="flex items-center gap-[20px] pb-[0px]  max-w-full">
              <ThePagination :count="totalCount"></ThePagination>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {computed, inject, onMounted, Ref, ref, watch} from "vue";
import Table from "@/components/UI/Table.vue"
import ThePagination from "@/components/ThePagination.vue"
import NotFound from "@/components/UI/NotFound.vue"
import {useRoute, useRouter} from "vue-router";
import {useSponsors} from "@/composables/sponsors";
import {sponsorsListType} from "@/typing/types/sponsor";


const {numberWithSpaces, formatDateTime, statusColor} = useSponsors()
const fetchData: any = inject("fetchData")
const fetchError: any = ref({})
const router = useRouter()
const route = useRoute();
const listOfSponsors: Ref<sponsorsListType[]> = ref([])
const page = ref(+route.query.page! || 1)
const size = ref(+route.query.size! || 15)
const filters: any = ref(route.query.filters || "")
const totalCount = ref(0)

const sponsorListLength = ref(listOfSponsors.value.length)
const sponsorListEnd = computed(() => (listOfSponsors.value.length >= size.value || sponsorListLength.value === listOfSponsors.value.length ?
    listOfSponsors.value.length * page.value : totalCount))


const fetchSponsorsData = async () => {
  try {
    const response = await fetchData(`/sponsor-list/?page=${route.query.page || page.value}&page_size=${route.query.size || size.value}`)
    if (response.status === 200) {
      console.log(response)
      totalCount.value = response.data.count
      listOfSponsors.value = response.data.results
    }
  } catch (error) {
    console.log(error)
    fetchError.value = {
      error: true,
      message: error.message
    }
  }
}

const filterSponsorsByName = computed(() => {
  if (filters.value.length > 0) {
    const filtered = listOfSponsors.value.filter((item: sponsorsListType) => {
      const lowVer = item.full_name.toLowerCase()
      return lowVer.includes(filters.value.toLowerCase())
    })
    return filtered
  } else {
    return listOfSponsors.value
  }
})

onMounted(async () => {
  await fetchSponsorsData()
  console.log("filter ", filterSponsorsByName.value)
  console.log("List of", listOfSponsors.value)
})


watch(route, async () => {
  filters.value = route.query.filters || ""
  page.value = +route.query.page! || 1
  size.value = +route.query.size! || 15
  await fetchSponsorsData()
})
</script>

<style>

</style>