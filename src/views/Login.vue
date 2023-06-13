<template>
  <v-container>
    <div class="d-flex align-center justify-center h-100 w-100 mt-20">
      <v-card
        flat
        class="pa-5 login-box"
        width="100%"
        min-height="450px"
        max-width="400px"
        :loading="loading"
      >
       <div class="d-flex align-center justify-center">
        <img
          style="object: cover"
          class="pt-3"
          src="../assets/4runner.png"
          alt=""
          srcset=""
        />
      </div>
        <div class="mt-5 text-center">
          <h2>STAFF LOGIN</h2>
          <br/>
          <h5>Login to your account</h5>
        </div>

        <v-form
          v-model="valid"
        
          @submit.prevent="() => login({ email: email, password: password })"
          class="mt-10"
        >
          <v-text-field
            placeholder="Enter email address"
            color="#5b5b5b"
            variant="outlined"
            :rules="[email_rules.required, email_rules.email]"
            density="comfortable"
            v-model="email"
            class="bg-white"
          ></v-text-field>
      
          <v-text-field
            v-model="password"
            :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            variant="outlined"
            placeholder="Enter password"
            color="#5b5b5b"
            density="comfortable"
            @click:append="show1 = !show1"
          ></v-text-field>

          <v-btn
            :loading="loading"
            type="submit"
            flat
            class="text-white mt-8 text-capitalize"
            color="#5b5b5b"
            block
            >Submit</v-btn
          >
        </v-form>
      </v-card>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { apiService } from "../plugins/axios";
import { loginRoute } from "../utils/routes";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";
import {useAppStore} from '../store/app'
import {storeToRefs} from 'pinia'
import axios from 'axios'
// variables
const $toast = useToast();
const router = useRouter();
const password = ref("");
const email = ref("");
const show1 = ref(true);
const loading = ref(false);
const valid = ref(false);
const  { isLoggedIn } = storeToRefs(useAppStore())
// rules
interface Input {
  email: string;
  password: string;
}

const rules = reactive({
  required: (value: any) => !!value || "Password is required.",
  min: (v: any) => v.length >= 8 || "Min 8 characters",
  emailMatch: () => `The email and password you entered don't match`,
});
const email_rules = reactive({
  required: (value: any) => !!value || "Email is required.",
  counter: (value: any) => value.length <= 20 || "Max 20 characters",
  email: (value: any) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || "Invalid e-mail.";
  },
});
// end

// login
const login = async (userDetails: Input) => {
  if (email.value !== "" && password.value !== "") {
    loading.value = true;
    try {
      const data: any = await apiService.post(loginRoute, userDetails);
      
      loading.value = false;
      localStorage.setItem('Token', JSON.stringify(data.success.token))
      isLoggedIn.value = true
      $toast.success(data.success.message, {
        position: "top-right",
      });

      router.push('/')
    } catch (error: any) {
      loading.value = false;
    }
  }
};
</script>

<style scoped>
.w-100 {
  width: 100%;
}
.mt-20 {
  margin-top: 10%;
}

.login-box {
  border-radius: 5px;
  box-shadow: 2px 0px 34px -7px rgba(0, 0, 0, 0.34);
  -webkit-box-shadow: 2px 0px 34px -7px rgba(0, 0, 0, 0.34);
  -moz-box-shadow: 2px 0px 34px -7px rgba(0, 0, 0, 0.34);
}
</style>
