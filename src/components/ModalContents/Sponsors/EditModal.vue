<template>
  <section class="modal-wrapper-big">
    <form @submit.prevent class="">
      <ModalHeaders title="Tahrirlash" @close-modal="$emit('closeModal')"></ModalHeaders>
      <div class="separate__line my-7"></div>
      <div class="modal-wrapper-inputs">
        <InputTablets :options="options" v-model="application.sponsorType"
                      :default-value="application.sponsorType"/>
        <BaseFormGroup variant="1" label-title="F.I.Sh. (Familiya Ism Sharifingiz)">
          <BaseInput v-model="application.full_name" :is-wrong="v$.full_name.$error" class="modal-form__input"
                     :default-value="application.full_name" maxlength="30"/>
        </BaseFormGroup>


        <BaseFormGroup variant="2" label-title="Telefon raqam" label-classes="form-group__def"
                       :is-wrong="v$.phone.$error" v-maska:[masks.tel]>
          <template #defVal>
            <span>+998</span>
          </template>
          <BaseInput v-model="application.phone" class="def__input" :default-value="application.phone"/>
        </BaseFormGroup>

        <BaseFormGroup variant="1" label-title="Homiylik summasi">
          <BaseInput v-model="application.sums" class="modal-form__input" hint="Homiylik summasi"
                     :default-value="application.sums" v-maska:[masks.sums]/>
        </BaseFormGroup>
        <Transition>
          <div class="w-full" v-if="application.sponsorType === SPONSOR.LEGALENTITY">
            <BaseFormGroup variant="1" label-title="Tashkilot nomi">
              <BaseInput v-model="application.sponsorFirm" class="modal-form__input" hint="Kompaniya nomi"
                         :default-value="application.sponsorFirm" :is-wrong="v$.sponsorFirm.$error"/>
            </BaseFormGroup>
          </div>
        </Transition>

      </div>
      <div class="separate__line"></div>
      <div class="w-full flex justify-end">
        <BaseButton text="Saqlash" class="primary__button" @save-changes="saveChanges" action-name="saveChanges">
          <span class="icon-save icons"></span>
        </BaseButton>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import ModalHeaders from "@/components/ModalContents/ModalHeaders.vue"
import InputTablets from "@/components/UI/InputTablets.vue"
import {reactive, Ref, ref} from "vue";
import {SPONSOR} from "@/typing/enums/sponsor";
import {editSponsorTypes, generousSumsType, optionType} from "@/typing/types/sponsors";
import {generousOptions, sponsorLegalTypes} from "@/constants/sponsors";
import BaseFormGroup from "@/components/UI/BaseFormGroup.vue"
import BaseInput from "@/components/UI/BaseInput.vue"
import BaseButton from "@/components/UI/BaseButton.vue"
import {numberWithSpaces, transformSums} from "@/helpers/sum";
import {useSponsors} from "@/composables/sponsors";
import {minLength, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {publicApi} from "@/plugins/axios";
import {telAndSumMask} from "@/plugins/vmaska";
// @ts-ignore
import {vMaska} from "maska";

interface Emits {
  (e: 'closeModal'): void

  (e: 'updateSponsor', value: any): void
}

const props = defineProps<{ sponsorId: any }>()
const emits = defineEmits<Emits>()
const {fetchSponsorById} = useSponsors()

fetchSponsor()
const options: Ref<optionType[]> = ref(sponsorLegalTypes)
// @ts-ignore
const sumsOptions: Ref<generousSumsType[]> = ref(generousOptions.map((item: generousSumsType) => ({
  label: numberWithSpaces(item.label) + ' UZS',
  id: item.id
})))

const application: editSponsorTypes = reactive({
  full_name: "",
  phone: "",
  sums: "",
  sponsorFirm: "",
  sponsorType: ""
})

const masks = ref(telAndSumMask)
const rules = {
  full_name: {
    required,
    minlength: minLength(2),
  },
  phone: {
    required,
    minlength: minLength(12)
  },
  sponsorFirm: {
    notEmpty
  }
}

const v$ = useVuelidate(rules, application)

async function fetchSponsor() {
  const response: any = await fetchSponsorById(props.sponsorId)
  if (response.status === 200) {
    console.log(response)
    const {full_name, phone, sum, is_legal, firm} = response.data;
    application.full_name = full_name
    application.phone = phone.slice(4)
    application.sums = numberWithSpaces(sum) || '0'
    application.sponsorType = is_legal ? SPONSOR.LEGALENTITY : SPONSOR.INDIVIDUAL
    application.sponsorFirm = is_legal ? firm : ""
  }
}

async function saveChanges() {
  const result = await v$.value.$validate()
  const {sponsorFirm, sponsorType, full_name, phone, sums} = application;
  const data = {
    full_name: full_name,
    phone: '+998' + phone,
    sum: transformSums(sums),
    is_legal: sponsorType === SPONSOR.LEGALENTITY,
    firm: sponsorType === SPONSOR.LEGALENTITY ? sponsorFirm : "",
    comment: ""
  }
  if (result) {
    try {
      const response = await publicApi.put(`/sponsor-update/${props.sponsorId}/`, data)
      if (response.status === 200) {
        emits('closeModal')
        emits('updateSponsor', props.sponsorId)
      }
    } catch (error) {
      console.log(error)
    }
  }
  console.log(result)
}

function notEmpty(value: any) {
  if (application.sponsorType === SPONSOR.LEGALENTITY) {
    return value.length > 2
  } else {
    return true
  }
}

</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>