<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import tablaReporte from '../dashboard/components/TablaReporte.vue';

// component content
const page = ref({ title: 'Reporte de Comandas' });
const breadcrumbs = ref([
  {
    title: 'Reporte de Comandas Daka',
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
        <!-- Reportes -->
        <tablaReporte />
    </v-col>
  </v-row>
</template>
