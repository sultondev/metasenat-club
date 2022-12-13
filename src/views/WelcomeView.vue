<template>
  <section class="welcome" v-cloak>
    <div class="bg-white absolute lg:w-[56%] xs:w-full xl:h-screen xs:h-full -z-10"></div>
    <div class="container mx-auto py-[48px] 2xl:px-[120px] xs:px-4 ">\
      <button @click="toggle">
        Toggle
      </button>
      <div
          class="flex justify-between lg:flex-row lg:items-start lg:justify-between xs:justify-center">
        <div class=" lg:min-w-[45%] xs:min-w-[587px]">
          <Transition name="firstStep">
            <div v-show="cond">
              <SendApplication></SendApplication>
            </div>
          </Transition>
          <Transition name="secondStep">
            <div v-show="!cond" class="">
              <div class="">
                <h1 class="">Hellllllooooooooo</h1>
              </div>
            </div>
          </Transition>
        </div>
        <div class="lg:block xs:hidden">
          <div class="relative mb-[24px]">
            <div class="absolute -z-10 -left-6 -top-6">
              <img src="@/assets/icons/website/double-quote.svg" alt="">
            </div>
            <p class="custom:w-[436px] xs:w-[392px] font-medium text-justify">Yuqori sinflarda bolalar shaxs boʻlib,
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
    <img src="@/assets/images/website/banner-01.svg"
         class="absolute transition-all ease-linear lg:block xs:hidden -bottom-48 -right-96 -z-20"
         alt="">
  </section>
</template>

<script setup lang="ts">
import {useUserStore} from "@/store/userStore";
import SendApplication from "@/components/SendApplication.vue"
import {ref} from "vue";

const userStore = useUserStore()
const cond = ref(true)
const toggle = () => cond.value = !cond.value


</script>

<style>
.firstStep-enter-active,
.firstStep-leave-active {
  transition: all 0.5s linear;
}


.firstStep-enter-from,
.firstStep-leave-to {
  opacity: 0;
  transform: translateY(-50%);
  /*transform: scale(0.8);*/
}

.secondStep-enter-active,
.secondStep-leave-active {
  transition: all 0.5s linear;
}


.secondStep-enter-from,
.secondStep-leave-to {
  opacity: 0;
  transform: translateY(50%);
  /*transform: scale(0.8);*/
}
</style>