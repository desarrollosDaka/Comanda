<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import maestroPedidos from '../dashboard/components/TablaPedidos.vue';

// component content
const page = ref({ title: 'Pedidos' });
const breadcrumbs = ref([
  {
    title: 'Pedidos',
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
        <maestroPedidos />
    </v-col>
  </v-row>
</template>
