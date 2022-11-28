<template>
  <section class="pagination">
    <div class="flex gap-[10px]">
      <button class="border border-[#DFE3E8] py-[6px] px-[8px] bg-white rounded-[5px] disabled:bg-[#DFE3E8]"
              @click="sponsorStore.changeActivePage(sponsorStore.activePage-1)"
              :disabled="sponsorStore.activePage === 1"><img
          src="@/assets/icons/website/left.svg" alt="">
      </button>
      <ul class="pagination-list flex gap-2">
        <li class="" v-for="count in props.count" :key="count">
          <button
              :class="['text-xl border border-[#DFE3E8] py-[6px] px-[8px] bg-white rounded-[5px]', sponsorStore.activePage === count ? ' pagination-list__active' : ''] "
              @click="sponsorStore.changeActivePage(count)"
          >
            {{ count }}
          </button>
        </li>
      </ul>
      <button class="border border-[#DFE3E8] py-[6px] px-[8px] bg-white rounded-[5px] disabled:bg-[#DFE3E8]"
              @click="sponsorStore.changeActivePage(sponsorStore.activePage+1)"
              :disabled="sponsorStore.activePage === props.count"
      >
        <img src="@/assets/icons/website/right.svg" alt="">
      </button>

    </div>
  </section>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useSponsorStore} from "@/store/useSponsorStore";

const sponsorStore = useSponsorStore()
const props = defineProps(['count'])


console.log(props.count)
</script>

<style>
.pagination-list__active {
  border-color: #3366FF;
}
</style>