<template>
  <section class="welcome" v-cloak>
    <div class="bg-white absolute lg:w-[56%] xs:w-full xl:h-screen xs:h-full -z-10"></div>
    <div class="container mx-auto py-[48px] 2xl:px-[120px] xs:px-4 ">
      <div
          class="flex justify-between lg:flex-row lg:items-start lg:justify-between xs:justify-center">
        <div class=" lg:min-w-[45%] xs:min-w-[587px]">
          <Transition name="firstStep">
            <div v-show="steps === STEPS.INIT">
              <SendApplication @data-submit="onSubmit"></SendApplication>
            </div>
          </Transition>
          <Transition name="secondStep">
            <div v-if="steps === STEPS.SUCCESS" class="">
              <div class="">
                <div class="mb-8">
                  <Vue3Lottie
                      :animationData="SuccessLottie"
                      :height="120"
                      :width="120"
                      :delay="1000"
                      :loop="false"
                      :speed="1.2"
                  />
                </div>
                <p class="text-sm font-medium text-[#2E384D] text-center mb-2">Ma’lumotlar tekshirish uchun
                  yuborildi.</p>
                <p class="text-xs font-medium text-[#B2B7C1] text-center max-w-[300px] mx-auto">Tez orada siz bilan
                  operatorimiz
                  bog’lanib,
                  barcha
                  ma’lumotlarni
                  aniqlashtiradi.</p>
              </div>
            </div>
          </Transition>
          <Transition>
            <div class="" v-if="steps===STEPS.ERROR">
              <Vue3Lottie
                  :animationData="ErrorLottie"
                  :height="120"
                  :width="120"
                  :delay="1000"
                  :loop="false"
                  :speed="1"
              />
              <p class="text-sm font-medium text-[#2E384D] text-center mb-2">Eyy aytkim kelmagandi</p>
              <p class="text-xs font-medium text-[#B2B7C1] text-center max-w-[300px] mx-auto">
                Tizimda qandaydir hatolik yuz berdi hammasiga back-end chilar aybdor.
              </p>
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
import SendApplication from "@/components/SendApplication.vue"
import SuccessLottie from "@/assets/lotties/success-lottie.json"
import ErrorLottie from "@/assets/lotties/error-lottie.json"
import {Ref, ref} from "vue";
import {publicApi} from "@/plugins/axios";
import {useSponsorStore} from "@/store/useSponsorStore";
import {STEPS} from "@/typing/enums/stepper";


const {application} = useSponsorStore()
const steps: Ref<STEPS> = ref('INIT' as STEPS.INIT)


async function onSubmit() {
  const {fullName, phoneNumber, sponsorType, sponsorFirm, sums, yourSums} = application;
  const submitData = {
    full_name: fullName,
    phone: '+9989' + phoneNumber,
    sum: sums !== 'boshqa' ? sums : yourSums,
    payment_type: [44],
    firm: sponsorFirm,
    spent: 0,
    comment: ""
  }

  try {
    const response = await publicApi.post('/sponsor-create/', submitData)
    if (response.status === 201) {
      steps.value = STEPS.SUCCESS
    }
  } catch (error) {
    console.log(error)
    steps.value = STEPS.ERROR
  }
}
</script>

<style>
.firstStep-enter-active,
.firstStep-leave-active {
  transition: all 0.8s linear;
}


.firstStep-enter-from,
.firstStep-leave-to {
  opacity: 0;
  transform: translateY(-50%);
  /*transform: scale(0.8);*/
}

.secondStep-enter-active,
.secondStep-leave-active {
  transition: all 1s linear;
}


.secondStep-enter-from,
.secondStep-leave-to {
  opacity: 0;
  transform: translateY(50%);
  /*transform: scale(0.8);*/
}
</style>