<script setup lang="ts">
import { io } from "socket.io-client";
import Swal from "sweetalert2";
import axios from "axios";
import { useGetStatus } from "@/composables/status";
import { shallowRef, ref, onMounted, onUnmounted } from "vue";

import UiTitleCard from "@/components/shared/UiTitleCard.vue";

const search = ref("");
const info = ref([]);
const loadingInfo = ref(false);
const baseUrl = `${import.meta.env.VITE_URL}/api/orders`;
const dialog = ref(false);

const selectedMotivo = ref();
const idDocuments = ref("");
const estatus = ref();
const infogetStatus = ref();

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

const socket = io("http://localhost:3003", {
  reconnection: false, // Deshabilitar la reconexión automática
});




// Listen for events from the server
socket.on("get-master-order", (rta: any) => {
  console.log("Datos actualizados:", rta);
  loadingInfo.value = true;
  if (Array.isArray(rta)) {
    info.value = rta[0];
  } else {
    console.error("La respuesta no es un array:", rta);
  }
  loadingInfo.value = false;
});

let deleteItem = ref({
  ID_order: "",
});

const getMessageStatus = (id: number) => {
  if (infogetStatus && infogetStatus.value) {
    const status = infogetStatus.value.find(
      (item: any) => item.ID_status === id
    ).Status;
    return status;
  }
  return null;
};

const editItem = (item: any) => {
  deleteItem.value = Object.assign({}, item);
  dialog.value = true;
};

// const getOrders = async () => {
//     // loadingInfo.value = true
//     // try{
//     //     const url = `${baseUrl}/masterOrder`
//     //     const {data} = await axios.get(url);
//     //     info.value =  data[0]
//     // } catch(error){
//     //     console.log(error)
//     // }
//     // loadingInfo.value = false
// }

const deleteDocuments = async (id: string) => {
  estatus.value = true;
  try {
    const response = await axios.put(`${baseUrl}/deleteOrder/${id}`, {
      status: estatus.value.toString(),
      motivo: selectedMotivo.value,
    });
    if (response) {
      dialog.value = false;
      Swal.fire({
        title: "Comanda eliminada",
        text: "Se acaba de eliminar una comanda",
        icon: "success",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// onMounted( async () => {
//    // await getOrders();
// });
onUnmounted(() => {
  socket.disconnect();
  console.log("Socket desconectado");
});

onMounted(async () => {
  const { status } = await useGetStatus();
  infogetStatus.value = status;
});

const headers = ref([
  { title: "COMANDA", align: "start", key: "ID_order"},
  { title: "CEDULA", key: "Cedula"},
  { title: "SUCURSAL", key: "Sucursal"},
  { title: "CLIENTE", key: "Cliente"},
  { title: "FECHA", key: "Create_date"},
  { title: "STATUS", key: "Status"},
  { title: "ACCIÓN", sortable: false, key: "action"},
] as const);


</script>
 
<template>
  <!-- TABLA -->
  <UiTitleCard title="" class-name="px-0 pb-0 rounded-md">
    
    <v-card flat>
     <!-- filter and buttons -->
     <v-card-title class="d-flex align-center  px-1">

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

        <router-link to="/formComanda" >
            <v-btn prepend-icon="mdi-book-plus-multiple" color="primary" class="mx-3">
                Crear Pedidos
            </v-btn>
        </router-link>
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

        <!-- view, update y delete -->
        <template v-slot:item.action="{item}">
          <!-- ver -->
          

          <!-- Editar -->
          <router-link :to="{path:`/formComandaUpdate/${item['ID_detalle']}`}"> 
            <v-icon size="23" class="me-4" color="warning">  
              mdi-pencil
          </v-icon>
          </router-link>

          <v-icon size="23" class="me-4" color="error" @click="editItem(item)">
            mdi-delete
          </v-icon>
          <v-dialog
            v-model="dialog"
            max-width="600px"
          >
            <v-card>
                <v-card-title>
                  <span class="text-h5">COMANDA A ELIMINAR: {{ deleteItem.ID_order }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                     
                      <v-col cols="12" md="auto">
                          <img src="../../../assets/images/borrar.gif" alt="Descripción del GIF" width="100">
                      </v-col>

                      <v-col cols="12" md="8" sm="6">
                        <v-label
                          text="Motivo"
                        ></v-label>
                        <br>
                        <v-autocomplete
                          id="tipo"
                          placeholder="Seleccione un motivo"
                          clearable
                          chips
                          :items="['No me gusto', 'Me confundi', 'error mio']"
                          variant="outlined"
                          class="mt-2 py-3"
                          color="primary"
                          v-model="selectedMotivo"
                        ></v-autocomplete>
                      </v-col>
              
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="error"
                    variant="elevated"
                    @click="dialog = false"
                  >
                    Cancelar
                  </v-btn>

                  <v-btn
                    type="submit"
                    color="primary"
                    variant="elevated"
                    @click="deleteDocuments(deleteItem.ID_order)"
                  >
                    Eliminar
                  </v-btn>
                </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Eliminar -->

          <!-- <v-icon size="23"  color="error" @click="eliminardata(item['id'])">
            mdi-delete
          </v-icon> -->
        </template>

        <!-- estado -->
        <template v-slot:item.Status="{item}">
            <v-chip 
              variant="tonal"
              color="warning"
              size="x-small"
              prepend-icon="mdi-timer-sand"
              v-if="(item as any).Status === 'Creada'">
                <p class="mb-0">Creada</p>
            </v-chip>

            <v-chip
              variant="tonal"
              color="success"
              size="x-small"
              prepend-icon="mdi-check"
              v-else-if="(item as any).Status === 'Asignada'">
                <p class=" mb-0">Asignada</p>
            </v-chip>

            <v-chip 
              variant="tonal"
              color="warning"
              size="x-small"
              prepend-icon="mdi-timer-sand"
              v-else>
                <p class="mb-0">Pendiente</p>
            </v-chip>

        </template>

        
      </v-data-table>
  </v-card>
  </UiTitleCard>

 

</template>

<style scoped>
  thead{
    background-color: rgb(250, 250, 250);
  }
</style>