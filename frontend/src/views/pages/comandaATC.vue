<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import tablaATC from '../dashboard/components/TAblaATC.vue';

// component content
const page = ref({ title: 'Comandas Asignadas ATC' });
const breadcrumbs = ref([
  {
    title: 'Comandas Asignadas ATC',
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
        <!-- tabla comanda ATC-->
        <tablaATC />
    </v-col>
  </v-row>
</template>
