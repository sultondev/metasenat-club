<template>
  <section class="sponsors" v-cloak>
    <div class="responsive-container">
      <div class="overflow-x-scroll mb-2.5">
        <div class="mx-auto"
             v-if="listOfSponsors.length === 0 && !fetchError.error || mainStore.loading">
          <img src="@/assets/images/website/loading.gif" class="block mx-auto w-[100px] h-[100px]" alt="Loading Gif">
        </div>
        <div class="" v-else-if="listOfSponsors.length > 0">
          <Table classes="responsive-table">
            <template #thead>
              <tr class="text-xs text-[#B1B1B8] uppercase text-center">
                <th class="text-left px-4">#</th>
                <th class=" text-left">{{ $t('table.head.full_name') }}</th>
                <th class="">{{ $t('sponsor_table.phone') }}</th>
                <th class="px-4 whitespace-nowrap">{{ $t('sponsor_table.have') }}</th>
                <th class="px-4 whitespace-nowrap">{{ $t('sponsor_table.spent') }}</th>
                <th class="px-4">{{ $t('sponsor_table.date') }}</th>
                <th class="">{{ $t('sponsor_table.status') }}</th>
                <th class=" px-4">{{ $t('table.head.actions') }}</th>
              </tr>
            </template>

            <template #tbody>
              <tr v-for="(sponsor, idx) in filterSponsors"
                  :key="sponsor.id" class="">
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
                  <router-link :to="'/main/sponsors/'+sponsor.id" class="w-fit block mx-auto">
                    <img src="@/assets/icons/website/eye.svg" alt="Eye icon">
                  </router-link>
                </td>
              </tr>
            </template>
          </Table>
          <NotFound :condition="filterSponsors.length === 0"
                    text="Uzur siz qidirayotgan homiy ro'yxatda yo'q">
            <img src="@/assets/icons/website/empty.svg" alt="" class="mx-auto">
          </NotFound>
        </div>
        <div class="" v-else>
          <p class="">{{ fetchError.message }}</p>
        </div>
      </div>
      <div class="" v-if="listOfSponsors.length > 1">
        <div class="flex justify-between items-center gap-[40px] ">
          <div class="whitespace-nowrap text-[15px]">
            {{
              $t('table.bottom.left', {
                count: totalCount,
                startOrder: (page - 1) * size + 1,
                endOrder: sponsorListEnd
              })
            }}
          </div>
          <ul class="flex items-center gap-[12px]">
            <li class="flex gap-2 items-center">
              <p class="text-[15px]">{{ $t('table.bottom.right') }}</p>
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
import {computed, inject, onMounted, reactive, Ref, ref, watch} from "vue";
import Table from "@/components/UI/Table.vue"
import ThePagination from "@/components/ThePagination.vue"
import NotFound from "@/components/UI/NotFound.vue"
import {useRoute, useRouter} from "vue-router";
import {useSponsors} from "@/composables/sponsors";
import {useMainStore} from "@/store/useMainStore";
import {sponsorsListType} from "@/typing/types/sponsors";
import {numberWithSpaces} from "@/helpers/sum"
import {findSumById, formatStatuses} from "@/helpers/mainHelpers";
import {generousOptions} from "@/constants/sponsors";

const {formatDateTime, statusColor} = useSponsors()
const fetchData: any = inject("fetchData")
const fetchError: any = ref({})
const router = useRouter()
const route = useRoute();
const listOfSponsors: Ref<sponsorsListType[]> = ref([])
const page = ref(+route.query.page! || 1)
const size = ref(+route.query.size! || 15)

const filters: any = reactive({
  name: route.query.filters || "",
  date: route.query.date || "2021-01-01",
  sum: route.query.sum || "",
  statuses: route.query.statuses || [route.query.statuses],
})
const totalCount = ref(0)

const sponsorListLength = ref(listOfSponsors.value.length)
const sponsorListEnd = computed(() => (listOfSponsors.value.length >= size.value || sponsorListLength.value === listOfSponsors.value.length ?
    listOfSponsors.value.length * page.value : totalCount))

const mainStore = useMainStore()

const fetchSponsorsData = async () => {
  setTimeout(() => {
    mainStore.loading = false
  }, 400)
  try {
    const response = await fetchData(`/sponsor-list/?page=${route.query.page || page.value}&page_size=${route.query.size || size.value}`)
    if (response.status === 200) {
      totalCount.value = response.data.count
      listOfSponsors.value = response.data.results
    }
  } catch (error: any) {
    console.log(error)
    fetchError.value = {
      error: true,
      message: error.message
    }
  }
}

const filterSponsors = computed(() => {
  if (userSearching()) {
    return listOfSponsors.value.filter((item: sponsorsListType) => {
      const status = formatStatuses(item.get_status_display);
      const lowVer = item.full_name.toLowerCase()
      return lowVer.includes(filters.name.toLowerCase()) && statusResult(status) && findSumById(filters.sum) <= Number(item.sum) && getParsedTime(item.created_at, '.') >= getParsedTime(filters.date, '-')
    })
  } else {
    return listOfSponsors.value
  }
})

onMounted(async () => {
  await fetchSponsorsData()
})


watch(route, async () => {
  filters.name = route.query.filters || ""
  filters.sum = route.query.sum || ""
  filters.date = route.query.date || ""
  filters.statuses = route.query.statuses || []
  page.value = +route.query.page! || 1
  size.value = +route.query.size! || 15
  await fetchSponsorsData()
})

function userSearching() {
  const {statuses, filters, sum, date} = route.query
  return Boolean(statuses || filters || sum || date)
}


function statusResult(arg: any) {
  if (filters.statuses < 1) {
    return true
  } else if (Array.isArray(filters.statuses)) {
    return filters.statuses.some((item: any) => item == arg) || filters.statuses.some((item: any) => item == '101')
  } else {
    return filters.statuses == arg || filters.statuses == 101
  }
}

function getParsedTime(arg: string, symbols: string) {
  if (arg) {
    const regex = new RegExp(`/${symbols || '.'}/`)
    const formatted = arg.replace(regex, '-')
    return Date.parse(formatted)
  } else {
    return Date.parse('2021-01-01')
  }
}

</script>

<style>

.responsive-table {
  @apply w-full table-auto border-separate border-spacing-y-4
}


</style>