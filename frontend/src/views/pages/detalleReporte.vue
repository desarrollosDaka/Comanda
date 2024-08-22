<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import detailReporte from '../dashboard/components/ViewDetailReporte.vue';

const page = ref({ title: 'Detalles de comadas' });

const breadcrumbs = ref([
  {
    title: 'Tabla comandas',
    disabled: false,
    to: '/ReporteComanda'
  },
  {
    title: 'Detalles Comadas',
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
        <!-- detalle de comanda -->
        <detailReporte />
    </v-col>
  </v-row>
</template>
