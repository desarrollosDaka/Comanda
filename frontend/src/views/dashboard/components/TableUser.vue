<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import UiTitleCard from '@/components/shared/UiTitleCard.vue';

import Swal from 'sweetalert2'
import axios from 'axios';
import { shallowRef, ref, onMounted, onUnmounted } from 'vue';
import { io } from 'socket.io-client';

const search = ref('') 
const loadingInfo = ref(false);
const Delete = ref(true);
const baseUrl = `${import.meta.env.VITE_URL}/api/users`;

const socket = io('http://localhost:3003', {
  reconnection: false // Deshabilitar la reconexión automática
});

const info = ref([]) ;



// Listen for events from the server
socket.on('get-master-user', (rta) => {
  console.log('Datos actualizados:', rta);
  if (Array.isArray(rta)) {
    info.value = rta[0];
    console.log(info.value);
  } else {
    console.error('La respuesta no es un array:', rta);
  }
});

const getUser = async () => {
  /*loadingInfo.value = true
  try{

    const url = `${baseUrl}/masterUser`
    const {data} = await axios.get(url);
      info.value =  data[0]

  } catch(error){
      console.log(error)
  }
  loadingInfo.value = false*/
}

const deleteUser = async (id:string) => {
  try{
      await axios.put(`${baseUrl}/deleteUser/${id}`,{
      Delete: Delete.value.toString()
    });
    
  } catch(error){
      console.log(error)
  }
}

const headers = ref([
  {title: '#', align: 'start', sortable: false, key: 'ID_user',},
  {title: 'CORREO', align: 'start', sortable: false, key: 'Email',},
  {title: 'NOMBRE', key: 'Nombre'},

  {title: 'SUCURSAL', key: 'Sucursal'},
  {title: 'ASESOR', key: 'Dpto_ventas'},
  {title: 'ROL', key:'Nombre_rol'},
  {title: 'ACCIÓN',  sortable: false, key: 'action'},
] as const);

// onMounted( async () => {
//     await getUser();
// });

onUnmounted(() => {
  socket.disconnect();
  console.log('Socket desconectado');
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
            deleteUser(id)
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

</script>

<template>
  <!-- table -->
  <UiTitleCard title="" class-name="px-0 pb-0 rounded-md">
    <v-card flat>

      <!-- filter and buttons -->
      <v-card-title class="d-flex align-center  px-1">
        <v-col col="10" md="4">
        <v-text-field
            v-model="search"
            density="compact"
            label="Buscar"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            color="primary"
            flat
            hide-details
            single-line
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <router-link to="/formCreatedUser">
            <v-btn prepend-icon="mdi-account-plus" color="primary" class="mx-3">
                Crear Usuario
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

        <!-- update y delete -->
        <template v-slot:item.action="{item}">
          <!-- Editar -->
          <router-link :to="{path:`/formUpdateUser/${item['ID_user']}`}"> 
            <v-icon size="23" class="me-4" color="warning">
              mdi-pencil
          </v-icon>
          </router-link>

          <!-- Eliminar -->
          <v-icon size="23"  color="error" @click="eliminardata(item['ID_user'])">
              mdi-delete
          </v-icon>
        </template>

        <!-- asesor -->
        <template v-slot:item.Dpto_ventas="{item}">
          <v-chip variant="tonal" color="success" size="x-small" prepend-icon="mdi-check" v-if="(item as any).Dpto_ventas == true">
              <p class="mb-0">Si</p>
            </v-chip>
            <v-chip variant="tonal" color="error" size="x-small" prepend-icon="mdi-alert-decagram-outline" v-else>
              <p class="mb-0">No</p>
            </v-chip>
        </template>

        <!-- roles -->
        <template v-slot:item.Nombre_rol="{item}">
          <v-chip color="primary" size="x-small" prepend-icon="mdi-account-outline">
            {{ item['Nombre_rol'] }}
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
