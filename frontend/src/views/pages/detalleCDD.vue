<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import detalleCDD from '../dashboard/components/viewDetailCDD.vue';

// component content pickupsDetails
const page = ref({ title: 'Comandas en CDD' });
const breadcrumbs = ref([
  {
    title: 'Detalles CDD',
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

        <!-- detalle de comandas en CDD -->
        <detalleCDD />

    </v-col>
  </v-row>
</template>
