<script setup lang="ts">

import { ref, onMounted } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import detailComanda from '../dashboard/components/detailComanda.vue';

import { io } from "socket.io-client";
const baseUrlBack = `${import.meta.env.VITE_BACK_URL}`;
const socket = io('ws://localhost:3003'); // ws


// setInterval(()=> {
//   console.log("funcionando ");
// socket.emit('nuevaComanda', '100');
// }, 1000)

socket.on('nuevaComanda', (datos) => {
  console.log('datos recibidos: ', datos);
});

// component content
const page = ref({ title: 'Comanda Asignadas' });

const breadcrumbs = ref([
  {
    title: 'Comandas Asignadas',
    disabled: false,
    to: '/maestroComandaAsignada'
  },
  {
    title: 'Detalle',
    disabled: true,
    to: '#'
  }
]);

</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Datos de la comanda">
        <detailComanda/>
      </UiParentCard>
    </v-col>
  </v-row>
</template>

