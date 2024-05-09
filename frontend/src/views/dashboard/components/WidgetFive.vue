<script setup lang="ts">
import { shallowRef, ref } from 'vue';

const Rol = ref('')

const jsonFromLocalStorage = sessionStorage.getItem('user');
if (jsonFromLocalStorage !== null) {
  const parsedData = JSON.parse(jsonFromLocalStorage);
  Rol.value = parsedData.data.Nombre_rol;
} 

// icons
import { RiseOutlined, FallOutlined } from '@ant-design/icons-vue';

const fivecards = shallowRef([
  {
    name: 'Platilla',
    earn: 'Maestro de codificacion',
    percent: '',
    color: 'primary',
    icon: RiseOutlined,
    text: '35,000'
  },
  {
    name: '#reportes',
    earn: 'Reporteria y Tableros',
    percent: '',
    color: 'success',
    icon: RiseOutlined,
    text: '8,900'
  },
  {
    name: '#configuraciones',
    earn: 'Gestionar Notificaciones',
    percent: '',
    color: 'warning',
    icon: FallOutlined,
    text: '1,943'
  },
  {
    name: '#Documentos',
    earn: 'Documentos de Tiendas Daka',
    percent: '',
    color: 'error',
    icon: FallOutlined,
    text: '$20,395'
  }
]);
</script>
<template>
  <!-- BALDOSAS PRINCIPAl -->
  <v-row class="my-0">

    <!-- CARD -->
    <v-col cols="12" sm="6" md="4" v-if="Rol == 'Admin'">
      <v-card elevation="0">
        <v-card variant="tonal" color="primary" rounded="lg" class="elevation-3">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">

              <div>
                <h6 class="text-h6 text-lightText mb-1"><i class="ri-git-merge-line iconoBaldosas"></i></h6>
                <h4 class="text-h3 d-flex align-center mb-0">
                  Comandas
                </h4>
                <br>
                <router-link to="maestroCodificacion">
                  <v-btn variant="tonal" append-icon="mdi-arrow-right" size="small">Ver mas</v-btn>
                </router-link>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>

    <!-- CARD -->
    <v-col cols="12" sm="6" md="4" >
      <v-card elevation="0" disabled>
        <v-card variant="tonal" color="primary" rounded="lg" class="elevation-3">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">

              <div>
                <h6 class="text-h6 text-lightText mb-1"><i class="ri-folder-chart-line iconoBaldosas"></i></h6>
                <h4 class="text-h3 d-flex align-center mb-0">
                  Reportes <br>
                </h4>
                <br>
                <router-link to="#">
                  <v-btn variant="tonal" append-icon="mdi-arrow-right" size="small">Ver mas</v-btn>
                </router-link>
          
              </div>
              
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>

    <!-- CARD -->
    <v-col cols="12" sm="6" md="4" >
      <v-card elevation="0">
        <v-card variant="tonal" color="primary" rounded="lg" class="elevation-3">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">
              <div>
                <h6 class="text-h6 text-lightText mb-1"><i class="ri-shapes-line iconoBaldosas"></i></h6>
                <h4 class="text-h3 d-flex align-center mb-0">
                  Almacen 
                </h4>
                <br>
                <router-link to="documentacionDaka">
                  <v-btn variant="tonal" append-icon="mdi-arrow-right" size="small">Ver mas</v-btn>
                </router-link>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>
    
  </v-row>
</template>

<style scoped>
  .iconoBaldosas{
    font-size: 30px;
    color: black;
  }
</style>
