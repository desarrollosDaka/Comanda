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
const info = ref([]);
const infoLength = ref(0); 
const loadingInfo = ref(false);
let isFirstLoad = true;
const baseUrl = `${import.meta.env.VITE_URL}/api/orders`;
const baseUrlAsesor = `${import.meta.env.VITE_URL}/api/orders`;
const baseUrlBack = `${import.meta.env.VITE_BACK_URL}`;
const infoAsesores = ref();
const infogetStatus = ref();

const id_sucursal = ref();
 
/////////////////notifications /////////////////////
const PUBLIC_VAPID_KEY: string = "BChYwJmtdx1DnCyWvAImpEzQXmNnLQavrl1CtZxwwRlxhiq5F3Uj_AmqQUKH87H7QUd-dGfMAsMwR61vUhHwAOo";
const route1: string = "http://localhost:3002/api"


////////////////////////
const socket = io(`${baseUrlBack}`, {
  reconnection: false, // Deshabilitar la reconexión automática
});

// Listen for events from the server
socket.on("get-master-order", (rta) => {
  //console.log("Datos actualizados:", rta);
  if (Array.isArray(rta)) {

  const dataFilterStatus: any = rta[0].filter((item: Table_Orders) => {
      if (ROLFILTERUSER.includes(USER_ROL.value)) { 

        //FILTRAMOS POR ASESORES ASIGNADOS
        return dataUser.status.includes(item.ID_status) && item.User_asing.toString() === USER.value.toString() && item.ID_Sucursal === id_sucursal.value

      } else {

        //FILTRAMOS SOLO POR ESTATUS
        return (

          dataUser.status.includes(item.ID_status) && item.ID_Sucursal === id_sucursal.value 

        );
      }
    });
    info.value = dataFilterStatus

    const infoArray = info.value;

    infoLength.value = infoArray.length;

  } else {
    console.error("La respuesta no es un array:", rta);
 } 
});



//////////////////////////////////////////////////DATOS INCIO SESION/////////////////////////////////

const handleNewItem = () => {
  //console.log("Nuevo valor agregado:", newItem);


fetch(route1 + '/notification', {
  method: 'POST',
  body: JSON.stringify({ message: "NUEVA COMANDA ASIGNADA" }),
  headers: {
    'Content-Type': 'application/json'
  }
});  

  // Actualizamos la longitud
  infoLength.value = info.value.length;

};


watch(info, (newValue, oldValue) => {
//console.log("INFO"+info.value);
if (isFirstLoad) {
    // Si es la primera carga, no hagas nada
    isFirstLoad = false;
  } else if (newValue.length > oldValue.length) {
    // Se ha agregado un nuevo valor
    handleNewItem();
  }
});


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
const STATUSPRINTER = [4]; //ESTE ARREGLO INDICA EN QUE ESTATUS DEBE ESTAR LA COMANDA PARA IMPRIMIR
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

const getAsesores = async () => {

  try {
    const url = `${baseUrlAsesor}/filterMasterAsesor/`;

    const { data } = await axios.get(url);
    console.log(data);

    infoAsesores.value = data[0].map((asesor: Asesores) => ({
      value: asesor.ID_user,
      title: asesor.Nombre,
    }));
    console.log(infoAsesores.value);

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
  { title: "ASESOR", key: "Asesor" },
  { title: "STATUS", key: "Status" },
  { title: "ACCIÓN", sortable: false, key: "action" },
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
              path: `/viewProcessComandas/${item['ID_detalle']}/${item['ID_order']}`,
            }"
          >
            <v-icon size="23" class="me-4" color="primary">
              mdi-eye-check
            </v-icon>
          </router-link>

          <!-- <v-icon
            v-if="STATUSPRINTER.includes((item as Table_Orders).ID_status)"
            size="23"
            class="me-4"
            color="primary"
          >
            mdi-printer
          </v-icon> -->
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
