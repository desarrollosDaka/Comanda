<script setup lang="ts">

import { ref, onMounted } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import detailComanda from '../dashboard/components/detailComanda.vue';
import { useRoute } from 'vue-router'
import axios from 'axios';

const route = useRoute();

const baseUrlBack = `${import.meta.env.VITE_BACK_URL}`;

// component content
const page = ref({ title: 'Comanda Asignadas' });
const ID_rol = ref();
const ruta = ref('');

// Localstorage
const jsonFromLocalStorage = localStorage.getItem("user");
if (jsonFromLocalStorage !== null) {
  const parsedData = JSON.parse(jsonFromLocalStorage);
  ID_rol.value = parsedData.data.ID_rol;

}

if (ID_rol.value === '10') {

  ruta.value = '/ComandasAtc'
} else if (ID_rol.value === '11' || ID_rol.value === '1') {

  ruta.value = '/retenciones'
} else {

  ruta.value = '/maestroComandaAsignada'
}

const breadcrumbs = ref([
  {
    title: 'Comandas Asignadas',
    disabled: false,
    to: `${ruta.value}`
  },
  {
    title: 'Detalle',
    disabled: true,
    to: '#'
  }
]);

onMounted(async () => {
  if (ID_rol.value == 5) {
    const { data } = await axios.get(`${baseUrlBack}/api/findOne/notify/${route.params.id}`);
    const response = await axios.put(`${baseUrlBack}/api/update/notify/${data}`);
    console.log("id_notification", response)
  }
})

</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Datos de la comanda">
        <detailComanda />
      </UiParentCard>
    </v-col>
  </v-row>
</template>
