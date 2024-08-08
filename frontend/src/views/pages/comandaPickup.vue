<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import tablaPickUp from '../dashboard/components/TablaPickUp.vue';

// component content
const page = ref({ title: 'Comandas con Delivery tipo Pick-Up' });
const breadcrumbs = ref([
  {
    title: 'Comandas Pick-up',
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
        <tablaPickUp />
    </v-col>
  </v-row>
</template>
