<template>

  <TheNavbar></TheNavbar>
  <TheHeader>
    <template #left>
      <HeaderTablet/>
    </template>
    <template #right>
      <HeaderFilter/>
    </template>
  </TheHeader>


  <main class="main py-[48px] custom:px-[120px] sm:px-[20px]">
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import TheNavbar from "@/components/TheNavbar.vue"
import TheHeader from "@/components/TheHeader.vue"
import HeaderTablet from "@/components/HeaderTablet.vue"
import HeaderFilter from "@/components/HeaderFilter.vue"
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