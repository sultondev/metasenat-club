<template>
  <TheNavbar></TheNavbar>
  <router-view></router-view>
</template>

<script setup lang="ts">
import {useUserStore} from "@/store/userStore";
import TheNavbar from "@/components/TheNavbar.vue"
import 'vue3-lottie/dist/style.css'

const userStore = useUserStore()
userStore.Init()
</script>

<style>
@import url("@/assets/fonts/style.css");

body {
  background: #F5F5F7;
}

#app {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

* {
  padding: 0;
  margin: 0;
}

/* width */
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background: #3366FF;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

* {
  font-family: "Rubik", sans-serif;
}


</style>
