<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import tablaATCOnline from '../dashboard/components/TablaATCOnline.vue';

// component content
const page = ref({ title: 'Comandas Asignadas ATC Online' });
const breadcrumbs = ref([
  {
    title: 'Comandas Asignadas ATC Online',
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
        <tablaATCOnline />
    </v-col>
  </v-row>
</template>
