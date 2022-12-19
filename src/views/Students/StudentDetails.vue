<template>

  <div class="">
    <TheHeader left-classes="flex" right-classes="">
      <template #left>
        <button class="mr-6" @click="router.push({path: '/main/students'})"><img
            src="@/assets/icons/website/back-icon.svg"
            alt="Back Icon"></button>
        <h6 class="text-2xl font-bold  mr-[12px]">{{ student.full_name }}</h6>
        <span
            class="bg-[#DDFFF2] py-[6px] px-[12px] rounded-[5px] text-[#00CF83] text-xs flex items-center font-normal">
            {{ student.get_status_display }}
        </span>
      </template>
    </TheHeader>

    <section class="details py-[40px]" v-if="student.id">
      <div class="bg-white rounded-xl p-8 max-w-[793px] w-full mx-auto mb-10">
        <div class="flex justify-between items-center mb-8">
          <h6 class="text-2xl">Talaba haqida</h6>
          <button class="flex items-center py-[9px] px-[32px] bg-[#EDF1FD] rounded-[5px] text-[#3365FC]"
                  @click="toggleModal">
            <img src="@/assets/icons/website/edit.svg" class="mr-[10px]" alt="Edit Icon">
            Tahrirlash
          </button>
        </div>
        <div class="flex items-center mb-6">
          <span class="text-xs text-[#3366FF] bg-[#E5EBFF] px-3 whitespace-nowrap font-medium">Asosiy ma’lumotlar</span>
          <span class="h-[1px] w-full bg-[#E4E8F0]"></span>
        </div>
        <div class="flex items-center mb-[24px]">
          <div class="px-[18px] py-4 bg-[#EAECF0] mr-5 w-fit rounded-[5px]">
            <img src="@/assets/icons/website/user-picture.svg" alt="">
          </div>
          <h6 class="max-w-[183px] text-xl font-medium">
            {{ student.full_name }}
          </h6>
        </div>
        <div class="flex mb-8">
          <div class="font-medium  mr-[227px]">
            <h6 class="text-xs text-[#B5B5C3] mb-2 uppercase">telfon raqam</h6>
            <p class="text-xs text-base">{{ student.phone }}</p>
          </div>
        </div>
        <div class="flex items-center mb-6">
          <span class="text-xs text-[#3366FF] bg-[#E5EBFF] px-3 whitespace-nowrap font-medium">O‘qish joyi haqida ma’lumot</span>
          <span class="h-[1px] w-full bg-[#E4E8F0]"></span>
        </div>
        <div class="">
          <ul class="grid grid-cols-2 gap-x-7 gap-y-6">
            <li class="">
              <div class="uppercase text-xs font-medium text-[#B5B5C3] mb-2">OTM</div>
              <div class="font-medium text-base ">{{ student.institute.name }}</div>
            </li>
            <li class="">
              <div class="uppercase text-xs font-medium text-[#B5B5C3] mb-2">Talabalik turi</div>
              <div class="capitalize font-medium text-base ">{{ getDiplomaType(student.type) }}</div>
            </li>
            <li class="">
              <div class="uppercase text-xs font-medium text-[#B5B5C3] mb-2">Ajratilingan summa</div>
              <div class="font-medium text-base ">{{ numberWithSpaces(student.given) }} <span>UZS</span></div>
            </li>
            <li class="">
              <div class="uppercase text-xs font-medium text-[#B5B5C3] mb-2">Kontrakt miqdori</div>
              <div class="font-medium text-base ">{{ numberWithSpaces(student.contract) }} <span>UZS</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="bg-white rounded-xl p-8 max-w-[793px] w-full  mx-auto">
        <div class="">
          <div class="flex justify-between items-center ">
            <h6 class="text-2xl font-bold">
              Talabaga homiylar
            </h6>
            <button
                class="flex items-center py-[9px] px-[32px] bg-[#EDF1FD] hover:bg-[#E0E7FF] rounded-[5px] text-[#3365FC]"
                @click="toggleModal(2)">
              <img src="@/assets/icons/website/increase-icon.svg" class="mr-[10px]" alt="Edit Icon">
              Homiy qo‘shish
            </button>
          </div>
          <div class="mt-[26px]" v-if="sponsors.length > 0">
            <Table classes="w-full table-auto border-separate border-spacing-y-4">
              <template #thead>
                <tr class="text-xs text-[#B1B1B8] uppercase text-center">
                  <th class="text-left px-4">#</th>
                  <th class=" text-left">F.I.SH.</th>
                  <th class="">Ajratilingan summa</th>
                  <th class="">Amallar</th>
                </tr>
              </template>
              <template #tbody>
                <tr v-for="(sponsor, idx) in sponsors"
                    :key="sponsor"
                    class="border-spacing-y-4 border-separate text-sm border-[#FBFBFC]">
                  <td class="py-[23px] bg-[#FBFBFC] rounded-l-xl px-4 border-y border-l">
                    {{ idx + 1 }}
                  </td>
                  <td class="py-[23px]  bg-[#FBFBFC] font-bold text-ellipsis border-y">{{
                      sponsor.sponsor.full_name
                    }}
                  </td>

                  <td class="py-[23px]  bg-[#FBFBFC] text-center whitespace-nowrap px-4 border-y">
                  <span class="font-medium text-slate-700 mr-1">
                    {{ numberWithSpaces(sponsor.summa) }}
                  </span>
                    <span class="text-[#B2B7C1]">UZS</span>
                  </td>
                  <td class="py-[23px]  bg-[#FBFBFC] text-center rounded-r-[12px] cursor-pointer px-4 border-y border-r">
                    <button @click="selectSponsor(sponsor.sponsor.id)" class="cursor-pointer">
                      <span class="icon-edit text-2xl text-blue-600"></span>
                      {{ sponsor.sponsor.id }}
                    </button>
                  </td>
                </tr>
              </template>
            </Table>
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


  <!--  <teleport to="#modal">-->
  <!--    <TheModal :is-modal-open="isEditModalOpen" @close-modal="toggleModal" :window-num="1">-->
  <!--      <SponsorDetailsModal></SponsorDetailsModal>-->
  <!--    </TheModal>-->
  <!--  </teleport>-->

  <teleport to="#modal">
    <TheModal :is-modal-open="modals.isAddModalOpen" @close-modal="toggleModal" :window-num="2">
      <AddSponsorModal @close-modal="toggleModal(2)" :student-id="student.id"
                       @data-submit="addSponsor" :input-error="inputErrors"></AddSponsorModal>
    </TheModal>
  </teleport>

  <teleport to="#modal">
    <TheModal :is-modal-open="modals.isEditSponsorModalOpen" @close-modal="toggleModal" :window-num="3">
      <EditSponsorModal @close-modal="toggleModal(3)" :sponsor-id="selectedSponsor"
                        @data-submit="addSponsor"></EditSponsorModal>
    </TheModal>
  </teleport>

