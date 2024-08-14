<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import tablaCDD from '../dashboard/components/TablaCDD.vue';

// component content
const page = ref({ title: 'Comandas CDD' });
const breadcrumbs = ref([
  {
    title: 'Comandas Asignadas en CDD',
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
        <!-- tabla comanda CDD-->
        <tablaCDD />
    </v-col>
  </v-row>
</template>
