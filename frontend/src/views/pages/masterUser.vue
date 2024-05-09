<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import masterUsers from '../dashboard/components/TableUser.vue';

// component content
const page = ref({ title: 'Maestro de Usuarios' });
const breadcrumbs = ref([
  {
    title: 'Usuarios',
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
        <masterUsers />
    </v-col>
  </v-row>
</template>
