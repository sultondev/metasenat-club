<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import {useUserStore} from "@/store/userStore";

const userStore = useUserStore()
userStore.Init()
</script>

<style>
@import url("@/assets/fonts/style.css");

body {
  background: #F5F5F7;
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
  font-family: 'SF Pro Display', sans-serif;
}
</style>
