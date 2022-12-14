<template>
  <div class="w-full bg-transparent">
    <h4 class="font-bold text-[40px] max-w-[423px] mb-10 ">
      Homiy sifatida ariza topshirish
    </h4>
    <form class="flex flex-col gap-[28px] grow" @submit.prevent="$emit('dataSubmit')">
      <div class="">
        <InputTablets :options="options" v-model="application.sponsorType"
                      :default-value="SPONSOR.LEGALENTITY"/>
        {{ application.sponsorType }}
      </div>
      <div>
        <BaseFormGroup variant="1" label-title="F.I.Sh. (Familiya Ism Sharifingiz)"
                       label-classes="block text-xs mb-2 uppercase"
                       id="fullName">
          <BaseInput v-model="application.fullName" id="fullName" hint="Abdullayev Abdulla Abdulla o’g’li"
                     classes="bg-[#E0E7FF33] border border-[#E0E7FF] focus-within:bg-[#E0E7FF] rounded-md outline-none py-3 px-4 text-[15px]"
                     :required="true"
          />
        </BaseFormGroup>
      </div>
      <div>
        <BaseFormGroup variant="1" id="phoneNumber" label-title="Telefon raqamingiz"
                       label-classes="block text-xs mb-2 uppercase">
          <BaseFormGroup id="phoneNumber" variant="2"
                         label-classes="flex items-center bg-[#E0E7FF33] border border-[#E0E7FF] py-3 px-4 focus-within:bg-[#E0E7FF] rounded-md outline-none text-[15px]">
            <template #defVal>
              <span class="mr-1">+998</span>
            </template>
            <BaseInput v-model="application.phoneNumber" id="phoneNumber" inp-type="text"
                       class="bg-transparent outline-0 text-[15px]"
                       hint="00 000-00-00"
                       v-maska:[masks.tel]
                       :required="true"
                       minlength="14"
            />
          </BaseFormGroup>
        </BaseFormGroup>
      </div>
      <div class="">
        <BaseFormGroup variant="1" id="none" label-title="To‘lov summasi" label-classes="block text-xs mb-3 uppercase">
          <OneSelect v-model="application.sums" :variant="2" :hide-all="false"
                     :options="generousSums" :additional="true"
                     default-value="1000000"
                     label-classes="select-none py-5 px-9 cursor-pointer hover:bg-[#E0E7FF] transition-all ease-linear overflow-hidden"></OneSelect>
        </BaseFormGroup>
      </div>
      <Transition mode="out-in">
        <div v-show="application.sums === 'boshqa'" class="">
          <BaseInput v-model="application.yourSums"
                     hint="0"
                     class="bg-[#E0E7FF33] border border-[#E0E7FF] rounded-md appearance-none outline-none py-3 px-4 text-[15px] mb-4 focus-within:bg-[#E0E7FF]"
                     max-len="9"
                     :only-num="true"
          />
          <span>{{
              numberWithSpaces(application.yourSums) || 0
            }} <span
                class="text-sm text-[#2E5BFF] font-medium">UZS</span></span>
        </div>
      </Transition>
      <Transition mode="out-in">
        <div class="" v-if="application.sponsorType === SPONSOR.LEGALENTITY">
          <BaseFormGroup variant="1" id="firmName" label-title="Tashkilot nomi"
                         label-classes="block mb-2 uppercase text-xs">
            <BaseInput v-model="application.sponsorFirm" id="firmName"
                       classes="bg-[#E0E7FF33] border border-[#E0E7FF] rounded-md appearance-none outline-none py-3 px-4 text-[15px] mb-4 focus-within:bg-[#E0E7FF]"
                       hint="Orient group"
                       required
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

import {reactive, ref, Ref,} from "vue";
import {useSponsors} from "@/composables/sponsors";
import {SPONSOR} from "@/typing/enums/sponsor";
import {generousSumsType, optionType} from "@/typing/types/sponsor";
import BaseFormGroup from "@/components/UI/BaseFormGroup.vue"
import BaseInput from "@/components/UI/BaseInput.vue"
import OneSelect from "@/components/UI/OneSelect.vue";
import InputTablets from "@/components/UI/InputTablets.vue"
import {useSponsorStore} from "@/store/useSponsorStore";
import {vMaska} from "maska"

const masks = reactive({
  tel: {
    mask: "## ###-##-##",
  }
})


const generousSums: Ref<generousSumsType[]> = ref([
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
// this id fields should be unique
// and these fields should be many to many
const options: Ref<optionType[]> = ref([
  {
    id: "rsad",
    title: "Jismoniy shaxs",
    value: SPONSOR.INDIVIDUAL
  },
  {
    id: "dwa",
    title: "Yuridik shaxs",
    value: SPONSOR.LEGALENTITY
  }
])

const {application} = useSponsorStore()
const {numberWithSpaces} = useSponsors()

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
