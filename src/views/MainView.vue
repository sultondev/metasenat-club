<template>
  <section class="sect-main py-[24px] max-h-[88px] xl:px-[120px] bg-white">
    <div class="container mx-auto ">
      <ul class="main-list flex justify-between items-center">
        <li class="main-list__item flex items-center border-[2px] border-[#E0E7FF] overflow-hidden box-content rounded-[6px] xl:text-[12px] 2xl:text-[18px]">
          <router-link to="/main/dashboard"
                       class="min-h-[40px] flex items-center min-w-[192px] justify-center border-r-[2px] border-[#E0E7FF]">
            DASHBOARD
          </router-link>
          <router-link to="/main/sponsors"
                       class="min-h-[40px] flex items-center  min-w-[192px] justify-center border-r-[2px] border-[#E0E7FF]">
            HOMIYLAR
          </router-link>
          <router-link to="/main/students" class="min-h-[40px] flex items-center min-w-[192px] justify-center">
            TALABALAR
          </router-link>
        </li>
        <li class="main-list__item flex gap-[20px] items-center">
          <label
              class="main__wrapper flex border items-center bg-[#E0E7FF20A] bg-[#E0E7FF] rounded-[6px] p-[10px] min-w-[284px] max-h-[40px]"
              id="filter">
            <img src="@/assets/icons/website/search.svg" alt="Search Icon"
                 class="icon-filter w-[20px] h-[20px] mr-[8px]">
            <input type="text"
                   id="filter"
                   class="main-filter__input bg-transparent outline-0 text-[15px]">
          </label>
          <button class="rounded-[5px] w-[123px] min-h-[40px] bg-[#EDF1FD] text-[#3365FC] text-[14px]">
            <span
                class="icon-filter mr-[20px] text-[13px]"></span><span
              class="">Filter</span>
          </button>
        </li>
      </ul>
    </div>
  </section>
  <main class="main min-h-screen bg-[#F5F5F7] py-[48px] xl:px-[120px]">
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts"></script>

<style>
.router-link-active {
  background-color: #3366FF;
  color: #fff;
  transition: all 0.5s;
}

* {
  box-sizing: border-box;
}

</style>