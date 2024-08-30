<script setup lang="ts">
import { ref } from 'vue';
// icons
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons-vue';
import { useAuthStore } from '@/stores/auth';
import { Form } from 'vee-validate';
import Logo from '@/layouts/dashboard/logo/LogoDark.vue';

const checkbox = ref(false);
const valid = ref(false);
const show1 = ref(false);
const Password = ref('');
const Email = ref('');
const errors = ref('contraseña incorrecta');
const passwordRules = ref([
  (v: string) => !!v || 'La contraseña es requerida',
  (v: string) => (v && v.length <= 10) || 'La contraseña debe tener menos de 10 caracteres.'
]);

const emailRules = ref([
  (v: string) => !!v || 'El email es requerido', 
  (v: string) => /.+@.+\..+/.test(v) || 'El email debe ser válido'
]);

/* eslint-disable @typescript-eslint/no-explicit-any */
function validate(values: any, { setErrors }: any) {
  const authStore = useAuthStore();
  return authStore.login(Email.value, Password.value).catch((error) => setErrors({ apiError: 'Usuario o contraseña incorrecta' }));
}
</script>

<template>
  <div class="d-flex justify-space-between align-center">
    <div class="logoDakaLogin">
        <Logo />
      </div>
    <!-- <router-link to="/auth/register" class="text-primary text-decoration-none">Don't Have an account?</router-link> -->
  </div>
  <Form @submit="validate" class="mt-7 loginForm" v-slot="{ errors, isSubmitting }">
    <div class="mb-6">
      <v-label>Correo Electronico</v-label>
      <v-text-field
        aria-label="email address"
        v-model="Email"
        :rules="emailRules"
        class="mt-2"
        required
        hide-details="auto"
        variant="outlined"
        color="primary"
      ></v-text-field>
    </div>
    <div>
      <v-label>Contraseña</v-label>
      <v-text-field
        aria-label="password"
        v-model="Password"
        :rules="passwordRules"
        required
        variant="outlined"
        color="primary"
        hide-details="auto"
        :type="show1 ? 'text' : 'password'"
        class="pwdInput mt-2"
      >
        <template v-slot:append>
          <v-btn color="secondary" icon rounded variant="text">
            <EyeInvisibleOutlined :style="{ color: 'rgb(var(--v-theme-secondary))' }" v-if="show1 == false" @click="show1 = !show1" />
            <EyeOutlined :style="{ color: 'rgb(var(--v-theme-secondary))' }" v-if="show1 == true" @click="show1 = !show1" />
          </v-btn>
        </template>
      </v-text-field>
    </div>

    <div class="d-flex align-center mt-4 mb-7 mb-sm-0">
      <v-checkbox
        v-model="checkbox"
        :rules="[(v: any) => !!v || 'You must agree to continue!']"
        label="Recordar"
        required
        color="primary"
        class="ms-n2"
        hide-details
      ></v-checkbox>
      <!-- <div class="ml-auto">
        <router-link to="/auth/login" class="text-darkText link-hover">Forgot Password?</router-link>
      </div> -->
    </div>
    <v-btn color="primary" :loading="isSubmitting" block class="mt-5" variant="flat" size="large" :disabled="valid" type="submit">
      Inicia Sesion</v-btn
    >
    <div v-if="errors.apiError" class="mt-2">
      <v-alert color="error">{{ errors.apiError }}</v-alert>
    </div>
  </Form>
</template>

<style lang="scss">

.loginForm {
  .v-text-field .v-field--active input {
    font-weight: 500;
  }
}

.logoDakaLogin{
  margin: 0 auto;
  // margin-left: 0 auto;
  
}
 
</style>
