<template>
  <div class="container mx-auto">
    <h3>
      Welcome
    </h3>
    <div class="" v-if="!userStore.isLoggedIn">
      <router-link to="/login" class="text-blue-600 underline">
        Login Page
      </router-link>
    </div>
    <div class="" v-else>
      <router-link to="/main/dashboard" class="text-blue-600 underline">
        Dashboard
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useUserStore} from "@/store/userStore";

const userStore = useUserStore()
</script>

<style></style>