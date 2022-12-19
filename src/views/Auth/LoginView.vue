<template>
  <section class="login flex items-center flex-col bg-[#F5F5F7]">
    <div class="mx-auto">
      <h2 class="login__header justify-center flex gap-3 mb-[48px] items-center xs:text-2xl">
        <img src="@/assets/images/logo/logo.svg" alt="Logo">
        METASENAT
      </h2>

      <form @submit.prevent="onSubmit"
            class="login-form bg-white rounded-xl p-8 flex flex-col gap-[44px]">
        <h2 class="text-left text-3xl font-bold">Kirish</h2>
        <div class="flex flex-col gap-[22px]">
          <div class="flex flex-col">
            <div v-show="loginAlert" class="text-rose-600 text-center">
              Login yoki parol nato'g'ri
            </div>
            <BaseFormGroup id="login" variant="1" label-title="LOGIN" label-classes="mb-2" :wrong-data="loginErrors">
              <BaseInput v-model="authSubmit.username"
                         classes="border border-[#E0E7FF] bg-[#E0E7FF33] focus-within:border-[#2E5BFF] focus-within:bg-[#E0E7FF] focus-within:border-[#E0E7FF]black outline-none rounded-[6px] py-[12px] px-[14px] text-sm"
                         id="login"
                         hint="adm8904"
                         :is-wrong="inputErrors.username.$error || loginAlert"
                         :required="true"
                         maxlength="20"
              />
            </BaseFormGroup>
          </div>
          <div class="flex flex-col">
            <label for="password" class="font-medium text-[12px] mb-[8px]">PAROL</label>
            <BaseInput v-model="authSubmit.password" inp-type="password"
                       classes="border border-[#E0E7FF] bg-[#E0E7FF33] focus-within:bg-[#E0E7FF] focus-within:border-[#2E5BFF] outline-none rounded-[6px] py-[12px] px-[14px] text-sm"
                       hint="parol kiriting"
                       id="password"
                       :required="true"
                       :is-wrong="loginAlert"
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
import {computed, inject, reactive, ref, watch} from "vue";
import {VueRecaptcha} from "vue-recaptcha";
import {useUserStore} from "@/store/userStore";
import router from "@/router";
import BaseInput from "@/components/UI/BaseInput.vue"
import BaseFormGroup from "@/components/UI/BaseFormGroup.vue"
import {useVuelidate} from "@vuelidate/core";
import {required, minLength, maxLength} from "@vuelidate/validators";

const authSubmit = reactive({
  username: "",
  password: ""
})

const loginAlert = ref(false)
const axios: any = inject("axios")
const userStore = useUserStore()
const loading = ref(false)
const recaptchaTest = ref(false)


const rules = {
  username: {
    required,
    minlength: minLength(2),
    maxlength: maxLength(20),
    containsSymbols
  },
}
const v$ = useVuelidate(rules, authSubmit)
const inputErrors = computed(() => ({
  username: {
    minlength: v$.value.username.$error && v$.value.username.minlength.$invalid,
    maxlength: v$.value.username.$error && v$.value.username.maxlength.$invalid,
    symbols: v$.value.username.$error && v$.value.username.containsSymbols.$invalid,
    $error: v$.value.username.$error
  },
}))

const loginErrors = computed(() => ([
  {
    condition: inputErrors.value.username.symbols,
    message: "Bu maydonga harfdan tashqari bo'lgan belgilarni kiritsh mumkinmas",
    classes: "max-w-[300px]"
  },
  {
    condition: inputErrors.value.username.minlength,
    message: "Login 2ta harfdan kam bo'la olmaydi",
  },
  {
    condition: inputErrors.value.username.maxlength,
    message: "Login 20ta harfdan oshilmaydi"
  }
]))

function containsSymbols(value: string) {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
  return !specialChars.test(value);
}


async function onSubmit() {
  const result = await v$.value.$validate()

  if (result) {
    loading.value = true
    try {
      const response = await axios.post("/auth/login/", authSubmit)
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
    console.log('post')
  } else {
    console.log('reject weakness')
    loginAlert.value = true
  }
}


const updateLoginField = (event: HTMLInputElement) => {
  // @ts-ignore
  authSubmit.username = event.target.value
}

function testRobot(response: any) {
  recaptchaTest.value = true;
}

watch(authSubmit, () => {
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