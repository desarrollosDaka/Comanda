<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import img from '@/assets/images/daki.png'

// component content
const page = ref({ title: 'Información' });

const breadcrumbs = ref([
  {
    title: 'Comanda',
    disabled: true,
    to: '#'
  }
]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="12">
          <UiParentCard title="Comanda">
         
            <!-- <router-link to="documentacionDaka"><span class="azul">Ir a Mapa de Procesos</span></router-link> -->
            <div class="container">
                <p class="textoInfo">
                  La aplicación web de Tiendas Daka <span class="azul">Comanda</span>, es una solución integral diseñada para gestionar todas 
                  las operaciones de ventas en línea de la empresa. Esta plataforma permite a los usuarios 
                  administrar inventarios, procesar pedidos, realizar seguimiento de envíos y gestionar 
                  la atención al cliente de manera eficiente. Con una interfaz intuitiva y herramientas de análisis.
                </p>
                <img class="imagen" :src="img" alt="daki mascota de daka">
            </div>

          </UiParentCard>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<style scoped>
.azul{
    color: #1982c4;
    font-weight: 700;
}
.amarillo{
    color: #fdc500;
    font-weight: 700;
}

.imagen{
    width: 350px;
    max-width: 100%;
    margin-left: 0 auto;
    margin-right: 0 auto;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}
@media (max-width: 768px) {
    .container {
      flex-direction: column;
    }

    .textoInfo{
      padding: 10px;
      margin-top: 150px;
    }
}
</style>
