<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import detallesComandaAsesor from '../dashboard/components/detallesComandaAsesor.vue';

// component content
const page = ref({ title: 'Comanda Asignadas' });

const breadcrumbs = ref([
  {
    title: 'Comandas',
    disabled: false,
    to: '#'
  }]);

</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Datos de la comanda">
        <detallesComandaAsesor/>
      </UiParentCard>
    </v-col>
  </v-row>
</template>

