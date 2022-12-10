<template>
  <!--  <router-link v-for="tablet in tablets" :to="tablet.link"-->
  <!--               class="main-list__links main-list__third uppercase-->
  <!--               min-h-[40px] flex items-center min-w-[192px]-->
  <!--               justify-center tracking-[1.13px]-->
  <!--               transition-all text-[#3366FF99]-->
  <!--               hover:bg-[#E0E7FF]">-->
  <!--    {{ tablet.title }}-->
  <!--  </router-link>-->
  <ul class="tablet-list flex border-2 border-[#B2B7C1] w-fit rounded-md overflow-hidden" v-if="variant===2">
    <li class="tablet-list__item" v-for="(tablet, idx) in tablets">
      <label :for="tablet.value" class="py-2 px-8 ">
        <input type="radio" :id="tablet.value" :value="tablet.value"
               name="tablet"
               class="appearance-none">
        {{ tablet.title }}
      </label>
    </li>
  </ul>
</template>

<script setup lang="ts">
import {ref} from "vue"

type TabletObj = {
  title: string,
  value?: string
}

interface TabletProps {
  tablets?: TabletObj[]
  variant: number
}

defineProps<TabletProps>()
</script>