<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import img from '@/assets/images/trabajo-en-progreso.png';

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
          <UiParentCard title="">
         
            <!-- <router-link to="documentacionDaka"><span class="azul">Ir a Mapa de Procesos</span></router-link> -->
            <div class="container">
                <img class="imagen" :src="img" alt="imagen ilustra">
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
    width: 450px;
    max-width: 100%;
    margin-left: 0 auto;
    margin-right: 0 auto;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
