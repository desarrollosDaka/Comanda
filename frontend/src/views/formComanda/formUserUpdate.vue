<script setup lang="ts">
// icons
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons-vue';
import { Form } from 'vee-validate';
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2'
import axios from 'axios'
import { router} from '@/router';
import {  useRoute } from 'vue-router'
const route = useRoute()

// variables
const valid = ref(false);
const show1 = ref(false);
const Email = ref();
const Nombre = ref();
const Password = ref();
const ID_rol = ref();
const Id_sucursal = ref();
const Dpto_ventas = ref(false);
const Linea_ventas = ref();
// const User_crea = ref();
const User_mod = ref();
const baseUrl = `${import.meta.env.VITE_URL}/api/users`;
const infoFilter = ref();
const baseUrlRol = `${import.meta.env.VITE_URL}/api/roles`;
const baseUrlStore = `${import.meta.env.VITE_URL}/api/stores`;
const infoSucursal = ref();
const rolInfo = ref();

// Localstorage
const jsonFromLocalStorage = sessionStorage.getItem('user');
if (jsonFromLocalStorage !== null) {
  const parsedData = JSON.parse(jsonFromLocalStorage);
  User_mod.value = parsedData.data.Nombre;
} 

// URL
const id: any = ref('')
id.value = route.params.id

console.log(id.value);


// validaciones
const passwordRules = ref([
  (v: string) => (v && v.length <= 20) || 'La contraseña debe tener menos de 20 caracteres.'
]);

const emailRules = ref([
  (v: string) => !!v || 'El email es requerido', 
  (v: string) => /.+@.+\..+/.test(v) || 'El email debe ser válido'
]);

const RolRules = ref([
  (v: string) => !!v || 'El rol del usuario es requerido', 
]);

const fullnameRules = ref([
  (v: string) => !!v || 'El nombre y apellido del es requerido', 
]);

const sucursalRules = ref([
  (v: string) => !!v || 'La sucursal es requerido', 
]);

async function userUpdate(jsonUser: any ){
    try{
        const response = await axios.put(`${baseUrl}/updateUser/${id.value}`, jsonUser)
    } catch(error){
        console.log(error)
    }
}

async function userFilter(){
    try{
        const url = `${baseUrl}/filterUser/${id.value}`;
        const {data} = await axios.get(url);
        infoFilter.value = data
    } catch(error){
        console.log(error)
    }
}

interface Roles {
    Nombre_rol: string;
    ID_rol: number;
}

const getRol = async () => {
  try{
    const url = `${baseUrlRol}/masterRoles`
    const {data} = await axios.get(url);

    rolInfo.value =  data.map((rol: Roles) => ({
            title: rol.Nombre_rol,
            value: rol.ID_rol
        }));
  } catch(error){
      console.log(error)
  }
}

interface Sucursales {
    Sucursal: string;
    ID_sucursal: string;
}

const getSucursal = async () => {
  try{
    const url = `${baseUrlStore}/masterStores`
    const {data} = await axios.get(url);

    infoSucursal.value =  data[0].map((sucursales: Sucursales) => ({
            title: sucursales.Sucursal,
            value: sucursales.ID_sucursal
        }));
  } catch(error){
      console.log(error)
  }
}

// Function para enviar form
/* eslint-disable @typescript-eslint/no-explicit-any */
function validate(values: any, { setErrors }: any) {

    const jsonUser = {
        Nombre:Nombre.value, 
        Email:Email.value, 
        Password: Password.value,
        Id_sucursal:Id_sucursal.value,
        ID_rol:ID_rol.value ,
        Dpto_ventas:Dpto_ventas.value.toString() ,
        User_mod:User_mod.value,
        Linea_ventas: Dpto_ventas.value === false ? null : Linea_ventas.value ,
    }

    // return userCreated(jsonUser).catch((error) => setErrors({ apiError: 'No se pudo crear el usuario' }));
    Swal.fire({
        title: "Alerta!",
        text: "¿Desea editar estos datos?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, editar!",
    }).then((result) => {
        if (result.isConfirmed) {
            userUpdate(jsonUser)
            Swal.fire({
            title: "Guardado!",
            text: "Datos editados con exito!",
            icon: "success"
            }).then((result) => {
            if (result.isConfirmed) {
                    router.push('/masterUser');
                }
            });
    
        }
    });
}

    
onMounted( async () => {
         
    await userFilter();  
    await getRol(); 
    await getSucursal(); 

    Nombre.value = infoFilter.value.Nombre
    Email.value = infoFilter.value.Email
    Id_sucursal.value = infoFilter.value.Id_sucursal
    ID_rol.value = +infoFilter.value.ID_rol
    Dpto_ventas.value = infoFilter.value.Dpto_ventas
    Linea_ventas.value = infoFilter.value.Linea_ventas
    User_mod.value = User_mod.value 
})
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
                v-model="Email"
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
                    :items="rolInfo"
                    variant="outlined"
                    v-model="ID_rol"
                    :rules="RolRules"
                    required
                    color="primary"
                    class="mt-2"
                ></v-autocomplete>
            </v-col>


            <v-col cols="12" md="6">
                <v-label for="sucursal">Sucursal</v-label>
                <v-autocomplete
                    id="sucursal"
                    clearable
                    chips
                    placeholder="Sucursal"
                    :items="infoSucursal"
                    variant="outlined"
                    v-model="Id_sucursal"
                    :rules="sucursalRules"
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
                id="name"
                placeholder="Nombre y Apellido"
                variant="outlined"
                required
                aria-label="Nombre y Apellido"
                v-model="Nombre"
                :rules="fullnameRules"
                class="mt-2"
                color="primary"
            ></v-text-field>
            </v-col>

            <v-col cols="12" md="5">
            <v-label for="userCrea">Modificado Por</v-label>
            <v-text-field
                id="userCrea"
                v-model="User_mod"
                :counter="10"
                variant="outlined"
                hide-details
                class="mt-2"
                disabled
            ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="2">
                <v-label for="roles">Asesor de ventas</v-label>
                <v-switch
                    class="mt-3" 
                    v-model="Dpto_ventas"
                    color="warning"
                ></v-switch>
            </v-col>

            <v-col cols="12" md="10" v-if="Dpto_ventas == true">
                <v-label for="depart">Linea del asesor</v-label>
                <v-autocomplete
                    id="depart"
                    clearable
                    chips
                    placeholder="Linea"
                    :items="['LINEA DIGITAL', 'LINEA HOGAR', 'LINEA INTEGRAL']"
                    variant="outlined"
                    v-model="Linea_ventas"
                    required
                    color="primary"
                    class="mt-2"
                ></v-autocomplete>
            </v-col>
        </v-row>

        <v-btn 
            color="primary" 
            :loading="isSubmitting" 
            append-icon="mdi-arrow-right"
            class="mt-6" 
            variant="flat" 
            size="large" 
            :disabled="!Email  || !ID_rol || !Id_sucursal || !Nombre" 
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
