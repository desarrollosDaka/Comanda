<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import tabla from '../dashboard/components/TablaComandasAsignada.vue';

// component content
const page = ref({ title: 'Comandas Asignadas' });
const breadcrumbs = ref([
  {
    title: 'Comandas',
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
        <!-- tabla -->
        <tabla />
    </v-col>
  </v-row>
</template>
