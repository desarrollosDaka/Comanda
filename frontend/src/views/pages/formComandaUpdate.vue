<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import formComandaUpdate from '../formComanda/formComandasUpdate.vue';

// component content
const page = ref({ title: 'Actualizar Comanda' });
const breadcrumbs = ref([
  {
    title: 'Documentos',
    disabled: true,
    to: '#'
  }
]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Actualiza el Documento">

        <formComandaUpdate/>

      </UiParentCard>
    </v-col>
  </v-row>
</template>


