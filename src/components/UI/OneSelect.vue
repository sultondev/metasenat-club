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
            :class="{activeBg: value.includes(option.label)}"
            v-for="(option, idx) in options">
          <input type="checkbox" :value="option.label"
                 class="hidden multiselect-label__box appearance-none"
                 v-model="value"
                 name="item"
                 :id="String(option.id)">
          <label :for="String(option.id)"
                 class=" w-full block text-[14px] multiselect-label py-[12px] px-[16px] flex justify-between">
            <span>{{ titleCase(option.label) }}</span>
            <img src="@/assets/icons/website/checked-icon.svg" alt="Cheked"
                 v-show="value.includes(option.label)">
          </label>
        </li>
      </ul>
    </form>
  </div>

  <div class="relative" v-else-if="variant === 2">
    <form @submit.prevent class="">
      <ul class="grid grid-cols-4 gap-[12px]">
        <li class="relative max-w-[124px] border-[2px] border-[#E0E7FF] rounded-[5px]"
            :class="{'border-[2px] border-[#2E5BFF]': value === option.label}"
            v-for="(option, idx) in options">
          <input type="radio" :value="option.label"
                 class="hidden multiselect-label__box appearance-none"
                 v-model="value"
                 name="item"
                 :id="String(option.id)">
          <label :for="String(option.id)"
                 class=" w-full font-medium text-[12px] block text-[14px] py-[12px] px-[16px] flex">
            <span class="whitespace-nowrap mr-[2px]">{{ numberWithSpaces(option.label) }} </span>
            <span class="text-[#2E5BFF]"> UZS</span>
          </label>
          <span class="absolute -top-2 -right-2">
          <img src="@/assets/icons/website/checked-icon.svg" alt="Cheked"
               v-show="value === option.label">
          </span>
        </li>
        <li class="relative max-w-[124px] border-2 border-[transparent] bg-[#E0E7FF] rounded-[5px]" v-if="additional"
            :class="{'border-[2px] !border-[#2E5BFF]': value === 'boshqa'}">
          <input type="radio" value="boshqa"
                 class="hidden multiselect-label__box appearance-none"
                 v-model="value"
                 name="item"
                 id="all">
          <label for="all"
                 class=" w-full font-medium text-[12px] block text-[14px] py-[12px] px-[16px] text-center">
            BOSHQA
          </label>
          <span class="absolute -top-2 -right-2">
          <img src="@/assets/icons/website/checked-icon.svg" alt="Cheked"
               v-show="value ==='boshqa'">
          </span>
        </li>
      </ul>
    </form>
  </div>
</template>

<script setup lang="ts">


import {ref, watch} from "vue";
import {useSponsors} from "@/composables/sponsors";

type optionsType = {
  label: string;
  id: number;
}

interface BaseInputProps {
  options: optionsType[];
  variant: number;
  classes?: string | [] | object;
  hint?: string;
  resetValue?: string[];
  required?: boolean;
  inpType?: string;
  hideAll?: boolean;
  additional?: boolean
}

interface Emits {
  (e: "update:modelValue", val: string[]): void
}

const props = defineProps<BaseInputProps>()
const emit = defineEmits<Emits>()
const isDropdownOpen = ref(false)
const value: any = ref()
const {numberWithSpaces, titleCase} = useSponsors()


const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

watch(() => value.value, () => {
  emit("update:modelValue", value.value)
})

watch(() => props.resetValue, () => {
  value.value = props.resetValue
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
