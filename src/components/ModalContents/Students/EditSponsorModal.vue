<template>
  <section class="px-8 py-7 w-[530px]">
    <div class="">
      <h6 class="text-2xl font-bold">
        Homiylarni tahrirlash
      </h6>
    </div>
    <div class="separate__line my-7 w-full h-[2px] bg-[#F5F5F7]"></div>
    <!--    <BaseFormGroup id="edit-name" label-title="F.I.Sh. (Familiya Ism Sharifingiz)" variant="1">-->
    <!--      <OneSelect options="" :variant="1" v-model=""></OneSelect>-->
    <!--    </BaseFormGroup>-->

  </section>
</template>


<script setup lang="ts">
import BaseFormGroup from "@/components/UI/BaseFormGroup.vue"
import OneSelect from "@/components/UI/OneSelect.vue";
import {publicApi} from "@/plugins/axios";
import {sponsorsListType} from "@/typing/types/sponsor";
import {ref} from "vue";


interface Props {
  sponsorId: number
}

const props = defineProps<Props>()

const sponsors = ref([])
const sponsorsOptions = ref([])


</script>