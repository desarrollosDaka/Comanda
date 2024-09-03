<script setup lang="ts">
import axios from "axios";
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useUserRol } from "@/composables/users";
import { useGetStatus } from "@/composables/status";
import { io } from "socket.io-client";
import { useRoute } from "vue-router";
const route = useRoute();

import UiTitleCard from "@/components/shared/UiTitleCard.vue";
const search = ref("");
const info = ref<Table_Orders[]>([]);
const infoLength = ref(0); 
const loadingInfo = ref(false);
let isFirstLoad = true;
const baseUrl = `${import.meta.env.VITE_URL}/api/orders`;
const baseUrlAsesor = `${import.meta.env.VITE_URL}/api/orders`;
const baseUrlBack = `${import.meta.env.VITE_BACK_URL}`;
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

const ROLFILTERUSER = [1, 5]; //ESTE ARREGLO INDICA QUE ROLES DE USUARIO, VA FILTRAR POR  item.User_asing
const { dataUser } = useUserRol(USER_ROL.value); // buscamos los datos para el tipo de ROL DE USUARIO

const socket = io(`${baseUrlBack}`, {
  reconnection: false, // Deshabilitar la reconexión automática
});

interface getDataComanda {
  ID_order: string;
  Cedula: string;
  Sucursal: string;
  User_crea: string;
  Asesor: string;
  Status: number;
  ID_detalle: string;
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
  ID_Sucursal:string;
  User_crea: string;
  User_asing: number;
  Status: string;
  ID_status: number;
  Create_date: Date;
}

// Listen for events from the server
socket.on("get-master-order", (rta) => {

  if (Array.isArray(rta)) {
  const dataFilterStatus: Table_Orders[] = rta[0].filter((item: Table_Orders) => {
      if (ROLFILTERUSER.includes(USER_ROL.value)) { 

        //FILTRAMOS POR ASESORES ASIGNADOS
        return dataUser.status.includes(item.ID_status) && item.User_asing?.toString() === USER.value?.toString() && item.ID_Sucursal === id_sucursal.value

      }else {
        //FILTRAMOS SOLO POR ESTATUS y SUCURSAL
        return(
          dataUser.status.includes(item.ID_status) && item.ID_Sucursal === id_sucursal.value 
        );
      }
    });

    info.value = dataFilterStatus
    loadingInfo.value = false;

  } else {
    console.error("La respuesta no es un array:", rta);
 } 
});





const getAsesores = async () => {

  try {
    const url = `${baseUrlAsesor}/filterMasterAsesor/`;

    const { data } = await axios.get(url);


    infoAsesores.value = data[0].map((asesor: Asesores) => ({
      value: asesor.ID_user,
      title: asesor.Nombre,
    }));

  } catch (error) {
    console.log(error);
  }
};

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
  //await getOrders();
  loadingInfo.value = true; 
  await getAsesores();
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
  { title: "CLIENTE", key: "Cliente" },
  { title: "FECHA", key: "Create_date" },
  { title: "STATUS", key: "Status" },
  { title: "", sortable: false, key: "action" },
] as const);


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
              path: `/viewProcessComandas/${item['ID_detalle']}/${item['ID_order']}`,
            }"
          >
          <v-icon size="23" class="me-4" color="primary" v-if="USER_ROL ===  5 && (item as any).ID_status === 2 || (item as any).ID_status === 3 && USER_ROL ===  6  
          || (item as any).ID_status === 10 && USER_ROL ===  7   || (item as any).ID_status === 4 && USER_ROL ===  7 || (item as any).ID_status === 1 && USER_ROL ===  4 || (item as any).ID_status === 4 && USER_ROL ===  9"  >
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
              (item as any).ID_status === 1 || (item as any).ID_status === 10  ? 'mdi-check' : 'mdi-timer-sand'
            "
          >
            <p class="mb-0">{{ getMessageStatus((item as any).ID_status) }}</p>
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
