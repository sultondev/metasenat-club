<template>
  <header class="header" v-if="userStore.isAuthenticated">
    <div class="container mx-auto">
      <nav class="nav py-[12px]">
        <ul class="nav-list flex justify-between">
          <li class="nav-list__item">
            <h3 class="nav-logo flex">
              <img src="@/assets/images/logo/logo.svg" class="nav-logo__picture" alt="">
              <span class="nav-logo__name flex flex-col">
              METASENAT
            </span>
            </h3>
          </li>
          <li class="nav-list__item">
            <div class="flex gap-[43px] items-center">
              <a href="#" class="nav-user flex gap-[24px] items-center"><span class="nav-user__name">Shohrux</span> <img
                  src="@/assets/icons/website/user.svg"
                  class="nav-user__picture"
                  alt="UserImage">
              </a>
              <button class="nav__logout" @click="userStore.logOut">
                <span class="icon-exit"></span>
              </button>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import {useUserStore} from "@/store/userStore";
import router from "@/router";

const userStore = useUserStore();

</script>

<style>

.header {
  box-shadow: 2px 0 20px #00000010;
  position: relative;
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