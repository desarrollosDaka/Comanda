<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import formComanda from '../formComanda/formComandas.vue';

// component content
const page = ref({ title: 'Nueva Comanda' });
const breadcrumbs = ref([
  {
    title: 'Comandas',
    disabled: false,
    to: '/maestroComanda'
  },
  {
    title: 'Crear Comandas',
    disabled: true,
    to: '#'
  }
]);

</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Agregar Nueva comanda">

        <formComanda/>
        
      </UiParentCard>
    </v-col>
  </v-row>
</template>


