<template>
  <section class="welcome" v-cloak>
    <div class="bg-white absolute xl:w-[56%] ex-sm:w-full xl:h-screen ex-sm:h-full -z-10"></div>
    <div class="max-w-[1200px] mx-auto py-[48px]">
      <div
          class="flex justify-between xl:flex-row xl:items-start ex-sm:flex-col-reverse ex-sm:items-center">
        <div class="xl:mx-0 xl:my-0 ex-sm:my-10 min-w-[586px]">
          <SendApplication></SendApplication>
        </div>
        <div class="xl:block ">
          <div class="relative mb-[24px]">
            <div class="absolute -z-10 -left-6 -top-6">
              <img src="@/assets/icons/website/double-quote.svg" alt="">
            </div>
            <p class="custom:w-[436px] ex-sm:w-[392px] font-medium text-justify">Yuqori sinflarda bolalar shaxs boʻlib,
              jamoa
              boʻlib shakllanadi. Ayni oʻsha paytda ularni oʻzlari
              oʻrgangan muhitdan ajratib qoʻymaslik kerak.
            </p>
            <div class="absolute -z-10 -right-4 -bottom-2">
              <img src="@/assets/icons/website/double-quote.svg" class="rotate-180" alt="">
            </div>
          </div>
          <div class="">
            <div class="flex items-center gap-[16px]">
              <img src="@/assets/images/website/president-picture.jpg" class="w-16 h-16 object-cover rounded-[16px]"
                   alt="">
              <div class="">
                <h6 class="text-xl font-medium">
                  Shavkat Mirziyoyev
                </h6>
                <p class="text-[#86868B]">
                  O‘zbekiston Respublikasi Prezidenti
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
  <img src="@/assets/images/website/banner-01.svg" class="absolute xl:block ex-sm:hidden -bottom-48 -right-96 -z-20"
       alt="">
</template>

<script setup lang="ts">
import {useUserStore} from "@/store/userStore";
import SendApplication from "@/components/SendApplication.vue"

const userStore = useUserStore()
</script>

<style>
.welcome {
}
</style>