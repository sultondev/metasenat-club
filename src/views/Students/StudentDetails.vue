<template>

  <div class="">
    <TheHeader left-classes="flex" right-classes="">
      <template #left>
        <button class="mr-[24px]" @click="router.back()"><img
            src="@/assets/icons/website/back-icon.svg"
            alt="Back Icon"></button>
        <h6 class="text-2xl font-bold  mr-[12px]">{{ student.full_name }}</h6>
        <span
            class="bg-[#DDFFF2] py-[6px] px-[12px] rounded-[5px] text-[#00CF83] text-xs flex items-center font-normal">{{
            student.get_status_display
          }}</span>
      </template>
    </TheHeader>

    <section class="details py-[40px]" v-if="student.id">
      <div class="bg-white rounded-xl p-8 max-w-[793px] w-full mx-auto mb-10">
        <div class="flex justify-between items-center mb-8">
          <h6 class="text-2xl">Talaba haqida</h6>
          <!--          <button class="flex items-center py-[9px] px-[32px] bg-[#EDF1FD] rounded-[5px] text-[#3365FC]"-->
          <!--                  @click="toggleModal">-->
          <!--            <img src="@/assets/icons/website/edit.svg" class="mr-[10px]" alt="Edit Icon">-->
          <!--            Tahrirlash-->
          <!--          </button>-->
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
          <div class="flex justify-between items-center mb-[26px] ">
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
                <td class="py-[23px]  bg-[#FBFBFC] text-center rounded-r-[12px] px-4 border-y border-r">
                  {{ sponsor.sponsor.id }}
                </td>
              </tr>
            </template>
          </Table>

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
    <TheModal :is-modal-open="isEditModalOpen" @close-modal="toggleModal" :window-num="1">
      <SponsorDetailsModal></SponsorDetailsModal>
    </TheModal>
  </teleport>

  <teleport to="#modal">
    <TheModal :is-modal-open="isAddModalOpen" @close-modal="toggleModal" :window-num="2">
      <AddSponsorModal @close-modal="toggleModal(2)" :student-id="student.id"
                       @data-submit="addSponsor"></AddSponsorModal>
    </TheModal>
  </teleport>
</template>

<script setup lang="ts">
import {Ref, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useSponsors} from "@/composables/sponsors";
import TheHeader from "@/components/TheHeader.vue"
import TheModal from "@/components/UI/TheModal.vue"
import Table from "@/components/UI/Table.vue"
import SponsorDetailsModal from "@/components/ModalContents/Sponsors/SponsorDetailsModal.vue"
import {fetchData, publicApi} from "@/plugins/axios";
import {useStudents} from "@/composables/student";
import AddSponsorModal from "@/components/ModalContents/Students/AddSponsorModal.vue";

type instituteType = {
  id: number
  name: string
}

type sponsorType = {
  id: number,
  full_name: string,
  sponsor: {
    "id": number,
    "full_name": string
  },
  "summa": number
}


type studentType = {
  id: number,
  full_name: string,
  phone: string,
  institute: instituteType
  get_status_display: string
  contract: number
  given: number
}

type sponsorStudentType = {
  id: number,
  full_name: string,
  given: number,
  get_status_display: string,
  sponsors: sponsorType[]
}

const router = useRouter()
const route = useRoute()
const student: studentType | any = ref({})
const isEditModalOpen = ref(false)
const isAddModalOpen = ref(false)
// @ts-ignore
const sponsors: Ref<sponsorStudentType> = ref<[]>([])

const {numberWithSpaces} = useSponsors()
const {getDiplomaType} = useStudents()

fetchTheUser(route.params.id)

function toggleModal(key: number) {
  switch (key) {
    case 1:
      isEditModalOpen.value = !isEditModalOpen.value
      break;
    case 2:
      isAddModalOpen.value = !isAddModalOpen.value
      break;
    default:
      isEditModalOpen.value = !isEditModalOpen
  }
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

async function addSponsor(sponId: number | string, sum: number | string) {
  try {
    const response = await publicApi.post('/sponsor-summa-create/', {
      sponsor: sponId,
      summa: sum,
      student: student.value.id
    })
    if (response) {
      await fetchSponsors(student.value.id)
      isAddModalOpen.value = false
    }
  } catch (error) {
    console.log(error)
  }
}

</script>

<style scoped></style>