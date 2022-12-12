<template>
  <div class="w-full grow">
    <h4 class="font-bold text-[40px] max-w-[423px] mb-10 ">
      Homiy sifatida ariza topshirish
    </h4>
    <form class="flex flex-col gap-[28px] grow" @submit.prevent="onSubmit">
      <div class="">
        <InputTablets :options="options" v-model="application.sponsorType" :default-value="options[1].value"/>
      </div>
      <div>
        <BaseFormGroup label-title="F.I.Sh. (Familiya Ism Sharifingiz)" label-classes="block text-xs mb-2 uppercase"
                       id="fullName">
          <BaseInput v-model="application.fullName" id="fullName" hint="Abdullayev Abdulla Abdulla o’g’li"
                     classes="bg-[#E0E7FF33] border border-[#E0E7FF] focus-within:bg-[#E0E7FF] rounded-md outline-none py-3 px-4 text-[15px]"
                     :required="true"
          />
        </BaseFormGroup>
      </div>
      <div>
        <BaseFormGroup id="phoneNumber" label-title="Telefon raqamingiz" label-classes="block text-xs mb-2 uppercase">
          <BaseInput v-model="application.phoneNumber" id="phoneNumber"
                     class="bg-[#E0E7FF33] border border-[#E0E7FF] focus-within:bg-[#E0E7FF] rounded-md outline-none py-3 px-4 text-[15px]"
                     hint="+998 00 000-00-00"
                     v-maska:[inputTelMaskOpt]
                     default-value="+998"
                     :required="true"
                     :min-len="10"
          />
        </BaseFormGroup>
      </div>
      <div class="">
        <BaseFormGroup id="none" label-title="To‘lov summasi" label-classes="block text-xs mb-3 uppercase">
          <OneSelect v-model="application.sums" :variant="2" :hide-all="false"
                     :options="generousSums" :additional="true"
                     label-classes="select-none py-5 px-9 cursor-pointer hover:bg-[#E0E7FF] transition-all ease-linear overflow-hidden"></OneSelect>
        </BaseFormGroup>
      </div>
      <Transition>
        <div v-show="application.sums === 'boshqa'" class="ease-linear transition-all">
          <BaseInput v-model="application.yourSums"
                     hint="0"
                     class="bg-[#E0E7FF33] border border-[#E0E7FF] rounded-md appearance-none outline-none py-3 px-4 text-[15px] mb-4 focus-within:bg-[#E0E7FF]"
                     max-len="12"
                     :only-num="true"
          />
          <span>{{
              numberWithSpaces(application.yourSums) || 0
            }} <span
                class="text-sm text-[#2E5BFF] font-medium">UZS</span></span>
        </div>
      </Transition>
      <Transition>
        <div class="" v-show="application.sponsorType === options[1].value">
          <BaseFormGroup id="firmName" label-title="Tashkilot nomi" label-classes="block mb-2 uppercase text-xs">
            <BaseInput v-model="application.sponsorFirm" id="firmName"
                       classes="bg-[#E0E7FF33] border border-[#E0E7FF] rounded-md appearance-none outline-none py-3 px-4 text-[15px] mb-4 focus-within:bg-[#E0E7FF]"
                       hint="Orient group"
                       :required="true"
            >
            </BaseInput>
          </BaseFormGroup>
        </div>
      </Transition>
      <button type="submit" class="bg-[#2E5BFF] text-white py-3 rounded-md hover:bg-[#364575]">
        Yuborish
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import {Ref, ref} from "vue";
import {useSponsors} from "@/composables/sponsors";
import BaseFormGroup from "@/components/UI/BaseFormGroup.vue"
import BaseInput from "@/components/UI/BaseInput.vue"
import OneSelect from "@/components/UI/OneSelect.vue";
import InputTablets from "@/components/UI/InputTablets.vue"
import {reactive} from "vue"
import {vMaska} from "maska"

const inputTelMaskOpt: any = reactive({
  mask: "+99 8 ## ###-##-##",
})

const inputSumMaskOpt: any = ref({
  mask: "## ### ###"
})


type optionType = {
  title: string
  value: string
  id: string
}

type applicationType = {
  fullName: string;
  phoneNumber: string
  sums: string
  yourSums: string
  sponsorType: string
  sponsorFirm: string
}

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
  }
])
const selectedOpt = ref("Jismoniy shaxs")
// this id fields should be unique
// and these fields should be many to many
const options: Ref<optionType[]> = ref([
  {
    id: "rsad",
    title: "Jismoniy shaxs",
    value: "Jismoniy shaxs"
  },
  {
    id: "dwa",
    title: "Yuridik shaxs",
    value: "Yuridik shaxs"
  }
])

const application: Ref<applicationType> = ref({
  fullName: "",
  phoneNumber: "+9989",
  sums: "",
  yourSums: "0",
  sponsorFirm: "",
  sponsorType: ""
})
const {numberWithSpaces} = useSponsors()

function onSubmit() {
  console.log(application)
}
</script>

<style scoped>

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>

<!--declare module '@vue/runtime-core' {-->
<!--interface ComponentCustomProperties {-->
<!--$apexcharts: typeof ApexCharts;-->
<!--}-->
<!--}-->