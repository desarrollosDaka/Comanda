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
    disabled: true,
    href: '#'
  }
]);

// const colorShadow = ref(['primary', 'secondary', 'info', 'success', 'warning', 'error']);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Agregar Nuevo Cliente">

        <formComanda/>
        
      </UiParentCard>
    </v-col>
  </v-row>
</template>


