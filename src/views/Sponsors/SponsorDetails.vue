<template>

  <div class="">
    <TheHeader left-classes="flex" list-class="xl:flex-row gap-0">
      <template #left>
        <button class="mr-6" @click="router.back()"><img
            src="@/assets/icons/website/back-icon.svg"
            alt="Back Icon"></button>
        <h6 class="text-2xl font-bold  mr-[12px]">{{ sponsor.full_name }}</h6>
        <span
            class="bg-[#DDFFF2] py-[6px] px-[12px] rounded-[5px] text-[#00CF83] text-xs flex items-center font-normal">
          {{
            sponsor.get_status_display
          }}
        </span>
      </template>
    </TheHeader>

    <section class="details py-[40px]" v-if="sponsor.id">
      <div class="bg-white rounded-xl p-8 max-w-[793px] w-full  mx-auto">
        <div class="flex justify-between items-center mb-[32px]">
          <h6 class="text-2xl">Homiy haqida</h6>
          <BaseButton class="secondary__button" @open-modal="toggleModal" action-name="open-modal" text="Tahrirlash">
            <span class="icon-edit icons"></span>
          </BaseButton>
        </div>
        <div class="flex items-center mb-[24px]">
          <div class="px-[18px] py-4 bg-[#EAECF0] mr-[20px] w-fit rounded-[5px]">
            <img src="@/assets/icons/website/user-picture.svg" alt="">
          </div>
          <h6 class="max-w-[183px] text-xl font-medium">
            {{ sponsor.full_name }}
          </h6>
        </div>
        <div class="flex">
          <div class="font-medium  mr-[227px]">
            <h6 class="text-xs text-[#B5B5C3] mb-2 uppercase">telfon raqam</h6>
            <p class="text-xs text-base">{{ sponsor.phone }}</p>
          </div>
          <div class="font-medium">
            <h6 class="text-xs text-[#B5B5C3] mb-2 uppercase">homiylik summasi</h6>
            <p class="text-xs text-base">{{ numberWithSpaces(sponsor.sum) }}</p>
          </div>
        </div>
        <div class="w-full mt-6" v-if="sponsor.is_legal">
          <div class="font-medium  mr-[227px]">
            <h6 class="text-xs text-[#B5B5C3] mb-2 uppercase">Tashkilot nomi</h6>
            <p class="text-xs text-base">{{ sponsor.firm }}</p>
          </div>
        </div>
      </div>
    </section>
    <div class="mx-auto my-[32px]" v-else>
      <img src="@/assets/images/website/loading.gif" class="block mx-auto w-[100px] h-[100px]" alt="Loading Gif">
    </div>
    <div class="relative w-[820px] left-1/2 translate-x-[-50%] -bottom-48 -z-10">
      <img src="@/assets/images/website/banner-01.svg" class="w-auto" alt="">
    </div>
  </div>
  <teleport to="#modal">
    <TheModal :is-modal-open="isModalOpen" @close-modal="closeModal">
      <EditModal @close-modal="closeModal" @update-sponsor="fetchTheSponsor" :sponsor-id="sponsorId"></EditModal>
    </TheModal>
  </teleport>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {useSponsors} from "@/composables/sponsors";
import TheHeader from "@/components/TheHeader.vue"
import TheModal from "@/components/UI/TheModal.vue"
import EditModal from "@/components/ModalContents/Sponsors/EditModal.vue"
import {ref} from "vue";
import {numberWithSpaces} from "@/helpers/sum"
import BaseButton from "@/components/UI/BaseButton.vue"

type sponsorType = {
  id: number,
  full_name: string,
  phone: string,
  sum: number,
  is_legal: boolean
  get_status_display: string
  firm: string
}

const router = useRouter()
const route = useRoute()
const sponsor: sponsorType | any = ref({})
const {fetchSponsorById} = useSponsors()
const isModalOpen = ref(false)
const sponsorId = ref(route.params.id)

fetchTheSponsor(sponsorId.value)

function toggleModal() {
  isModalOpen.value = !isModalOpen.value
}

function closeModal() {
  isModalOpen.value = false
}

async function fetchTheSponsor(id: any) {
  try {
    const response: any = await fetchSponsorById(id)
    if (response.status === 200) {
      // @ts-ignore
      sponsor.value = response.data
    }
  } catch (error: any) {
    console.log(error.message)
  }
}


</script>

<style scoped></style>