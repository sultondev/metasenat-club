<template>
  <header class="header py-[12px] relative bg-white xl:px-0 ex-sm:px-6"
          v-if="$route.name !== '/login'"
  >
    <div class="mx-auto max-w-[1200px] mx-auto">
      <nav class="nav ">
        <ul class="nav-list flex justify-between">
          <li class="nav-list__item flex items-center">
            <router-link to="/" class="bg-none" exact-active-class="nav-active">
              <img src="@/assets/icons/website/header-logo.svg" class="min-w-[173px] min-h-[24px]" alt="">
            </router-link>
          </li>
          <li class="nav-list__item flex items-center gap-[40px]" v-if="userStore.isAuthenticated">
            <a href="#" class="nav-user flex items-center gap-[24px]"><span
                class="nav-user__name text-[13px]">Shohrux</span> <img
                src="@/assets/icons/website/user.svg"
                class="nav-user__picture"
                alt="UserImage">
            </a>
            <button class="nav__logout " @click="userStore.logOut">
              <img src="@/assets/icons/website/exit.svg" class="w-[26px] h-[22px]" alt="Exit icon">
            </button>
          </li>
          <li class="flex sm:gap-x-10 custom:gap-x-2 items-center text-sm" v-else>
            <router-link to="/main/dashboard">
              Asosiy
            </router-link>
            <router-link to="/scholarships">
              Grantlar
            </router-link>
            <router-link to="/duty">
              Soliq imtiyozlari
            </router-link>
            <router-link to="/login" class="flex items-center gap-x-2 relative">
              <span class="">
                <img src="@/assets/icons/website/enter-icon.svg" class="w-6 h-6" alt="">
              </span>
              <span>
              Kirish
              </span>
            </router-link>
            <router-link to="/register"
                         class="border-2 py-2 px-8 rounded-lg border-[#3366FF] text-[#3366FF] text-sm hover:bg-[#E0E7FF] transition-all font-medium">
              Ro‘yxatdan o’tish
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import {useUserStore} from "@/store/userStore";

const userStore = useUserStore();
</script>

<style>

.nav-active {
  background: none;
}

.nav-active:hover {
  background: none;
}

.header {
  box-shadow: 2px 0 20px #00000010;
  /*position: relative;*/
  z-index: 10;
}

.nav-user {
  background-color: #F1F1F3;
  border-radius: 6px;
  padding: 4px 4px 4px 20px
}

.nav__logout {
  color: #B1B1B8;
  font-size: 32px;
  display: flex;
  justify-content: center;
}

.nav-logo__name {
  font-size: 18px;
  font-weight: 700;
}

.nav-logo__picture {
  margin-right: 10px;
}

.nav-logo__name::after {
  content: "PRO";
  color: #00AE69;
  font-size: 14px;
}
</style>