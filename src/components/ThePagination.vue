<template>
  <section class="pagination flex">
    <select name="pageSize " id="page-size" @change="selectPageSize"
            class="border border-[#DFE3E8] py-[6px] px-[8px] bg-white rounded-[5px] mr-[20px]"
            :value="pageSize">
      <option :value="num" class="" v-for="num in pageSizeLimits"
              :key="num+'wdadwa'">
        {{ num }}
      </option>
    </select>

    <div class="flex gap-[10px]">
      <button
          class="border  hover:bg-[#E0E7FF] border-[#DFE3E8] flex justify-center items-center bg-white rounded-[5px] disabled:bg-[#DFE3E8]"
          @click="selectPage('previous')"
          :disabled="page === 1"><img
          src="@/assets/icons/website/left.svg" class="min-w-[22px]" alt="">
      </button>
      <button
          class="text-sm border border-[#DFE3E8] h-full  px-[10px] bg-white rounded-[5px] hover:bg-[#E0E7FF] "
          @click="selectPage(1)"
          v-if="pageSize < count && page === pagesSizeAmount">
        {{ 1 }}
      </button>
      <div v-for="p in pagesSizeAmount - 1 > page ? 2 : 1" :key="p">
        <button
            :class="page === page+p-1 ? ' pagination-list__active' : ''"
            class="text-sm border border-[#DFE3E8] h-full  px-2.5 bg-white rounded hover:bg-[#E0E7FF]  "
            @click="selectPage(page+p-1)"
            v-if="pagesSizeAmount > page"
        >
          {{ page + p - 1 }}
        </button>
      </div>
      <div class="text-sm border border-[#DFE3E8]  px-2.5 bg-white rounded-[5px] hover:bg-[#E0E7FF]"
           v-if="pageSize < count && pagesSizeAmount - 1 > page || ( pageSize < count && pagesSizeAmount === page)">
        ...
      </div>
      <button
          v-if="page"
          @click="selectPage(pagesSizeAmount)"
          :class="page === pagesSizeAmount ? ' pagination-list__active' : ' ' "
          class="relative text-sm border border-[#DFE3E8]  px-2.5 bg-white rounded hover:bg-[#E0E7FF] "
      >
        {{ pagesSizeAmount }}
      </button>
      <button
          class="border  hover:bg-[#E0E7FF] border-[#DFE3E8] flex justify-center items-center bg-white rounded-[5px] disabled:bg-[#DFE3E8]"
          @click="selectPage('next')"
          :disabled="pageSize > count || page === pagesSizeAmount"
      >
        <img src="@/assets/icons/website/right.svg" class="min-w-[22px]" alt="">
      </button>

    </div>
  </section>
</template>

<script setup lang="ts">
import {computed, Ref, ref} from "vue";
import {useRouter, useRoute} from "vue-router";
import {useMainStore} from "@/store/useMainStore";

interface PaginationProps {
  count: number
}

const props = defineProps<PaginationProps>()
const router: any = useRouter()
const route = useRoute()
const page = ref(+route.query.page! || 1)
const pageSize: Ref<number> = ref(+route.query.size! || 15)
const pageSizeLimits = ref([10, 15, 20, 25, 35, 40, 45, 50])
const mainStore = useMainStore()
const pagesSizeAmount = computed(() => {
  return Math.ceil(props.count / pageSize.value)
})


function selectPage(arg: number | string = 1) {
  mainStore.loading = true
  setTimeout(() => {
    if (typeof arg === 'number') {
      page.value = arg;
    }
    if (arg === 'previous') {
      page.value--;
    }
    if (arg === 'next') {
      page.value++
    }
    router.push({...route, query: {...route.query, page: page.value,}})
    mainStore.loading = false
  }, 400)
}

function selectPageSize(arg: any) {
  const newPagesAmount = Math.ceil(props.count / arg.target.value)
  pageSize.value = arg.target.value
  if (pagesSizeAmount.value < page.value) {
    pageSize.value = arg.target.value
    page.value = newPagesAmount
    router.push({...route, query: {...route.query, page: newPagesAmount, size: arg.target.value}})
  } else {
    console.log(page.value)
    router.push({...route, query: {...route.query, page: page.value, size: arg.target.value}})
  }
}


</script>

<style scoped>
.pagination-list__active {
  border-color: #3366FF;
  color: #3366FF;
  transition: all 0.4s;
}
</style>