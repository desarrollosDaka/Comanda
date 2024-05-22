<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import maestroComanda from '../dashboard/components/TablaComanda.vue';

// component content
const page = ref({ title: 'Comandas' });
const breadcrumbs = ref([
  {
    title: 'Comandas',
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
        <maestroComanda />
    </v-col>
  </v-row>
</template>
