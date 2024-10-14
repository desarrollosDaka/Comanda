<script setup lang="ts">
import { io } from "socket.io-client";
import Swal from "sweetalert2";
import axios from "axios";
import { useGetStatus } from "@/composables/status";
import { shallowRef, ref, onMounted, onUnmounted } from "vue";

import UiTitleCard from "@/components/shared/UiTitleCard.vue";

const search = ref("");
let info = ref<any[]>([]);
const loadingInfo = ref(false);
const baseUrl = `${import.meta.env.VITE_URL}/api/orders`;
const baseUrlMotivo = `${import.meta.env.VITE_URL}/api/motivo`;
const dialog = ref(false);
const id_sucursal = ref();

const selectedMotivo = ref();
const idDocuments = ref("");
const estatus = ref();
const estatusNumber = ref(9);
const infogetStatus = ref();
const infoMotivo = ref();
let urlSocket = ref();
let USER_ROL = ref();

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


interface Motivo {
  Motivo: string;
  ID_motivo: number;
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
// DATA DEL LOCAL STORAGE
const jsonFromLocalStorage = localStorage.getItem("user");
if (jsonFromLocalStorage !== null) {
  const parsedData = JSON.parse(jsonFromLocalStorage);
  USER_ROL.value = +parsedData.data.ID_rol;
  id_sucursal.value = parsedData.data.Id_sucursal;
}




const socket = io(import.meta.env.VITE_BACK_URL, {
  reconnection: false, // Deshabilitar la reconexión automática
});

// Emitir evento para solicitar datos del servidor
const requestMasterOrder = () => {
  setInterval(() => {
    socket.emit('getComanda', id_sucursal.value);
  }, 5000);
};

if(id_sucursal.value === 1){
  urlSocket.value = 'get-master-order'
}else {
  urlSocket.value = 'get-master-order-suc'
}

// Listen for events from the server
socket.on(`${urlSocket.value}`, (rta: any) => {
 // console.log("Datos actualizados:", rta);
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



const getMotivo = async () => {
  try {
    const url = `${baseUrlMotivo}/masterMotivo`;
  
    const { data } = await axios.get(url);
    
    infoMotivo.value = data.map((motivo: Motivo) => ({
      value: motivo.ID_motivo,
      title: motivo.Motivo,
    }));
    //console.log(infoMotivo.value);
    
  } catch (error) {
    console.log(error);
  }
};

const deleteDocuments = async (id: string) => {
  estatus.value = true;
  try {
    const response = await axios.put(`${baseUrl}/deleteOrder/${id}`, {
      status: estatus.value.toString(),
      motivo: selectedMotivo.value,
      statusNumber: estatusNumber.value
    });
    if (response) {
      dialog.value = false;
      Swal.fire({
        title: "Comanda eliminada",
        text: "Se acaba de eliminar una comanda",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          //location.reload();
          requestMasterOrder();
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// Emitir evento al montar el componente
onMounted(() => {
  loadingInfo.value = true; 
  socket.connect();
  socket.emit('getComanda', id_sucursal.value);
  requestMasterOrder();

});

onUnmounted(() => {
  socket.disconnect();
  //console.log("Socket desconectado");
});

onMounted(async () => {
  const { status } = await useGetStatus();
  infogetStatus.value = status;
  await getMotivo();
});

const headers = ref([
  { title: "COMANDA", align: "start", key: "ID_order" },
  { title: "TIPO", align: "end", key: "Tipo_cedula" },
  { title: "CEDULA", key: "Cedula" },
  { title: "SUCURSAL", key: "Sucursal" },
  { title: "CLIENTE", key: "Cliente" },  
  { title: "DELIVERY", key: "Delivery_type" },
  { title: "STATUS", key: "Status" },
  { title: "FECHA", key: "Create_date" },
  { title: "H. CREA", key: "Hora"},
  { title: "FECHA ACTUALIZA", key: "Update_date" },
  { title: "H. ACTUALIZA", key: "HoraUpdate"},

  { title: "", sortable: false, key: "action" },
] as const);
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

        <router-link to="/formComanda">
          <v-btn
            prepend-icon="mdi-book-plus-multiple"
            color="primary"
            class="mx-3"
          >
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
        <template v-slot:item.action="{ item }">

          <div class="iconosTabla">
            <!-- Editar --> 
            <router-link
              :to="{ path: `/formComandaUpdate/${item['ID_detalle']}/${item['ID_order']}` }">
              <v-icon size="23" class="me-2" color="warning"> mdi-pencil </v-icon>
            </router-link>

            <!-- Eliminar -->
            <v-icon size="23" class="me-2" color="error" @click="editItem(item)" 
              v-if="item.ID_status == '1'">
              mdi-delete
            </v-icon>

          </div>
     
          <v-dialog v-model="dialog" max-width="600px">
            <v-card>
              <v-card-title>
                <span class="text-h5"
                  >COMANDA A ELIMINAR: {{ deleteItem.ID_order }}</span
                >
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="auto">
                      <img
                        src="../../../assets/images/borrar.gif"
                        alt="Descripción del GIF"
                        width="100"
                      />
                    </v-col>

                    <v-col cols="12" md="8" sm="6">
                      <v-label text="Motivo"></v-label>
                      <br />    
                      <v-autocomplete
                        id="tipo"
                        placeholder="Seleccione un motivo"
                        clearable
                        chips
                        :items="infoMotivo"
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

                <v-btn color="error" 
                variant="elevated" 
                @click="dialog = false" 
                >
                  Cancelar
                </v-btn>

                <v-btn
                  type="submit"
                  color="primary"
                  variant="elevated"
                  :disabled="!selectedMotivo"
                  @click="deleteDocuments(deleteItem.ID_order)"
                >
                  Eliminar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </template>

        <!-- estado -->
        <template v-slot:item.Status="{ item }">
                  <v-chip
            variant="elevated"
            :color="COLORSTATUS[(item as Table_Orders).ID_status]"
            size="small"
            :prepend-icon="
              (item as any).ID_status === 1 ? 'mdi-check' : 'mdi-timer-sand'
            "
          >
            <p class="mb-0">{{ item['Status'] }}</p>
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </UiTitleCard>
</template>

<style scoped>
thead {
  background-color: rgb(250, 250, 250);
}

.iconosTabla{
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
}
</style>
