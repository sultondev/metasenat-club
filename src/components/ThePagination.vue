<template>
  <section class="pagination ">
    <div class="flex gap-[10px]">
      <button
          class="border max-w-[32px] min-w-[32px] max-h-[32px] min-h-[32px] border-[#DFE3E8] flex justify-center items-center bg-white rounded-[5px] disabled:bg-[#DFE3E8]"
          @click="changeActivePage(Number(sponsorStore.activePage)-1)"
          :disabled="sponsorStore.activePage === 1"><img
          src="@/assets/icons/website/left.svg" class="min-w-[22px]" alt="">
      </button>
      <ul class="pagination-list flex flex-wrap items-center gap-2">
        <li class="" v-for="count in props.count" :key="count">
          <button
              :class="['text-[14px] max-w-[32px] min-w-[32px] min-h-[32px] max-h-[32px] border border-[#DFE3E8]  px-[8px] bg-white rounded-[5px]', sponsorStore.activePage === count ? ' pagination-list__active' : ''] "
              @click="changeActivePage(count)"
          >
            {{ count }}
          </button>
        </li>
      </ul>
      <button
          class="border max-w-[32px] min-w-[32px] max-h-[32px] min-h-[32px] border-[#DFE3E8] flex justify-center items-center bg-white rounded-[5px] disabled:bg-[#DFE3E8]"
          @click="changeActivePage(Number(sponsorStore.activePage)+1)"
          :disabled="sponsorStore.activePage === props.count"
      >
        <img src="@/assets/icons/website/right.svg" class="min-w-[22px]" alt="">
      </button>

    </div>
  </section>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useSponsorStore} from "@/store/useSponsorStore";
import {useRouter} from "vue-router";
import {publicApi} from "@/plugins/axios";

const sponsorStore = useSponsorStore()
const props = defineProps(['count'])
const router: any = useRouter()


async function changeActivePage(value: any = 1) {
  try {
    const request = await publicApi.get(`/sponsor-list/?page=${value}&page_size=${sponsorStore.pageSize}`)
    if (request.status === 200) {
      sponsorStore.activePage = value;
      sponsorStore.sponsorsList = request.data.results;
      console.log(value)
      router.push({path: '/main/sponsors', query: {page: value, pageSize: sponsorStore.pageSize}})
    }
  } catch (error) {
    console.log(error)
  }
}


</script>

<style scoped>
.pagination-list__active {
  border-color: #3366FF;
  color: #3366FF;
}


</style>