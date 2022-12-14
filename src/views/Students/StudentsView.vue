<template>
  <section class="students" v-cloak>
    <div class="responsive-container">
      <div class="w-full flex justify-end">
        <router-link to="/students/create"
                     class="primary__button text-sm"
        >
          <span class="icon-increase text-base mr-2.5"></span>
          <span>Talaba qo'shish</span>
        </router-link>
      </div>
      <div class="overflow-x-scroll mb-1.5 mt-3">
        <div class="mx-auto"
             v-if="listOfStudents.length === 0 && !fetchError.error || mainStore.loading">
          <img src="@/assets/images/website/loading.gif" class="block mx-auto w-[100px] h-[100px]" alt="Loading Gif">
        </div>
        <div class="" v-else-if="listOfStudents.length > 0">
          <Table classes="responsive-table">
            <template #thead>
              <tr class="text-xs text-[#B1B1B8] uppercase text-center">
                <th class="text-left px-4">#</th>
                <th class=" text-left">{{ $t('table.head.full_name') }}</th>
                <th class="">Talabalik turi</th>
                <th class="px-4 whitespace-nowrap">OTM</th>
                <th class="px-4 whitespace-nowrap">Ajratilgan summa</th>
                <th class="px-4">Kontrakt miqdori</th>
                <th class=" px-4">Amallar</th>
              </tr>
            </template>
            <template #tbody>
              <tr v-for="(student, idx) in filterStudents"
                  :key="student.full_name.trim()+student.id" class="">
                <td class=" bg-white rounded-l-[12px] px-4">
                  {{ (page - 1) * size + idx + 1 }}
                </td>
                <td class="  bg-white font-bold text-ellipsis">{{ student.full_name }}</td>
                <td class="  bg-white text-center capitalize">
                  {{
                    getDiplomaType(student.type)
                  }}
                </td>
                <td class="  bg-white text-center font-medium">
                  <span class="font-medium text-slate-700">
                    {{ student.institute.name }}
                  </span>
                </td>
                <td class="  bg-white text-center whitespace-nowrap font-medium">
                  <span class="font-medium text-slate-700">
                  {{ numberWithSpaces(student.given) }}
                  </span> <span class="text-[#B2B7C1]">UZS</span>
                </td>
                <td class="  bg-white text-center whitespace-nowrap px-4">
                  <span class="font-medium text-slate-700">
                  {{ numberWithSpaces(student.contract) }}
                  </span> <span class="text-[#B2B7C1]">UZS</span>
                </td>
                <td class="  bg-white text-center rounded-r-[12px] px-4">
                  <router-link :to="'/main/students/'+student.id" class="w-fit block mx-auto">
                    <img src="@/assets/icons/website/eye.svg" alt="Eye icon">
                  </router-link>
                </td>
              </tr>
            </template>
          </Table>
          <NotFound :condition="filterStudents.length === 0"
                    text="Uzur siz qidirayotgan homiy ro'yxatda yo'q">
            <img src="@/assets/icons/website/empty.svg" alt="" class="mx-auto">
          </NotFound>
        </div>
        <div class="" v-else>
          <p class="">{{ fetchError.message }}</p>
        </div>
      </div>
      <div class="container mx-auto" v-if="listOfStudents.length > 1">
        <div class="container mx-auto flex justify-between items-center gap-[40px] ">
          <div class="whitespace-nowrap text-[15px]">
            {{ totalCount }} tadan
            {{ (page - 1) * size + 1 }}-{{ sponsorListEnd }}
            ko'rsatilmoqda
          </div>
          <ul class="flex items-center gap-[12px]">
            <li class="flex gap-2 items-center">
              <p class="text-[15px]">Ko'rsatish</p>
            </li>
            <li class="flex items-center gap-[20px] pb-[0px]  max-w-full">
              <ThePagination :count="totalCount"></ThePagination>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

</template>

<script setup lang="ts">

import {computed, inject, onMounted, reactive, Ref, ref, watch} from "vue";
import Table from "@/components/UI/Table.vue"
import ThePagination from "@/components/ThePagination.vue"
import NotFound from "@/components/UI/NotFound.vue"

import {useRoute, useRouter} from "vue-router";
import {studentsListType} from "@/typing/types/students";
import {useMainStore} from "@/store/useMainStore";
import {getDiplomaType} from "@/helpers/institute"
import {numberWithSpaces} from "@/helpers/sum"
import {DEFAULT_INSTITUTE, DEFAULT_STUDY_TYPE} from "@/constants/institute";

const mainStore = useMainStore()

const fetchData: any = inject("fetchData")
const fetchError: any = ref({});
const router = useRouter();
const route = useRoute();
const listOfStudents: Ref<studentsListType[]> = ref([])
const page = ref(+route.query.page! || 1)
const size = ref(+route.query.size! || 15)
const filters = reactive({
  name: route.query.filters || "",
  studyType: route.query.type || DEFAULT_STUDY_TYPE,
  institute: route.query.institute || DEFAULT_INSTITUTE
})

const totalCount = ref(0)
const sponsorListLength = ref(listOfStudents.value.length)
const sponsorListEnd = computed(() => (listOfStudents.value.length >= size.value || sponsorListLength.value === listOfStudents.value.length ?
    listOfStudents.value.length * page.value : totalCount))


const fetchStudentsData = async () => {
  setTimeout(() => {
    mainStore.loading = false
  }, 600)
  try {
    const response = await fetchData(`/student-list/?page=${route.query.page || page.value}&page_size=${route.query.size || size.value}`)
    if (response.status === 200) {
      totalCount.value = response.data.count
      listOfStudents.value = response.data.results
    }
  } catch (error: any) {
    console.log(error)
    fetchError.value = {
      error: true,
      message: error.message
    }
  }
}

const filterStudents = computed(() => {
  if (filters.institute || filters.studyType) {
    return listOfStudents.value.filter((item: any) => {
      return checkName(item.full_name) && checkInstitute(item.institute.id) && checkStudyType(item.type)
    })
  } else {
    return listOfStudents.value
  }
})

onMounted(async () => {
  await fetchStudentsData()
})


watch(route, async () => {
  filters.name = route.query.filters || ""
  page.value = +route.query.page! || 1
  size.value = +route.query.size! || 15
  filters.institute = route.query.institute || DEFAULT_INSTITUTE
  filters.studyType = route.query.type || DEFAULT_STUDY_TYPE
  await fetchStudentsData()
})

function checkInstitute(idx: any) {
  if (filters.institute != DEFAULT_INSTITUTE) {
    return idx == filters.institute
  } else return true
}

function checkStudyType(idx: any) {
  if (filters.studyType != DEFAULT_STUDY_TYPE) {
    return idx == filters.studyType
  } else return true
}

function checkName(name: string) {
  const searchedName = String(filters.name).toLowerCase()
  const studentName = name.toLowerCase()
  if (filters.name.length > 0) {
    return studentName.includes(searchedName)
  } else return true
}

</script>

<style>

</style>