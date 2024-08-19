<script setup lang="ts">
import axios from "axios";
import { ref, onMounted, onUnmounted } from "vue";
import { useUserRol } from "@/composables/users";
import { useGetStatus } from "@/composables/status";
import { io } from "socket.io-client";
import UiTitleCard from "@/components/shared/UiTitleCard.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const search = ref("");
const info = ref([]);
const loadingInfo = ref(false);
const baseUrl = `${import.meta.env.VITE_URL}/api/orders`;
const baseUrlBack = `${import.meta.env.VITE_BACK_URL}`;
const urlSocket = ref();
const infoAsesores = ref();
const infogetStatus = ref(); 
const id_sucursal = ref();

let USER_ROL = ref<number>(0); //Variable donde se almacena el ROL DEL USUARIO que vendria del localstorage
let USER = ref<number>(0); //Variable donde se almacena el ID USUARIO que vendria del localstorage
let user_crea = ref<string>("");

// DATA DEL LOCAL STORAGE
const jsonFromLocalStorage = sessionStorage.getItem("user");
if (jsonFromLocalStorage !== null) {
  const parsedData = JSON.parse(jsonFromLocalStorage);
  user_crea.value = parsedData.data.Nombre;
  USER_ROL.value = +parsedData.data.ID_rol;
  USER.value = parsedData.data.ID_user;
  id_sucursal.value = parsedData.data.Id_sucursal;
}


const socket = io(`${baseUrlBack}`, {
  reconnection: false, // Deshabilitar la reconexión automática
});

if(USER_ROL.value === 4 || USER_ROL.value === 6 || USER_ROL.value === 11){
  urlSocket.value = 'get-master-order-pickup'
}else if(USER_ROL.value === 7){
  urlSocket.value = 'get-master-order-pickup-two'
}

// Listen for events from the server
socket.on(`get-master-order`, (rta) => {
    try {
        info.value = rta[0]
    } catch (error) { 
       console.log(error);
    }
});

const { dataUser } = useUserRol(USER_ROL.value); // buscamos los datos para el tipo de ROL DE USUARIO


interface getDataComanda {
  ID_order: string;
  Cedula: string;
  Sucursal: string;
  User_crea: string;
  Asesor: string;
  Status: number;
  ID_detalle: string;
}

interface Table_Orders {
  ID_order: number;
  ID_detalle: string;   
  Cedula: string;
  Cliente: string;
  Sucursal: string;
  ID_Sucursal:string;
  User_crea: string;
  User_asing: number;
  Status: string;
  ID_status: number;
  Create_date: Date;
}

const getMessageStatus = (id: number) => {
  if (infogetStatus && infogetStatus.value) {
    const status = infogetStatus.value.find(
      (item: any) => item.ID_status === id
    )?.Status;
    return status;
  }
  return null;
};

const getNameAsesor = (id: number) => {
  if (infoAsesores && infoAsesores.value) {
    const asesor = infoAsesores.value.find(
      (item: any) => item.value == id
    )?.title;
    return asesor;
  }
  return null;
};

onMounted(async () => {
  const { status } = await useGetStatus();
  infogetStatus.value = status;
});

onUnmounted(() => {
  socket.disconnect();
  console.log("Socket desconectado");
});

// Cabezera de la comanda
const headers = ref([
  { title: "COMANDA", align: "start", key: "ID_order" },
  { title: "CEDULA", key: "Cedula" },
  { title: "SUCURSAL", key: "Sucursal" },
  { title: "DELIVERY", key: "Delivery_type" },
  { title: "CREADOR", key: "User_crea" },
  { title: "FECHA", key: "Create_date"},
  { title: "HORA", key: "Hora" },
  { title: "STATUS", key: "Status" },
  { title: "", sortable: false, key: "action"},
] as const);

// COlor de estatus
const COLORSTATUS: any = {
  1: "success",
  2: "warning",
  3: "success",
  4: "info",
  5: "warning",
  6: "success",
  7: "warning",
  8: "success",
  9: "error",
};
</script>

<template>
  <!-- TABLA -->
  <UiTitleCard title="" class-name="px-0 pb-0 rounded-md">
    <v-card flat>
      <!-- filter and buttons -->
      <v-card-title class="d-flex align-center px-1">
        <v-col col="10" md="4">
          <v-text-field
            v-model="search"
            density="compact"
            label="Buscar comanda"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            color="primary"
            flat
            hide-details
            single-line
          ></v-text-field>
        </v-col>

        <v-spacer></v-spacer>
      </v-card-title>

      <!-- datatable -->
      <v-data-table
        hover
        density="comfortable"
        v-model:search="search"
        :loading="loadingInfo"
        :items="info"
        :headers="headers"
        :no-data-text="'No hay datos disponibles'"
      >
        <!-- process -->
        <template v-slot:item.action="{ item }">
          <router-link
            :to="{
              path: `/DetalleComandaReporte/${item['ID_detalle']}/${item['ID_order']}`,
            }"
          >
            <v-icon size="23" class="me-4" color="primary">
              mdi-eye-check
            </v-icon>
          </router-link>
        </template>

        <!-- status -->
        <template v-slot:item.Status="{ item }">
          <v-chip
            variant="tonal"
            :color="COLORSTATUS[(item as Table_Orders).ID_status]"
            size="x-small"
            :prepend-icon="
              (item as any).ID_status === 1 ? 'mdi-check' : 'mdi-timer-sand'
            "
          >
            <p class="mb-0">{{ getMessageStatus((item as any).ID_status) }}</p>
          </v-chip>
        </template>

        <!-- asesor -->
        <template v-slot:item.Asesor="{ item }">
          <v-chip
            variant="tonal"
            :color="COLORSTATUS[(item as Table_Orders).ID_status]"
            size="x-small"
            prepend-icon="mdi-check"
            v-if="(item as any).Asesor"
          >
            <p class="mb-0">{{ getNameAsesor((item as any).Asesor) }}</p>
          </v-chip>

          <v-chip
            variant="elevated"
            color="error"
            size="x-small"
            prepend-icon="mdi-timer-sand"
            v-else
          >
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
