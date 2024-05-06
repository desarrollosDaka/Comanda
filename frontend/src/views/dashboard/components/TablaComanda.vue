<script setup lang="ts">
import Swal from 'sweetalert2'
import axios from 'axios';
import { shallowRef, ref, onMounted } from 'vue';

import UiTitleCard from '@/components/shared/UiTitleCard.vue';

const search = ref('') 
const info = ref([]);
const loadingInfo = ref(false);
const baseUrl = `http://localhost:3002/api/documents`;
const dialog = ref(false);

const selectedStatus = ref('')
const idDocuments = ref('')
const estatus = ref('')

let editedItem = ref({
  doc_title: '',
  doc_cod: '',
  approv_date: '',
  doc_status: ''
})

const editItem = (item: any) => {
  editedItem.value = Object.assign({}, item)
  dialog.value = true
}

// const getDocuments = async () => {
//     loadingInfo.value = true
//     try{
//         const response = await axios.get(`${baseUrl}/masterDocumentsFilter`);
//         info.value =  response.data[0]
//     } catch(error){
//         console.log(error)
//     }
//     loadingInfo.value = false
// }

const deleteDocuments = async (id:string) => {
  estatus.value = '1'
    try{
      const response = await axios.put(`${baseUrl}/updateEstatus/${id}`, {
      status: estatus.value
    })
        
    } catch(error){
        console.log(error)       
    }
}

onMounted( async () => {
    // await getDocuments();
});

function eliminardata(id:string){
    Swal.fire({
        title: "¿Desea eliminar este dato?",
        text: "No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, Eliminar!"
    }).then((result) => {
        if (result.isConfirmed) {
            deleteDocuments(id)
            Swal.fire({
            title: "Eliminado!",
            text: "Data eliminada con exito!",
            icon: "success",
            }).then((result) => {
            if (result.isConfirmed) {
                location.reload();
              }
            });
        }
    });
}

const headers = ref([
  {title: '#', align: 'start', key: 'id'},
  {title: 'COMANDA', align: 'start', key: 'number'},
  {title: 'CEDULA', key: 'order'}, 
  {title: 'CLIENTE', key: 'name'}, 
  {title: 'FECHA', key: 'amount'},
  {title: 'ASESOR', key: 'priority'},
  {title: 'ACCIÓN',  sortable: false, key: 'action'},
] as const);

const projects = shallowRef([
{
    id: '1',
    number: '1123123123',
    order: '28082907',
    name: 'Daniel Gonzalez',
    amount: '20/02/2024',
    priority: 'Aprobado'
  },
  {
    id: '2',
    number: '112312sdf23',
    order: '29763533',
    name: 'Johanna Perez',
    amount: '20/02/2024',
    priority: 'Pendiente'
  },
  {
    id: '3',
    number: '11231231234',
    order: '225367377',
    name: 'Christian Romero',
    amount: '20/02/2024',
    priority: 'Error'
  }
]);

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
                Crear Comanda
            </v-btn>
        </router-link>
      </v-card-title>

      <!-- datatable -->
      <v-data-table 
        hover 
        density="comfortable"
        v-model:search="search"
        :loading="loadingInfo"
        :items="projects"
        :headers="headers"
        :no-data-text="'No hay datos disponibles'"
      >

        <!-- view, update y delete -->
        <template v-slot:item.action="{item}">
          <!-- ver -->
          <v-icon size="23" class="me-4"  color="primary" @click="editItem(item)">
            mdi-eye-check
          </v-icon>

          <v-dialog
            v-model="dialog"
            max-width="600px"
          >
            <v-card>
                <v-card-title>
                  <span class="text-h5">NUMERO COMANDA: {{ editedItem.doc_cod }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="12">
                        <P>
                          INFORMACION DE LA COMANDA
                        </P>
                      </v-col>

                      <v-col cols="12" md="6" sm="6">
                        <v-label  
                          class="mb-3"
                          text="CED/RIF"
                        ></v-label>
                        <br>
                        <span class="caption">{{ editedItem.doc_title }}</span>
                      </v-col>

                      <v-col cols="12" md="6" sm="6">
                        <v-label
                          class="mb-3"
                          text="CORREO"
                        ></v-label>
                        <br>
                        <span class="caption">{{ editedItem.approv_date }}</span>
                      </v-col>

                      <v-col cols="12" md="6" sm="6">
                        <v-label
                        class="mb-4"
                          text="ESTATUS"
                        ></v-label>
                        <br>
                        <v-chip 
                          variant="tonal"
                          color="error"
                          size="small"
                          prepend-icon="mdi-alert-circle-outline"
                          v-if="editedItem.doc_status === 'Error'">
                            <p class="mb-0">Reprobado</p>
                        </v-chip>

                        <v-chip
                          variant="tonal"
                          color="success"
                          size="small"
                          prepend-icon="mdi-check"
                          v-else-if="editedItem.doc_status === 'Aprobado'">
                            <p class=" mb-0">Aprobado</p>
                        </v-chip>

                        <v-chip 
                          variant="tonal"
                          color="warning"
                          size="small"
                          prepend-icon="mdi-timer-sand" 
                          v-else>
                            <p class="mb-0">Pendiente</p>
                        </v-chip>
                      </v-col>

                      <v-col cols="12" md="6" sm="6">
                        <v-label
                          text="Actualizar Estatus"
                        ></v-label>
                        <br>
                        <v-autocomplete
                          id="tipo"
                          placeholder="Estatus"
                          clearable
                          chips
                          :items="['Aprobado', 'Reprobado', 'Pendiente']"
                          variant="outlined"
                          class="mt-2"
                          color="primary"
                          v-model="selectedStatus"
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
                  >
                    Guardar
                  </v-btn>
                </v-card-actions>
            </v-card>
          </v-dialog>
        
          <!-- Editar -->
          <!-- <router-link :to="{path:`/formMasterCodeUpdate/${item['id']}`}">  -->
          <router-link :to="{path:`/formMasterCodeUpdate/1`}"> 
            <v-icon size="23" class="me-4" color="warning">  
              mdi-pencil
          </v-icon>
          </router-link>

          <!-- Eliminar -->

          <v-icon size="23"  color="error" @click="eliminardata(item['id'])">
            mdi-delete
          </v-icon>
        </template>

        <!-- estado -->
        <template v-slot:item.priority="{item}">
            <v-chip 
              variant="tonal"
              color="error"
              size="x-small"
              prepend-icon="mdi-alert-circle-outline"
              v-if="(item as any).priority === 'Error'">
                <p class="mb-0">Error</p>
            </v-chip>

            <v-chip
              variant="tonal"
              color="success"
              size="x-small"
              prepend-icon="mdi-check"
              v-else-if="(item as any).priority === 'Aprobado'">
                <p class=" mb-0">Asignado</p>
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

<style >
  thead{
    background-color: rgb(250, 250, 250);
  }
</style>
