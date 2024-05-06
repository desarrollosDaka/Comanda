<script setup lang="ts">
// icons
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons-vue';
import { Form } from 'vee-validate';
import { ref } from 'vue';
import Swal from 'sweetalert2'
import axios from 'axios'
import { router } from '@/router';

// variables
const valid = ref(false);
const show1 = ref(false);
const email_address = ref('');
const password = ref('');
const user_rol = ref();
const id_department = ref();
const user_name = ref();
const user_crea = ref();
const baseUrl = `http://localhost:3002/api/auth`;

// Localstorage
const jsonFromLocalStorage = sessionStorage.getItem('user');
if (jsonFromLocalStorage !== null) {
  const parsedData = JSON.parse(jsonFromLocalStorage);
  user_crea.value = parsedData.data.username;
} 

// validaciones
const passwordRules = ref([
  (v: string) => !!v || 'La contraseña es requerida',
  (v: string) => (v && v.length <= 10) || 'La contraseña debe tener menos de 10 caracteres.'
]);

const emailRules = ref([
  (v: string) => !!v || 'El email es requerido', 
  (v: string) => /.+@.+\..+/.test(v) || 'El email debe ser válido'
]);

const RolRules = ref([
  (v: string) => !!v || 'El rol del usuario es requerido', 
]);

const departmentsRules = ref([
  (v: string) => !!v || 'El departamento es requerido', 
]);

const fullnameRules = ref([
  (v: string) => !!v || 'El nombre y apellido del es requerido', 
]);

async function userCreated(jsonUser: any){
    try{
        const response = await axios.post(`${baseUrl}/signup`, jsonUser)
    } catch(error){
        console.log(error)
    }
}


// Function para enviar form
/* eslint-disable @typescript-eslint/no-explicit-any */
function validate(values: any, { setErrors }: any) {

    const jsonUser = {
        user_name:user_name.value, 
        email_address:email_address.value, 
        password:password.value,
        id_department:id_department.value,
        user_rol:user_rol.value ,
        user_crea:user_crea.value
    }

    // return userCreated(jsonUser).catch((error) => setErrors({ apiError: 'No se pudo crear el usuario' }));
    Swal.fire({
        title: "Alerta!",
        text: "¿Desea guardar estos datos?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, Guardar!",
    }).then((result) => {
        if (result.isConfirmed) {
            const respuesta = userCreated(jsonUser);
            Swal.fire({
            title: "Guardado!",
            text: "Datos guardados con exito!",
            icon: "success"
            }).then((result) => {
            if (result.isConfirmed) {
                    router.push('/masterUser');
                }
            });
    
        }
    });
}

const items = ref([
    {
        title: 'Ventas',
        value: 1
    },
    
    {
        title: 'Tecnologia',
        value: 2
    },
    {
        title: 'Control y Gestion',
        value: 3
    },
    {
        title: 'Operaciones',
        value: 4
    },
    {
        title: 'RRHH',
        value: 5
    },

])

</script>

<template>
    <Form @submit="validate" class="mt-3" v-slot="{ errors, isSubmitting }">
        <v-row>
            <v-col cols="12" md="6">
                <v-label for="email">Correo Electronico</v-label>
                <v-text-field
                id="email"
                type="email"
                placeholder="Correo Electronico"
                variant="outlined"
                required
                aria-label="email address"
                v-model="email_address"
                :rules="emailRules"
                class="mt-2"
                hide-details="auto"
                color="primary"
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
                <v-label for="password">Contraseña</v-label>
                <v-text-field
                    id="password"
                    aria-label="password"
                    v-model="password"
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
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="6">
                <v-label for="roles">Tipo de Rol</v-label>
                <v-autocomplete
                    clearable
                    chips
                    id="roles"
                    placeholder="Roles"
                    :items="['Admin', 'Usuario', 'SuperAdmin', 'RRHH']"
                    variant="outlined"
                    v-model="user_rol"
                    :rules="RolRules"
                    required
                    color="primary"
                    class="mt-2"
                ></v-autocomplete>
            </v-col>

            <v-col cols="12" md="6">
                <v-label for="depart">Departamento</v-label>
                <v-autocomplete
                    id="depart"
                    clearable
                    chips
                    placeholder="Departamentos"
                    :items="items"
                    variant="outlined"
                    v-model="id_department"
                    :rules="departmentsRules"
                    required
                    color="primary"
                    class="mt-2"
                ></v-autocomplete>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="7">
            <v-label for="name">Nombre y Apellido</v-label>
            <v-text-field
                hint="Debes colocar el Nombre y Apellido del usuario."
                persistent-hint
                id="name"
                placeholder="Nombre y Apellido"
                variant="outlined"
                required
                aria-label="Nombre y Apellido"
                v-model="user_name"
                :rules="fullnameRules"
                class="mt-2"
                color="primary"
            ></v-text-field>
            </v-col>

            <v-col cols="12" md="5">
            <v-label for="userCrea">Creado Por</v-label>
            <v-text-field
                id="userCrea"
                v-model="user_crea"
                :counter="10"
                variant="outlined"
                hide-details
                class="mt-2"
                disabled
            ></v-text-field>
            </v-col>
        </v-row>

        <v-btn 
            color="primary" 
            :loading="isSubmitting" 
            append-icon="mdi-arrow-right"
            class="mt-6" 
            variant="flat" 
            size="large" 
            :disabled="valid" 
            type="submit"
        >
        Guardar 
        </v-btn>
    </Form>
</template>

<style lang="scss">

.loginForm {
  .v-text-field .v-field--active input {
    font-weight: 500;
  }
}

.logoDakaLogin{
  margin-left: 95px;
  
}
 
</style>
