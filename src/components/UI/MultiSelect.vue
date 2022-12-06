<template>
  <div class="relative" v-if="variant === 1">
    <button
        class="py-[12px] border-2 text-[15px] w-full flex justify-between border-[#E0E7FF] text-left px-[16px] rounded-[12px] bg-[#F9FAFF]"
        :class="{'border-[#2E5BFF]': isDropdownOpen}"
        @click="toggleDropdown">
      <span>{{ value.length > 0 ? value.length + ' ta tanlangan' : "Arizalar holatlarni tanlang" }}</span>
      <span class="transition-all" :class="{'rotate-180':isDropdownOpen}"><img
          src="@/assets/icons/website/arrow-down.svg" alt=""></span>
    </button>
    <form @submit.prevent class="multiselect transition-all dropdown absolute top-[56px] z-[1000] bg-white w-full"
          v-if="isDropdownOpen">
      <ul class="multiselect-list w-full">
        <li class="multiselect-list__item w-full"
            :class="{activeBg: sponsorStore.detailedApplicationsFilter.includes(option.label)}"
            v-for="(option, idx) in options">
          <input type="checkbox" :value="option.label"
                 class="hidden multiselect-label__box appearance-none"
                 v-model="sponsorStore.detailedApplicationsFilter"
                 name="item"
                 :id="option.id">
          <label :for="option.id"
                 class=" w-full block text-[14px] multiselect-label py-[12px] px-[16px] flex justify-between">
            <span>{{ option.label }}</span>
            <img src="@/assets/icons/website/checked-icon.svg" alt="Cheked"
                 v-show="sponsorStore.detailedApplicationsFilter.includes(option.label)">
          </label>
        </li>
      </ul>
    </form>
  </div>

  <div class="relative" v-else-if="variant === 2">
    <form @submit.prevent class="">
      <ul class="grid grid-cols-4 gap-[12px]">
        <li class="relative max-w-[124px] border-[2px] border-[#E0E7FF] rounded-[5px]"
            :class="{'border-[2px] border-[#2E5BFF]': sponsorStore.detailedSumsFilter.includes(option.label)}"
            v-for="(option, idx) in options">
          <input type="checkbox" :value="option.label"
                 class="hidden multiselect-label__box appearance-none"
                 v-model="sponsorStore.detailedSumsFilter"
                 name="item"
                 :id="option.id">
          <label :for="option.id"
                 class=" w-full font-medium text-[12px] block text-[14px] py-[12px] px-[16px] flex">
            <span class="whitespace-nowrap mr-[2px]">{{ numberWithSpaces(option.label) }} </span>
            <span class="text-[#2E5BFF]"> UZS</span>
          </label>
          <span class="absolute -top-2 -right-2">
          <img src="@/assets/icons/website/checked-icon.svg" alt="Cheked"
               v-show="sponsorStore.detailedSumsFilter.includes(option.label)">
          </span>
        </li>
      </ul>
    </form>
  </div>
</template>

<script setup lang="ts">


import {ref, watch} from "vue";
import {useSponsors} from "@/composables/sponsors";
import {useSponsorStore} from "@/store/useSponsorsStore";


interface BaseInputProps {
  classes?: string | [] | object;
  hint?: string;
  id?: string;
  required?: boolean;
  options: object[];
  variant: number;
  inpType: string;
  defaultValue: string[];
}

interface Emits {
  (e: "update:modelValue", val: string[]): void
}

const props = defineProps<BaseInputProps>()
const emit = defineEmits<Emits>()
const isDropdownOpen = ref(false)
const value = ref<string[]>([])
const sponsorStore = useSponsorStore()
const {numberWithSpaces} = useSponsors()


const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

watch(() => value.value, () => {
  emit("update:modelValue", value.value)
})
</script>

<style>

.multiselect-list__item {
  border-color: #E0E7FF;
  border-width: 0 1px 1px 1px;
}

.multiselect-list__item:first-child {
  border-width: 1px;
  border-radius: 12px 12px 0 0;

}

.multiselect-list__item:last-child {
  border-width: 0 1px 1px 1px;
  border-radius: 0 0 12px 12px;
}

.activeBg {
  background-color: #e9e9ff;
}

</style>

<!--<template>-->
<!--  <input type="text" v-model="mValue" :placeholder="placeholder" :class="classes" :id="props.id">-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import {ref, watch} from "vue";-->

<!--interface Props {-->
<!--  modelValue: any;-->
<!--  placeholder?: string;-->
<!--  classes: string;-->
<!--  id: string-->
<!--}-->

<!--interface Emits {-->
<!--  (e: "update:modelValue", value: string): void-->
<!--}-->

<!--const props = defineProps<Props>()-->
<!--const emit = defineEmits<Emits>()-->

<!--const mValue = ref(props.modelValue)-->

<!--watch(() => mValue.value, () => {-->
<!--  emit("update:modelValue", mValue.value)-->
<!--})-->

<!--</script>-->