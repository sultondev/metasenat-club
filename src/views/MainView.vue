<template>
  <section class="sect-main py-[24px] bg-white">
    <div class="container mx-auto">
      <ul class="main-list flex justify-between">
        <li class="main-list__item flex border-[2px] border-[#E0E7FF] overflow-x-hidden rounded-[6px]">
          <router-link to="/main/dashboard" class="py-[12px] px-[64px] border-r-[2px] border-[#E0E7FF]">
            DASHBOARD
          </router-link>
          <router-link to="/main/clients" class="py-[12px] px-[64px] border-r-[2px] border-[#E0E7FF]">
            HOMIYLAR
          </router-link>
          <router-link to="/main/students" class="py-[12px] px-[64px]">
            TALABALAR
          </router-link>
        </li>
        <li class="main-list__item flex gap-[20px]">
          <label
              class="main__wrapper flex gap-[8px] border bg-[#E0E7FF20A] bg-[#E0E7FF] rounded-[6px] py-[12px] px-[14px] "
              id="filter">
            <img src="@/assets/icons/website/search.svg" alt="Search Icon" class="icon-filter">
            <input type="text"
                   id="filter"
                   class="main-filter__input bg-transparent outline-0 text-xl">
          </label>
          <button class="rounded-[5px] py-[12px] px-[32px] bg-[#EDF1FD] text-[#3365FC] text-[20px]"><span
              class="icon-filter mr-[20px]"></span><span
              class="">Filter</span>
          </button>
        </li>
      </ul>
    </div>
  </section>
  <main class="main min-h-screen bg-[#F5F5F7] py-[48px]">
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts"></script>

<style>
.router-link-active {
  background-color: #3366FF;
  color: #fff;
  transition: all 0.4s;
}

</style>