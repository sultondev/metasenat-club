<template>
  <TheNavbar></TheNavbar>
  <router-view></router-view>
</template>

<script setup lang="ts">
import TheNavbar from "@/components/TheNavbar.vue";

</script>

<style>
@import url("@/assets/fonts/style.css");

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
  font-family: 'SF Pro Display', sans-serif;
}
</style>
