<template>
  <div class="py-7 px-8 min-w-[586px]" v-if="options.studyTypes.length > 2 && options.institutes.length > 2">
    <ModalHeaders title="Filter" @close-modal="$emit('closeModal')"></ModalHeaders>
    <div class="separate__line my-7"></div>
    <BaseFormGroup variant="1" label-title="Talabalik turi" id="study-type">
      <OneSelect :options="options.studyTypes" v-model="filters.studyType" id="study-type" :variant="1"
                 title="Iltimos, ro'yxatdan tanlang" :default-value="defaults.studyType"></OneSelect>
    </BaseFormGroup>

    <BaseFormGroup variant="1" label-title="OTM" label-classes="mt-7" id="otm">
      <OneSelect :options="options.institutes" v-model="filters.institute" id="otm" :variant="1"
                 title="Iltimos, ro'yxatdan tanlang" :default-value="defaults.institute">
      </OneSelect>
    </BaseFormGroup>

    <div class="separate__line my-7"></div>

    <div class="w-full flex justify-end gap-4">
      <button class="flex items-center  py-[9px] px-[32px] rounded-[5px] border border-primary hover:bg-[#E7E7E7]"
              @click="clean"
      >
        <span class="mr-[4px]">
          <img src="@/assets/icons/website/clean-modal.svg" alt="CLean"></span>
        <span class="text-sm text-primary font-medium">Tozalash</span>
      </button>
      <button class="hover-primary__buttons bg-[#3366FF] text-white flex items-center py-[9px] px-[32px] rounded-[5px]"
              @click="search"
      >
        <span class="icon-eye mr-5 text-2xl"></span>
        <span class="text-sm">Natijalarini ko'rish</span>
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import ModalHeaders from "@/components/ModalContents/ModalHeaders.vue"
import BaseFormGroup from "@/components/UI/BaseFormGroup.vue"
import OneSelect from "@/components/UI/OneSelect.vue"
import {DEFAULT_INSTITUTE, DEFAULT_STUDY_TYPE, studyTypes} from "@/constants/institute";
import {onMounted, reactive, watch} from "vue";
import {useInstitutes} from "@/composables/institutes";
import {useRoute, useRouter} from "vue-router";


const {fetchError, fetchInstitutes} = useInstitutes()
const router = useRouter()
const route = useRoute()
const emits = defineEmits<{ (e: 'closeModal'): void }>()

const options = reactive({
  studyTypes: [{id: 111, label: 'Barchasi'}, ...studyTypes],
  institutes: [{id: 111, label: 'Barchasi'}]
})


const filters = reactive({
  studyType: 0,
  institute: 0
})

const defaults = reactive({
  studyType: Number(route.query.type) || DEFAULT_STUDY_TYPE,
  institute: Number(route.query.institute) || DEFAULT_INSTITUTE
})

onMounted(async () => {
  const data: any = await fetchInstitutes()
  if (data.length > 2 && !fetchError.status) {
    options.institutes = [{id: 250028, label: 'Barchasi'}, ...data.map((item: any) => ({
      id: item.id,
      label: item.name
    }))]
  }
})


async function search() {
  await router.push({
    name: 'students-list',
    query: {
      ...route.query,
      institute: filters.institute,
      type: filters.studyType
    }
  })
  emits('closeModal')
}

async function clean() {
  await router.push({name: 'students-list'})
  defaults.studyType = DEFAULT_STUDY_TYPE
  defaults.institute = DEFAULT_INSTITUTE
  emits('closeModal')
}

</script>

<style>
</style>