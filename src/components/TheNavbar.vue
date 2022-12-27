<template>
  <header class="header py-[12px] relative bg-white xl:px-0"
          v-if="$route.path !== '/login'"
  >
    <div class="">
      <nav class="nav ">
        <ul class="nav-list">
          <li class="nav-list__item">
            <router-link to="/" class="bg-none" exact-active-class="nav-active">
              <img src="@/assets/icons/website/header-logo.svg" class="min-w-[173px] min-h-[24px]" alt="">
            </router-link>
          </li>

          <li class="nav-list__item gap-10" v-if="userStore.isAuthenticated">
            <button class="font-medium uppercase text-base" @click="toggleLanguage">
              {{ t$.locale.value }}
            </button>

            <a href="#" class="nav-user">
              <span class="text-xs">Shohrux</span>
              <img src="@/assets/icons/website/user.svg" alt="UserImage">
            </a>
            <button class="nav__logout " @click="userStore.logOut">
              <img src="@/assets/icons/website/exit.svg" class="w-[26px] h-[22px]" alt="Exit icon">
            </button>
          </li>

          <li class="nav-list__welcome" v-else>
            <button class="font-medium uppercase text-base" @click="toggleLanguage">
              {{ t$.locale.value }}
            </button>

            <router-link :to="item.link" :key="item.link+idx" v-for="(item,idx) in WelcomeLinks" class="nav-list__link">
              {{ item.label }}
            </router-link>

            <router-link to="/login" class="nav-list__login">
              <span class=""><img src="@/assets/icons/website/enter-icon.svg" class="w-6 h-6" alt=""></span>
              <span>{{ $t('navbar.login') }}</span>
            </router-link>

            <router-link to="/register" class="nav-list__reg">
              {{ $t('navbar.reg') }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import {useUserStore} from "@/store/userStore";
import {useI18n} from "vue-i18n";
import {computed} from "vue";

const userStore = useUserStore();


const {t} = useI18n()
const t$ = useI18n()

const toggleLanguage = () => {
  if (t$.locale.value === 'uz') t$.locale.value = 'en'
  else if (t$.locale.value === 'en') t$.locale.value = 'uz'
  else t$.locale.value = 'en'
}

const WelcomeLinks = computed(() => [
  {
    link: '/main/dashboard',
    label: t('navbar.main')
  },
  {
    link: '/scholarships',
    label: t('navbar.grants')
  },
  {
    link: '/duty',
    label: t('navbar.duty')
  }
])

</script>

<style>

.nav-active {
  background: none;
}

.nav-list {
  @apply flex justify-between responsive-container
}

.nav-list__item {
  @apply flex items-center;
}

.nav-list__link {
  @apply text-sm font-medium;
}

.nav-list__welcome {
  @apply flex sm:gap-x-10 custom:gap-x-2 items-center text-sm;
}

.nav-list__login {
  @apply flex items-center gap-x-2;
}

.nav-list__reg {
  @apply border-2 py-2 px-8 rounded-lg border-primary text-primary text-sm hover:bg-blue-200 transition-all font-medium;
}

.responsive-container {
  @apply container mx-auto custom:px-4 xl:px-6 lg:px-4 md:px-6 sm:px-4
}

.nav-active:hover {
  background: none;
}

.header {
  box-shadow: 2px 0 20px #00000010;
  position: relative;
  z-index: 10;
}

.nav-user {
  @apply flex items-center gap-6;
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

</style>