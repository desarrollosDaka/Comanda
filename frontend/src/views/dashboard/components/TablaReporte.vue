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
const urlSocketEmit = ref();
const infoAsesores = ref();
const infogetStatus = ref(); 
const id_sucursal = ref();
const dateNow = ref()
const desde = ref()
const hasta = ref()

const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
const year = today.getFullYear();
dateNow.value = `${year}-${month}-${day}` // Ejemplo de salida: 26/8/2024
desde.value = dateNow.value
hasta.value = dateNow.value

let USER_ROL = ref<number>(0); //Variable donde se almacena el ROL DEL USUARIO que vendria del localstorage
let USER = ref<number>(0); //Variable donde se almacena el ID USUARIO que vendria del localstorage
let user_crea = ref<string>("");

// DATA DEL LOCAL STORAGE
const jsonFromLocalStorage = localStorage.getItem("user");
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

// const desdeHasta = () =>{
//   // alert(`${desde.value} And ${hasta.value}`)
//   setInterval(() =>{
//     socket.emit('getOrderFecha', desde.value, hasta.value);
//   }, 1000);
// }


if(USER_ROL.value === 11 || USER_ROL.value === 4){
  urlSocket.value = 'get-master-order-report-filter'
  urlSocketEmit.value = 'getComandaReporteFilter'
}else if(USER_ROL.value === 99){
  urlSocket.value = 'get-master-order-report'
  urlSocketEmit.value = 'getComandaReporte'
}

// Emitir evento para solicitar datos del servidor
const requestMasterOrder = () => {
  setInterval(() => {
    socket.emit(`${urlSocketEmit.value}`, id_sucursal.value);
  }, 3000);
};

// Listen for events from the server
socket.on(`${urlSocket.value}`, (rta) => {
    try {
        info.value = rta[0]
        loadingInfo.value = false;
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

onMounted(async () => {
  loadingInfo.value = true;
  socket.emit(`${urlSocketEmit.value}`, id_sucursal.value);
  const { status } = await useGetStatus();
  infogetStatus.value = status;
});

onUnmounted(() => {
  socket.disconnect();
});

// Cabezera de la comanda
const headers = ref([
  { title: "COMANDA", align: "start", key: "ID_order" },
  { title: "CEDULA", key: "Cedula" },
  { title: "SUCURSAL", key: "Sucursal" },
  { title: "DELIVERY", key: "Delivery_type"},
  { title: "CREADOR", key: "User_crea" },
  { title: "FECHA", key: "Create_date"},
  { title: "H. CREA", key: "Hora" },
  { title: "H. ACTUALIZA", key: "HoraUpdate" },
  { title: "STATUS", key: "Status" },
  { title: "", sortable: false, key: "action"},
] as const);

// COlor de estatus
const COLORSTATUS: any = {
  1: "#ffca3a", //creada
  10: "#fb5607", //prefactura Cargada
  2: "#0466c8", //Asignada
  3: "#965745", //Revisada
  4: "#006400", //facturada
  5: "#6c757d", //retencion
  6: "#5aa9e6", //ret. aceptada
  7: "#a663cc", //pre-despacho
  8: "#38b000", //Despacho
  9: "#6a040f", //Eliminar
};
</script>

<template>
  <!-- TABLA -->
  <!-- <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          type="date"
          label="Desde"
          prepend-icon="mdi-filter-outline"
          variant="outlined"
          v-model="desde"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field
        type="date"
          label="Hasta"
          variant="outlined"
          v-model="hasta"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-btn 
          prepend-icon="mdi-filter" 
          variant="tonal"
          color="primary"
          @click="desdeHasta"
        >
          Filtrar
        </v-btn>
      </v-col>
    </v-row> -->

  <UiTitleCard title="" class-name="px-0 pb-0 rounded-md">
    <v-card flat>
      <!-- filter and buttons -->
      <v-card-title class="d-flex align-center px-1">
        <v-col col="10" md="4">
          <v-text-field
            v-model="search"
            density="compact"
            label="Filtrar comanda"
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
            variant="elevated"
            :color="COLORSTATUS[(item as Table_Orders).ID_status]"
            size="small"
            :prepend-icon="
              (item as any).ID_status === 1 ? 'mdi-check' : 'mdi-timer-sand'
            "
          >
            <p class="mb-0">{{ getMessageStatus((item as any).ID_status) }}</p>
          </v-chip>
        </template>

        <template v-slot:item.Delete="{item}">
          <v-chip variant="elevated" color="error" size="x-small" prepend-icon="mdi-alert-decagram-outline"  v-if="(item as any).Delete == true">
              <p class="mb-0">eliminada</p>
            </v-chip>
            <v-chip variant="elevated" color="#38b000" size="x-small" prepend-icon="mdi-check" v-else>
              <p class="mb-0">activo</p>
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
