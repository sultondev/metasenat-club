<template>
  <div class="multiselect-wrapper relative" v-if="variant === 1">
    <button class="multiselect__button">
      <span>{{ value.length > 0 ? value.length + ' ta tanlangan' : "Arizalar holatlarni tanlang" }}</span>
      <span class="multiselect__arrow">
        <img src="@/assets/icons/website/arrow-down.svg" alt="Down Up arrow"/>
      </span>
    </button>
    <form @submit.prevent class="multiselect-form">
      <ul class="multiselect-list w-full">
        <li class="multiselect-list__item w-full"
            :class="{activeBg: containValue(value, option.id)}"
            v-for="(option, idx) in options">
          <input type="checkbox" :value="option.id" class="multiselect-form__input"
                 v-model="value" name="item" :id="String(option.id)"/>
          <label :for="String(option.id)" class="multiselect-form__label">
            <span>{{ titleCase(option.label) }}</span>
            <img src="@/assets/icons/website/checked-icon.svg" alt="Cheked" v-show="containValue(value, option.id)"/>
          </label>
        </li>
      </ul>
    </form>
  </div>

  <div class="relative" v-else-if="variant === 2">
    <form @submit.prevent class="">
      <ul class="grid grid-cols-4 gap-[12px]">
        <li class="relative max-w-[124px] border-2 border-[transparent] bg-[#E0E7FF] rounded" v-if="hideAll"
            :class="{'border-2 !border-[#2E5BFF]': value.includes('barchasi')}">
          <input type="checkbox" value="barchasi"
                 class="multiselect-form__input"
                 v-model="value"
                 name="item"
                 id="all">
          <label for="all"
                 class=" w-full font-medium text-xs block py-3 px-4 text-center">
            Barchasi
          </label>
          <span class="absolute -top-2 -right-2">
          <img src="@/assets/icons/website/checked-icon.svg" alt="Cheked"
               v-show="value.includes('barchasi')">
          </span>
        </li>
        <li class="relative max-w-[124px] border-2 border-[#E0E7FF] rounded"
            :class="{'border-2 border-[#2E5BFF]': value.includes(option.label)}"
            v-for="(option, idx) in options">
          <input type="checkbox" :value="option.label"
                 class="hidden multiselect-form__input appearance-none"
                 v-model="value"
                 name="item"
                 :id="String(option.id)">
          <label :for="String(option.id)"
                 class=" w-full font-medium text-xs block py-[12px] px-[16px] flex">
            <span class="whitespace-nowrap mr-[2px]">{{ numberWithSpaces(option.label) }} </span>
            <span class="text-[#2E5BFF]"> UZS</span>
          </label>
          <span class="absolute -top-2 -right-2">
          <img src="@/assets/icons/website/checked-icon.svg" alt="Cheked"
               v-show="value.includes(option.label)">
          </span>
        </li>
        <li class="relative max-w-[124px] border-2 border-[transparent] bg-[#E0E7FF] rounded-[5px]" v-if="additional"
            :class="{'border-2 !border-[#2E5BFF]': value.includes('boshqa')}">
          <input type="checkbox" value="barchasi"
                 class="hidden multiselect-form__input appearance-none"
                 v-model="value"
                 name="item"
                 id="all">
          <label for="all"
                 class=" w-full font-medium text-xs block text-sm py-3 px-4 text-center">
            BOSHQA
          </label>
          <span class="absolute -top-2 -right-2">
          <img src="@/assets/icons/website/checked-icon.svg" alt="Cheked"
               v-show="value.includes('boshqa')">
          </span>
        </li>
      </ul>
    </form>
  </div>
</template>

<script setup lang="ts">


import {ref, watch} from "vue";
import {titleCase} from "@/helpers/stringFuncs";
import {numberWithSpaces} from "@/helpers/sum"

type optionsType = {
  label: string;
  id: number | string;
}

interface BaseInputProps {
  options: optionsType[];
  variant: number;
  classes?: string | [] | object;
  hint?: string;
  defaultValue?: string[];
  inpType?: string;
  hideAll?: boolean;
  additional?: boolean;

}

interface Emits {
  (e: "update:modelValue", val: string[]): void
}

const props = defineProps<BaseInputProps>()
const emit = defineEmits<Emits>()
const isDropdownOpen = ref(false)
const value: string[] | number[] | any = ref([])


const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

watch(() => value.value, () => {
  emit("update:modelValue", value.value)
})

watch(() => props.defaultValue, () => {
  if (props.defaultValue) {
    value.value = props.defaultValue
    emit("update:modelValue", value.value)
  }
})

if (props.defaultValue) {
  value.value = props.defaultValue
  emit("update:modelValue", value.value)
}

function containValue(theArray: string[] | number[], theValue: string | number) {
  if (Array.isArray(theArray)) {
    return theArray.some((item) => item == theValue)
  } else {
    return theArray == theValue
  }
}


</script>

<style>

.multiselect-wrapper:focus-within > button {
  @apply border-primary;
}

.multiselect-wrapper:focus-within > form {
  opacity: 1;
  visibility: visible;
}

.multiselect-wrapper:focus-within .multiselect__arrow {
  @apply rotate-180;
}


.multiselect__button {
  @apply py-3 border-2 text-sm w-full flex justify-between border-[#E0E7FF] text-left px-4 rounded-xl bg-[#F9FAFF];
}

.multiselect__arrow {
  @apply rotate-0 transition-all
}


.multiselect-form {
  @apply transition-all absolute top-[56px] z-[1000] bg-white w-full;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.multiselect-form__label {
  @apply cursor-pointer hover:bg-blue-200 w-full block text-sm py-3 px-4 flex justify-between;
}


.multiselect-form__input {
  @apply hidden appearance-none;
}

.multiselect-list__item {
  @apply border-[#E0E7FF];
  border-width: 0 1px 1px 1px;
}

.multiselect-list__item:first-child {
  border-width: 1px;
  border-radius: 12px 12px 0 0;
}

.multiselect-list__item:first-child > label {
  @apply rounded-t-xl;
}

.multiselect-list__item:last-child > label {
  @apply rounded-b-xl;
}


.multiselect-list__item:last-child {
  border-width: 0 1px 1px 1px;
  border-radius: 0 0 12px 12px;
}

.activeBg {
  background-color: #e9e9ff;
}

</style>
