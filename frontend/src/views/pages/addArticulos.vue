<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import Articulo from '../dashboard/components/Articulos.vue';

// component content
const page = ref({ title: 'Agregar/Actualizar Articulos' });
const breadcrumbs = ref([
  {
    title: 'Crear comanda',
    disabled: true,
    to: '#'
  },
  {
    title: 'Agregar pedidos',
    disabled: true,
    to: '#'
  }
]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>

    <!-- TABLA -->
    <v-col cols="12" md="12">
        <Articulo />
    </v-col>
    
  </v-row>
</template>
