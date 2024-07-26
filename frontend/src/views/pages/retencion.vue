<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import tablaConRetencion from '../dashboard/components/TablaRetencion.vue';

// component content
const page = ref({ title: 'Comandas con retencion' });
const breadcrumbs = ref([
  {
    title: 'Comandas con retencion',
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
        <!-- tabla comanda con retencion -->
        <tablaConRetencion />
    </v-col>
  </v-row>
</template>
