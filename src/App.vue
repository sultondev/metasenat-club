<template>
  <TheNavbar></TheNavbar>
  <router-view></router-view>
</template>

<script setup lang="ts">
import {useUserStore} from "@/store/userStore";
import TheNavbar from "@/components/TheNavbar.vue"
import 'vue3-lottie/dist/style.css'

const userStore = useUserStore()
userStore.Init()
</script>

<style>
@import url("@/assets/fonts/style.css");

body {
  background: #F5F5F7;
}

#app {
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

* {
  padding: 0;
  margin: 0;
}

/* width */
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background: #3366FF;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

* {
  font-family: "Rubik", sans-serif;
}


.primary__button {
  @apply flex items-center hover:text-primary text-sm border border-primary transition-all ease-linear hover:text-primary hover:bg-transparent text-white bg-primary rounded py-2 px-8 text-sm gap-2
}

.secondary__button {
  @apply flex items-center py-[9px] px-8 bg-[#EDF1FD] rounded-[5px] text-[#3365FC] transition-all ease-linear;
}

.secondary__button:hover {
  @apply bg-blue-200
}

.icons {
  @apply text-xl mr-2.5
}

.modal-wrapper-big {
  @apply py-7 px-8 min-w-[586px]
}

.modal-form__input {
  @apply bg-[#E0E7FF33] border border-[#E0E7FF] focus-within:bg-[#E0E7FF] rounded-md outline-none py-3 px-4 text-[15px] focus-within:border-primary
}


.modal-wrapper-inputs {
  @apply flex flex-col gap-y-7
}

.form-group__def {
  @apply flex items-center gap-1 modal-form__input
}

.def__input {
  @apply outline-0 border-0 bg-transparent
}

</style>
