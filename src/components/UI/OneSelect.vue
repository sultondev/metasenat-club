<template>
  <div class="relative" v-if="variant === 1 && options.length > 0">
    <button
        class="oneselect__button py-[12px] border text-[15px] w-full flex justify-between border-[#E0E7FF] text-left px-[16px] rounded-xl bg-[#F9FAFF]"
        :class="{'border-rose-600': isWrong}"
    >
      <span>{{ value > 0 ? findLabel() : title }}</span>
      <span class="down-up transition-all">
        <img src="@/assets/icons/website/arrow-down.svg" alt="">
      </span>
    </button>
    <div class="onselect dropdown absolute top-[56px] z-[1000] bg-white w-full rounded-xl"
         :class="dropdownClass">
      <ul class="onselect-list w-full transition-all ease-linear overflow-y-scroll max-h-80 rounded-xl">
        <li class="onselect-list__item w-full hover:bg-[#e9e9ff] transition-all ease-linear"
            :class="{activeBg: value == option.id}"
            v-for="(option, idx) in options">
          <input type="radio" :value="option.id"
                 class="hidden onselect-label__box appearance-none"
                 v-model="value"
                 name="items"
                 :id="String(option.id)">
          <label :for="String(option.id)"
                 class="w-full block text-sm onselect-label py-3 px-4 flex justify-between cursor-pointer">
            <span>{{ titleCase(option.label) }}</span>
            <img src="@/assets/icons/website/checked-icon.svg" alt="Checked icon"
                 v-show="value == option.id">
          </label>
        </li>
      </ul>
    </div>
  </div>

  <div class="relative" v-else-if="variant === 2">
    <ul class="grid grid-cols-3 gap-[12px]">
      <li class="relative"
          v-for="(option, idx) in options">
        <input type="radio" :value="option.id"
               class="hidden onselect-label__box appearance-none"
               v-model="value"
               name="item"
               required
               :id="String(option.id)">
        <label :for="String(option.id)"
               class=" w-full font-medium cursor-pointer hover:bg-blue-200 border ease-linear transition-all border-[#E0E7FF] rounded-[5px] text-xs block text-sm py-3 px-4 flex justify-center"
               :class="[{'border border-[#2E5BFF]': value == option.id}, labelClasses]"
        >
          <span class="whitespace-nowrap mr-[2px]">{{ numberWithSpaces(option.label) }} </span>
          <span class="text-[#2E5BFF]"> UZS</span>
        </label>
        <span class="absolute -top-2 -right-2">
          <img src="@/assets/icons/website/checked-icon.svg" alt="Cheked"
               v-show="value == option.id">
          </span>
      </li>
      <li class="relative border border-[transparent] bg-[#E0E7FF] ease-linear transition-all rounded-[5px]"
          v-if="additional"
          :class="{'border !border-[#2E5BFF]': value === 'boshqa'}">
        <input type="radio" value="boshqa"
               class="hidden onselect-label__box appearance-none"
               v-model="value"
               name="item"
               id="all">
        <label for="all"
               class=" w-full font-medium text-xs block text-sm py-3 px-4 text-center"
               :class="labelClasses"
        >
          BOSHQA
        </label>
        <span class="absolute -top-2 -right-2">
          <img src="@/assets/icons/website/checked-icon.svg" alt="Cheked"
               v-show="value ==='boshqa'">
          </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">


import {ref, watch} from "vue";
import {numberWithSpaces} from "@/helpers/sum"
import {titleCase} from "@/helpers/stringFuncs";

type optionsType = {
  label: string;
  id: number;
}

interface BaseInputProps {
  options: optionsType[];
  variant: number;
  labelClasses?: string | [] | object;
  dropdownClass?: string | [] | object
  hint?: string;
  required?: boolean;
  hideAll?: boolean;
  additional?: boolean
  defaultValue?: string | number | any
  title?: string
  isWrong?: boolean
  id?: any
}

interface Emits {
  (e: "update:modelValue", val: string): void
}

const props = defineProps<BaseInputProps>()
const emit = defineEmits<Emits>()
const value: any = ref()


const getLabel = () => {
  // searching index of option to show label field
  const index = props.options.findIndex(item => (item.id == value.value))
  if (!isNaN(index)) {
    return props.options[index].label
  } else {
    return false
  }
}


watch(() => value.value, () => {
  emit("update:modelValue", value.value)
})

watch(() => props.defaultValue, () => {
  value.value = props.defaultValue
  emit("update:modelValue", value.value)
})

if (props.defaultValue) {
  value.value = props.defaultValue
  emit("update:modelValue", value.value)
}

function findLabel() {
  const index = props.options.findIndex((item: any) => item.id == value.value)
  return props.options[index].label
}

</script>

<style>
.oneselect__button {
  transition: all 0.3s ease;
  cursor: pointer;
}

.oneselect__button:focus + div {
  opacity: 1;
  visibility: visible;
}

.oneselect__button + div {
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
}

.oneselect__button:focus > .down-up {
  transform: rotate(180deg);
}

.oneselect__button:focus {
  border-color: #2E5BFF
}

.onselect-list__item {
  border-color: #E0E7FF;
  border-width: 0 1px 1px 1px;
}

.onselect-list__item:first-child {
  border-width: 1px;
  border-radius: 12px 12px 0 0;

}

.onselect-list__item:last-child {
  border-width: 0 1px 1px 1px;
  border-radius: 0 0 12px 12px;
}

.activeBg {
  background-color: #e9e9ff;
}

</style>
