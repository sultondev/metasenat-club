<template>
  <section class="login flex items-center flex-col bg-[#F5F5F7]">
    <div class="mx-auto">
      <h2 class="login__header justify-center flex gap-3 mb-[48px] items-center ex-sm:text-2xl">
        <img src="@/assets/images/logo/logo.svg" alt="">
        METASENAT
      </h2>
      <form action="" class="login-form bg-white rounded-[12px] p-[32px] flex flex-col gap-[44px]">
        <h2 class="text-left text-3xl font-bold">Kirish</h2>
        <div class="flex flex-col gap-[22px]">
          <div class="flex flex-col">
            <label for="login" class="font-medium">LOGIN</label>
            <input type="text" class="border bg-[#E0E7FF20A] bg-[#E0E7FF] rounded-[6px] py-[12px] px-[14px] text-sm"
                   name="login" id="login"
                   placeholder="login kiriting"
                   v-model="loginField" required
            />
          </div>
          <div class="flex flex-col">
            <label for="password" class="font-medium">PAROL</label>
            <input type="password" class="border bg-[#E0E7FF20A] bg-[#E0E7FF] rounded-[6px] py-[12px] px-[14px] text-sm"
                   name="password" id="password"
                   placeholder="parol kiriting"
                   v-model="passwordField" required
            />
          </div>
          <vue-recaptcha sitekey="6Lf1pDcjAAAAABE3lkawNZtrvNk5pPXfKVFT_pML" aria-required="true"></vue-recaptcha>
          <button class="bg-[#2E5BFF] py-[14px] rounded-[6px] text-white " type="submit">Kirish</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import {inject, ref} from "vue";
import {VueRecaptcha} from "vue-recaptcha";


const loginField = ref("")
const passwordField = ref("")

async function fetchData(url: string) {
  const axios: any = inject('axios')
  const response = await axios.get(url)
  if (response) {
    console.log(response)
  }
}

fetchData('dashboard')

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