<template>

  <div class="">
    <TheHeader left-classes="flex" right-classes="2">
      <template #left>
        <button class="mr-[24px]" @click="router.back()"><img
            src="@/assets/icons/website/back-icon.svg"
            alt="Back Icon"></button>
        <h6 class="text-2xl font-bold  mr-[12px]">{{ user.full_name }}</h6>
        <span
            class="bg-[#DDFFF2] py-[6px] px-[12px] rounded-[5px] text-[#00CF83] text-xs flex items-center font-normal">{{
            user.get_status_display
          }}</span>
      </template>
    </TheHeader>

    <section class="details py-[40px]" v-if="user.id">
      <div class="bg-white rounded-xl p-8 max-w-[793px] w-full  mx-auto">
        <div class="flex justify-between items-center mb-[32px]">
          <h6 class="text-2xl">Homiy haqida</h6>
          <!--          <button class="flex items-center py-[9px] px-[32px] bg-[#EDF1FD] rounded-[5px] text-[#3365FC]"-->
          <!--                  @click="toggleModal">-->
          <!--            <img src="@/assets/icons/website/edit.svg" class="mr-[10px]" alt="Edit Icon">-->
          <!--            Tahrirlash-->
          <!--          </button>-->
        </div>
        <div class="flex items-center mb-[24px]">
          <div class="px-[18px] py-4 bg-[#EAECF0] mr-[20px] w-fit rounded-[5px]">
            <img src="@/assets/icons/website/user-picture.svg" alt="">
          </div>
          <h6 class="max-w-[183px] text-xl font-medium">
            {{ user.full_name }}
          </h6>
        </div>
        <div class="flex">
          <div class="font-medium  mr-[227px]">
            <h6 class="text-xs text-[#B5B5C3] mb-[12px] uppercase">telfon raqam</h6>
            <p class="text-xs text-base">{{ user.phone }}</p>
          </div>
          <div class="font-medium">
            <h6 class="text-xs text-[#B5B5C3] mb-[12px] uppercase">homiylik summasi</h6>
            <p class="text-xs text-base">{{ numberWithSpaces(user.sum) }}</p>
          </div>
        </div>
      </div>
    </section>
    <div class="mx-auto my-[32px]" v-else>
      <img src="@/assets/images/website/loading.gif" class="block mx-auto w-[100px] h-[100px]" alt="Loading Gif">
    </div>
    <div class="fixed left-1/2 translate-x-[-50%]">
      <img src="@/assets/images/website/banner-01.svg" class="w-auto" alt="">
    </div>
  </div>

  <teleport to="#modal">
    <TheModal :is-modal-open="isModalOpen" @close-modal="toggleModal">
      <SponsorDetailsModal></SponsorDetailsModal>
    </TheModal>
  </teleport>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {useSponsors} from "@/composables/sponsors";
import TheHeader from "@/components/TheHeader.vue"
import TheModal from "@/components/UI/TheModal.vue"
import SponsorDetailsModal from "@/components/ModalContents/Sponsors/SponsorDetailsModal.vue"
import {ref} from "vue";


type userType = {
  id: number,
  full_name: string,
  phone: string,
  sum: number,
  is_legal: boolean
  get_status_display: string
}

const router = useRouter()
const route = useRoute()
const user: userType | any = ref({})
const {fetchUserById, numberWithSpaces} = useSponsors()
const isModalOpen = ref(false)

fetchTheUser(route.params.id)

function toggleModal() {
  isModalOpen.value = !isModalOpen.value
}

async function fetchTheUser(id: any) {
  try {
    const response: any = await fetchUserById(id)
    if (response.status === 200) {
      // @ts-ignore
      user.value = response.data
      console.log(response.data)

    }
  } catch (error: any) {
    console.log(error.message)
  }
}


</script>

<style scoped></style>