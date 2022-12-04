<template>
  <TheNavbar></TheNavbar>
  <section class="sect-main py-[24px] xl:max-h-[88px] custom:px-[120px] sm:px-[20px] bg-white" v-cloak>
    <div class="container mx-auto ">
      <ul class="main-list flex xl:justify-between xl:items-center xl:flex-row md:flex-col md:items-start gap-[24px]">
        <li class="main-list__item flex items-center border-[2px] border-[#E0E7FF] overflow-hidden box-content rounded-[6px] text-[12px]">
          <Tablet :tablets="tablets"></Tablet>
        </li>
        <li class="main-list__item flex gap-[20px] items-center">
          <label
              class="main__wrapper flex border items-center bg-[#E8E8E8] bg-[#E0E7FF] rounded-[6px] p-[10px] min-w-[284px] max-h-[40px]"
              id="filter">
            <img src="@/assets/icons/website/search.svg" alt="Search Icon"
                 class="icon-filter w-[20px] h-[20px] mr-[8px]">
            <input id="filter" class="main-filter__input bg-transparent outline-0 text-[15px]"
                   placeholder="Izlash" v-model="filters"/>
          </label>
          <button class="rounded-[5px] w-[123px] min-h-[40px] bg-[#EDF1FD] text-[#3365FC] text-[14px]">
            <span
                class="icon-filter mr-[20px] text-[13px] "></span>
            <span class="font-medium text-[14px]">Filter</span>
          </button>
        </li>
      </ul>
    </div>
  </section>
  <main class="main py-[48px] custom:px-[120px] sm:px-[20px]">
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import TheNavbar from "@/components/TheNavbar.vue"
import Tablet from "@/components/UI/Tablet.vue";
import {ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

const router = useRouter()
const route = useRoute()
const tablets = ref([
  {
    title: "dashboard",
    link: "/main/dashboard",
  },
  {
    title: "sponsors",
    link: "/main/sponsors",
  },
  {
    title: "students",
    link: "/main/students",
  },
])
const filters = ref(route.query.filters || "")

const setFilter = () => {
  router.push({path: "/main/sponsors", query: {...route.query, filters: filters.value}})
}

watch(filters, () => {
  setFilter()
})

</script>

<style>

.router-link-active {
  background-color: #3366FF;
  color: #fff;
  transition: all 0.3s;
}

.router-link-active:hover {
  background: #3366FF;
}


</style>