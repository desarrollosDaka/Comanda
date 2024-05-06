<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
// import maestroHistorial from '../dashboard/components/TablaHistorial.vue';

// component content
const page = ref({ title: 'Historial' });
const breadcrumbs = ref([
  {
    title: 'Historial de Codificación',
    disabled: true,
    href: '#'
  }
]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <!-- TABLA -->
    <v-col cols="12" md="12">
        <!-- tabla -->
        <!-- <maestroHistorial /> -->
    </v-col>
  </v-row>
</template>
