<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import FormUSer from '../authentication/authForms/formUserUpdate.vue';

// component content
const page = ref({ title: 'Editar Usuario' });
const breadcrumbs = ref([
  {
    title: 'Usuarios',
    disabled: true,
    href: '#'
  }
]);

const colorShadow = ref(['primary', 'secondary', 'info', 'success', 'warning', 'error']);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="12">
      <UiParentCard title="Editar Usuario">
        <FormUSer/>
      </UiParentCard>
    </v-col>
  </v-row>
</template>

