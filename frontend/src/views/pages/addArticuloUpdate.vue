<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import Articulo from '../dashboard/components/Articulos.vue';

// component content
const page = ref({ title: 'Actualizar Articulos' });
const breadcrumbs = ref([
  {
    title: 'Actualizar comanda',
    disabled: true,
    to: '#'
  },
  {
    title: 'Actualizar pedidos',
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
        <Articulo />
    </v-col>
  </v-row>
</template>
