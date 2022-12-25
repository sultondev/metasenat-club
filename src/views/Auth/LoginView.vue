<template>
  <section class="login">
    <div class="mx-auto">
      <h2 class="login__header">
        <img src="@/assets/images/logo/logo.svg" alt="Logo">
        METASENAT
      </h2>

      <form @submit.prevent="onSubmit" class="login-form">
        <h2 class="login__title">Kirish</h2>
        <div class="flex flex-col gap-5">
          <div class="flex flex-col">
            <div v-show="loginAlert" class="login__wrong">
              Login yoki parol nato'g'ri
            </div>
            <BaseFormGroup id="login" variant="1" label-title="LOGIN" label-classes="mb-2" :wrong-data="loginErrors">
              <BaseInput v-model="authSubmit.username" classes="modal-form__input" id="login" hint="adm8904"
                         :is-wrong="inputErrors.username.$error || loginAlert" maxlength="20"
              />
            </BaseFormGroup>
          </div>
          <div class="flex flex-col">
            <BaseFormGroup variant="1" label-title="PAROL" id="password">
              <BaseInput v-model="authSubmit.password" inp-type="password" classes="modal-form__input" maxlength="30"
                         hint="parol kiriting" id="password" :is-wrong="inputErrors.password.minlength || loginAlert"
              />
            </BaseFormGroup>
          </div>
          <!-- Recaptcha -->
          <vue-recaptcha sitekey="6Lf1pDcjAAAAABE3lkawNZtrvNk5pPXfKVFT_pML" aria-required="true" @verify="testRobot">
          </vue-recaptcha>

          <button class="login__button" type="submit" :disabled="loading">
            {{ loading ? "Checking..." : "Kirish" }}
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
    containsSymbols,
    isEmpty
  },
  password: {
    required,
    minlength: minLength(4)
  }
}
const v$ = useVuelidate(rules, authSubmit)
const inputErrors = computed(() => ({
  username: {
    minlength: v$.value.username.$error && v$.value.username.minlength.$invalid,
    maxlength: v$.value.username.$error && v$.value.username.maxlength.$invalid,
    symbols: v$.value.username.$error && v$.value.username.containsSymbols.$invalid,
    $error: v$.value.username.$error
  },
  password: {
    minlength: v$.value.password.$error && v$.value.password.$invalid
  }
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


function isEmpty(value: any) {
  return Boolean(value)
}

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
  min-height: 700px;
  @apply flex items-center justify-center flex-col bg-[#F5F5F7] min-h-screen;
}

.login-form {
  @apply bg-white rounded-xl p-8 flex flex-col gap-11;
  box-shadow: 0 0 10px #EBEEFC
}

.login__header {
  @apply justify-center flex gap-3 mb-[48px] items-center xs:text-2xl
}

.login__header::after {
  content: "CLUB";
  background-color: #E94A47;
  border-radius: 6px;
  font-size: 18px;
  color: white;
  padding: 4px 8px;
}

.login__title {
  @apply text-left text-3xl font-bold
}

.login__wrong {
  @apply text-rose-600 text-center;
}

.login__button {
  @apply primary__button py-4 rounded-md flex justify-center text-base;
}

</style>