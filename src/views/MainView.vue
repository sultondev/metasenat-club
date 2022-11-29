<template>
  <TheNavbar></TheNavbar>
  <section class="sect-main py-[24px] max-h-[88px] xl:px-[120px] bg-white" v-cloak>
    <div class="container mx-auto ">
      <ul class="main-list flex justify-between items-center">
        <li class="main-list__item flex items-center border-[2px] border-[#E0E7FF] overflow-hidden box-content rounded-[6px] text-[12px]">
          <router-link to="/main/dashboard"
                       class="main-list__first min-h-[40px] flex items-center min-w-[192px] justify-center tracking-[1.13px] transition-all text-[#3366FF99]  border-[#E0E7FF] hover:bg-[#E0E7FF]">
            DASHBOARD
          </router-link>
          <router-link to="/main/sponsors"
                       class="main-list__second min-h-[40px] flex items-center  min-w-[192px] justify-center tracking-[1.13px] transition-all text-[#3366FF99]  border-[#E0E7FF] hover:bg-[#E0E7FF]">
            HOMIYLAR
          </router-link>
          <router-link to="/main/students"
                       class="main-list__third  min-h-[40px] flex items-center min-w-[192px] justify-center tracking-[1.13px]  transition-all text-[#3366FF99] hover:bg-[#E0E7FF]">
            TALABALAR
          </router-link>
        </li>
        <li class="main-list__item flex gap-[20px] items-center">
          <label
              class="main__wrapper flex border items-center bg-[#E8E8E8] bg-[#E0E7FF] rounded-[6px] p-[10px] min-w-[284px] max-h-[40px]"
              id="filter">
            <img src="@/assets/icons/website/search.svg" alt="Search Icon"
                 class="icon-filter w-[20px] h-[20px] mr-[8px]">
            <input type="text"
                   id="filter"
                   class="main-filter__input bg-transparent outline-0 text-[15px]" placeholder="Izlash">
          </label>
          <button class="rounded-[5px] w-[123px] min-h-[40px] bg-[#EDF1FD] text-[#3365FC] text-[14px]">
            <span
                class="icon-filter mr-[20px] text-[13px] "></span><span
              class="font-medium text-[14px]">Filter</span>
          </button>
        </li>
      </ul>
    </div>
  </section>
  <main class="main py-[48px] xl:px-[120px]">
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import TheNavbar from "@/components/TheNavbar.vue"
</script>

<style>
.router-link-active {
  background-color: #3366FF;
  color: #fff;
  transition: all 0.5s;
  border: none;
}

.router-link-active:hover {
  background: #3366FF;
}

.main-list__link {
  border-right: 2px solid #3366FF99;
}


.main-list__first.router-link-active + a {
  border-right: 2px solid #DDE3FB;
  border-left: none;
}


.main-list__second {
  border-left: 2px solid #DDE3FB;
}

.main-list__second.router-link-active {
  border: none;
}

.main-list__second.router-link-active ~ a {
  border: none;
}


.main-list__third.router-link-active {
  border: none;
}


/*.main-list:hover > .main__item > a:not(:hover) {*/
/*  opacity: 0.5;*/
/*}*/

</style>