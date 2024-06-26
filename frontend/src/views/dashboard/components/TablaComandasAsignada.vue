<script setup lang="ts">
import Swal from 'sweetalert2'
import axios from 'axios';
import { shallowRef, ref, onMounted } from 'vue';
import { router } from '@/router';
import { useUserRol } from '@/composables/users'

import UiTitleCard from '@/components/shared/UiTitleCard.vue';
const search = ref('')
const info = ref([]);
const loadingInfo = ref(false);
const baseUrl = `${import.meta.env.VITE_URL}/api/orders`;
const baseUrlAsesor = `${import.meta.env.VITE_URL}/api/orders`;
const dialog = ref(false);
const infoAsesores = ref();

const selectedAsesor = ref()
const idDocuments = ref('')
const estatus = ref(false)
const motivo = ref()

let editedItem = ref({
  ID_order: '',
  Cedula: '',
  Sucursal: '',
  User_crea: '',
  Asesor: '',
  Status: '',
})

//////////////////////////////////////////////////DATOS INCIO SESION/////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

let USER_ROL = ref<number>(0) //Variable donde se almacena el ROL DEL USUARIO que vendria del localstorage
let USER = ref<number>(0) //Variable donde se almacena el ID USUARIO que vendria del localstorage
let user_crea = ref<string>('')


// Localstorage
const jsonFromLocalStorage = sessionStorage.getItem('user');
if (jsonFromLocalStorage !== null) {
    const parsedData = JSON.parse(jsonFromLocalStorage);

    user_crea.value = parsedData.data.Nombre;
    USER_ROL.value = +parsedData.data.ID_rol;
    USER.value = parsedData.data.ID_user;
}

const ROLFILTERUSER = [1,5] //ESTE ARREGLO INDICA QUE ROLES DE USUARIO, VA FILTRAR POR  item.User_asing

const { dataUser } = useUserRol(USER_ROL.value) // buscamos los datos para el tipo de ROL DE USUARIO

const editItem = (item: any) => {
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}


const getOrders = async () => {
  loadingInfo.value = true
  try {
    const url = `${baseUrl}/masterOrder`
    const { data } = await axios.get(url);

    const dataFilterStatus: any = data[0].filter((item: Table_Orders) => {
      if (ROLFILTERUSER.includes(USER_ROL.value)) {
        return item.ID_status === dataUser.param["ID_status"] && 
        item.User_asing === USER.value;
      } else {
        return item?.ID_status === dataUser?.param["ID_status"];
      }
    });

    info.value = dataFilterStatus

  } catch (error) {
    console.log(error)
  }
  loadingInfo.value = false
}

interface Asesores {
  Nombre: string;
  ID_user: number;
}

interface Table_Orders {
  ID_order: number;
  ID_detalle: string;
  Cedula: string;
  Cliente: string;
  Sucursal: string;
  User_crea: string;
  User_asing: number;
  Status: string;
  ID_status: number;
  Create_date: Date;
}

const getAsesores = async () => {
  try {
    const url = `${baseUrlAsesor}/filterMasterAsesor`
    const { data } = await axios.get(url);

    infoAsesores.value = data[0].map((asesor: Asesores) => ({
      title: asesor.Nombre,
      value: asesor.Nombre
    }));
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {

  await getOrders();
  await getAsesores();
});

const headers = ref([
  { title: 'COMANDA', align: 'start', key: 'ID_order' },
  { title: 'CEDULA', key: 'Cedula' },
  { title: 'CLIENTE', key: 'Cliente' },
  { title: 'FECHA', key: 'Create_date' },
  { title: 'ASESOR', key: 'Asesor' },
  { title: 'STATUS', key: 'Status' },
  { title: 'ACCIÓN', sortable: false, key: 'action' },
] as const);

</script>

<template>
  <!-- TABLA -->
  <UiTitleCard title="" class-name="px-0 pb-0 rounded-md">

    <v-card flat>
      <!-- filter and buttons -->
      <v-card-title class="d-flex align-center  px-1">

        <v-col col="10" md="4">
          <v-text-field v-model="search" density="compact" label="Buscar comanda" prepend-inner-icon="mdi-magnify"
            variant="outlined" color="primary" flat hide-details single-line></v-text-field>
        </v-col>

        <v-spacer></v-spacer>

      </v-card-title>

      <!-- datatable -->
      <v-data-table hover density="comfortable" v-model:search="search" :loading="loadingInfo" :items="info"
        :headers="headers" :no-data-text="'No hay datos disponibles'">

        <!-- view, update y delete -->
        <template v-slot:item.action="{ item }">
          <!-- ver -->
          <router-link :to="{ path: `/viewAsesor/${item['ID_detalle']}` }">
            <v-icon size="23" class="me-4" color="primary">
              mdi-eye-check
            </v-icon>
          </router-link>
        </template>

        <!-- estado -->
        <template v-slot:item.Status="{ item }">
          <v-chip variant="tonal" color="warning" size="x-small" prepend-icon="mdi-timer-sand"
            v-if="(item as any).Status === 'Creada'">
            <p class="mb-0">Creada</p>
          </v-chip>

          <v-chip variant="tonal" color="success" size="x-small" prepend-icon="mdi-check"
            v-else-if="(item as any).Status === 'Asignada'">
            <p class=" mb-0">Asignada</p>
          </v-chip>

          <v-chip variant="tonal" color="warning" size="x-small" prepend-icon="mdi-timer-sand" v-else>
            <p class="mb-0">Pendiente</p>
          </v-chip>

        </template>

        <!-- asesor -->
        <template v-slot:item.Asesor="{ item }">
          <v-chip variant="tonal" color="success" size="x-small" prepend-icon="mdi-check" v-if="(item as any).Asesor">
            <p class="mb-0">{{ (item as any).Asesor }}</p>
          </v-chip>

          <v-chip variant="elevated" color="error" size="x-small" prepend-icon="mdi-timer-sand" v-else>
            <p class="mb-0">No asignado</p>
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </UiTitleCard>
</template>

<style>
thead {
  background-color: rgb(250, 250, 250);
}
</style>
