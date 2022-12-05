<template>
  <section class="login flex items-center flex-col bg-[#F5F5F7]">
    <div class="mx-auto">
      <h2 class="login__header justify-center flex gap-3 mb-[48px] items-center ex-sm:text-2xl">
        <img src="@/assets/images/logo/logo.svg" alt="Logo">
        METASENAT
      </h2>

      <form @submit.prevent="onSubmit"
            class="login-form bg-white rounded-[12px] p-[32px] flex flex-col gap-[44px]">
        <h2 class="text-left text-3xl font-bold">Kirish</h2>
        <p v-if="loginAlert">
          <span class="text-red-500">Wrong username or password</span>
        </p>
        <div class="flex flex-col gap-[22px]">
          <div class="flex flex-col">
            <label for="login" class="font-medium text-[12px] mb-[8px]">LOGIN</label>
            <BaseInput v-model="loginField" inp-type="text"
                       classes="border  border-[#E0E7FF] bg-[#E0E7FF33] focus-within:bg-[#E0E7FF] outline-none rounded-[6px] py-[12px] px-[14px] text-sm"
                       hint="login kiriting"
                       id="login"
                       :required="true"
            />
          </div>
          <div class="flex flex-col">
            <label for="password" class="font-medium text-[12px] mb-[8px]">PAROL</label>
            <BaseInput v-model="passwordField" inp-type="password"
                       classes="border  border-[#E0E7FF] bg-[#E0E7FF33] focus-within:bg-[#E0E7FF] outline-none rounded-[6px] py-[12px] px-[14px] text-sm"
                       hint="parol kiriting"
                       id="password"
                       :required="true"
            />
          </div>
          <vue-recaptcha sitekey="6Lf1pDcjAAAAABE3lkawNZtrvNk5pPXfKVFT_pML" aria-required="true"
                         @verify="testRobot">
          </vue-recaptcha>
          <button class="bg-[#2E5BFF] py-[14px] rounded-[6px] text-white disabled:bg-[#cdcdcd]" type="submit"
                  :disabled="loading ">
            <span>
            {{ loading ? "Checking..." : "Kirish" }}
            </span>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import {inject, ref, watch} from "vue";
import {VueRecaptcha} from "vue-recaptcha";
import {useUserStore} from "@/store/userStore";
import router from "@/router";
import BaseInput from "@/components/UI/BaseInput.vue"

const loginField = ref("")
const passwordField = ref("")
const loginAlert = ref(false)
const axios: any = inject("axios")
const userStore = useUserStore()
const loading = ref(false)
const recaptchaTest = ref(false)

async function onSubmit() {
  loading.value = true
  try {
    const response = await axios.post("/auth/login/", {username: loginField.value, password: passwordField.value})
    console.log(response)
    if (response.status === 200) {
      localStorage.setItem("accessToken", response.data.access)
      userStore.isAuthenticated = true;
      await router.push('/main/dashboard')
      loading.value = false
    }
  } catch {
    loginAlert.value = true
    loading.value = false
  }
}


const updateLoginField = (event: HTMLInputElement) => {
  // @ts-ignore
  loginField.value = event.target.value
}

function testRobot(response: any) {
  recaptchaTest.value = true;
}

watch([loginField, passwordField], () => {
  loginAlert.value = false
})


</script>

<style>
.login {
  width: 100%;
  height: 100vh;
  min-height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  box-shadow: 0 0 10px #EBEEFC
}

.login__header::after {
  content: "CLUB";
  background-color: #E94A47;
  border-radius: 6px;
  font-size: 18px;
  color: white;
  padding: 4px 8px;
}
</style>