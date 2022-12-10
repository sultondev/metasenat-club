<template>
  <div class="min-w-[560px] w-[587px] flex flex-col gap-[28px] grow">
    <h4 class="font-bold text-[40px] max-w-[423px] ">
      Homiy sifatida ariza topshirish
    </h4>
    <div>
      <BaseFormGroup label-title="F.I.Sh. (Familiya Ism Sharifingiz)" label-classes="text-xs mb-2 uppercase"
                     id="fullName">
        <BaseInput v-model="application.fullName" id="fullName" hint="Abdullayev Abdulla Abdulla o’g’li"
                   classes="bg-[#E0E7FF33] border-2 border-[#E0E7FF] focus-within:bg-[#E0E7FF] rounded-md outline-none py-3 px-4 text-[15px]"/>
      </BaseFormGroup>
    </div>
    <div>
      <BaseFormGroup id="phoneNumber" label-title="Telefon raqamingiz" label-classes="text-xs mb-2 uppercase">
        <BaseInput v-model="application.phoneNumber" id="phoneNumber"
                   class="bg-[#E0E7FF33] border-2 border-[#E0E7FF] focus-within:bg-[#E0E7FF] rounded-md outline-none py-3 px-4 text-[15px]"
                   hint="+998 00 000-00-00"
        />
      </BaseFormGroup>
    </div>
    <div class="">
      <BaseFormGroup id="none" label-title="To‘lov summasi" label-classes="text-xs mb-3 uppercase">
        <OneSelect v-model="application.sums" :variant="2" reset-value="" :hide-all="false"
                   :options="generousSums" :additional="true"></OneSelect>
      </BaseFormGroup>
    </div>
    <div v-show="application.sums === 'boshqa'">
      <transition>
        <BaseInput v-model="application.yourSums"
                   inp-type="number"
                   id="phoneNumber"
                   hint="0"
                   class="bg-[#E0E7FF33] border-2 border-[#E0E7FF] rounded-md outline-none py-3 px-4 text-[15px]"
        />
      </transition>
      <span>{{ numberWithSpaces(application.yourSums) }} <span
          class="text-sm text-[#2E5BFF] font-medium">UZS</span></span>
    </div>
    <button class="bg-[#2E5BFF] text-white py-3 rounded-md hover:bg-[#364575]">
      Yuborish
    </button>
  </div>
</template>

<script setup lang="ts">
import BaseFormGroup from "@/components/UI/BaseFormGroup.vue"
import BaseInput from "@/components/UI/BaseInput.vue"
import {ref} from "vue";
import OneSelect from "@/components/UI/OneSelect.vue";
import {useSponsors} from "@/composables/sponsors";

const application = ref({
  fullName: "",
  phoneNumber: "+9989",
  sums: "",
  yourSums: "0"
})
const generousSums: any = ref<object[]>([
  {
    label: "1000000",
    id: 1291820
  },
  {
    label: "5000000",
    id: 88331
  },
  {
    label: "7000000",
    id: 24357
  },
  {
    label: "10000000",
    id: 96884
  },
  {
    label: "30000000",
    id: 2995
  },
  {
    label: "50000000",
    id: 28859
  }
])
const {numberWithSpaces} = useSponsors()
</script>

<style>

</style>