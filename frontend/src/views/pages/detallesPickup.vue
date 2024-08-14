<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import detallePickUp from '../dashboard/components/detailPickup.vue';

// component content pickupsDetails
const page = ref({ title: 'Comandas con Delivery Pick-Up' });
const breadcrumbs = ref([
  {
    title: 'Detalles Pick-up',
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

        <!-- detalle de comandas con pickup -->
        <detallePickUp />

    </v-col>
  </v-row>
</template>