</template>

<script setup lang="ts">
// third package funcs
import {reactive, Ref, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {fetchData, publicApi} from "@/plugins/axios";
import {getDiplomaType} from "@/helpers/institute"

// composables
import {useSponsors} from "@/composables/sponsors";
import {useStudents} from "@/composables/student";

// components
import Table from "@/components/UI/Table.vue"
import TheHeader from "@/components/TheHeader.vue"
import TheModal from "@/components/UI/TheModal.vue"
import AddSponsorModal from "@/components/ModalContents/Students/AddSponsorModal.vue";
import EditSponsorModal from "@/components/ModalContents/Students/EditSponsorModal.vue";

// constant
import {defaultInputFields} from "@/constants/students";

// types
import {inputErrorsType} from "@/typing/types/sponsor";
import {studentSponsorType, studentType} from "@/typing/types/students";
import {sponsorshipValidation} from "@/plugins/vuelidate";
import {transformSums, numberWithSpaces} from "@/helpers/sum";


const router = useRouter()
const route = useRoute()
const student: studentType | any = ref({})
const inputErrors: Ref<inputErrorsType> = ref(defaultInputFields)
const selectedSponsor = ref(0)


const modals = reactive({
  isEditModalOpen: false,
  isAddModalOpen: false,
  isEditSponsorModalOpen: false,
})
// @ts-ignore
const sponsors: Ref<studentSponsorType[]> = ref()

const {
  validateInputAll,
  sponsorIdValidation,
  sumsValidation,
  sponsorSumValidation
} = useStudents()

fetchTheUser(route.params.id)

function selectSponsor(id: any) {
  selectedSponsor.value = id
  toggleModal(3)
}

function toggleModal(key: number) {
  if (key === 1) modals.isEditModalOpen = !modals.isEditModalOpen
  else if (key === 2) modals.isAddModalOpen = !modals.isAddModalOpen
  else if (key === 3) modals.isEditSponsorModalOpen = !modals.isEditSponsorModalOpen
}

async function fetchTheUser(id: any) {
  try {
    const response: any = await publicApi.get(`/student-detail/${id}`)
    const sponsors: any = await fetchSponsors(id)
    if (response.status === 200) {
      // @ts-ignore
      student.value = response.data
      console.log(response.data)
    }
  } catch (error: any) {
    console.log(error)
  }
}

async function fetchSponsors(id: any) {
  try {
    const response: any = await publicApi.get(`/student-sponsor/${id}`)
    if (response.status === 200) {
      // @ts-ignore
      sponsors.value = response.data.sponsors
      console.log(response.data)
      console.log(sponsors)
    }
  } catch (error: any) {
    console.log(error)
  }
}

async function addSponsor(sponId: number | string, sum: string) {
  try {
    if (sponsorIdValidation(sponId) && sponsorSumValidation(sum)) {
      const response = await publicApi.post('/sponsor-summa-create/', {
        sponsor: sponId,
        summa: transformSums(sum) ?? 0,
        student: student.value.id
      })
      if (response.status === 201) {
        modals.isAddModalOpen = false
        await fetchSponsors(student.value.id)
      }
    } else {
      inputErrors.value.sponsorId.status = !sponsorIdValidation(sponId)
      inputErrors.value.sums.status = !sponsorSumValidation(sum)
    }
  } catch (error: any) {
    const {response} = error
    console.log(error)
    if (response.status === 400) {
      inputErrors.value.sponsorSumLimit.status = true
      console.log(response)
    }
  }
}

</script>

<style scoped></style>