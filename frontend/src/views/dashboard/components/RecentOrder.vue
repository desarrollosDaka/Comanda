<script setup lang="ts">
import { shallowRef } from 'vue';

import UiTitleCard from '@/components/shared/UiTitleCard.vue';

const projects = shallowRef([
{
    number: '1123123123',
    order: 'comanda',
    name: 'Daniel Gonzalez',
    amount: '20/02/2024',
    priority: 'Aprobado'
  },
  {
    number: '112312sdf23',
    order: 'Tecnologia',
    name: 'Johanna Perez',
    amount: '20/02/2024',
    priority: 'Pendiente'
  },
  {
    number: '11231231234',
    order: 'Operaciones',
    name: 'Christian Romero',
    amount: '20/02/2024',
    priority: 'Error'
  },
  {
    number: '11231223213',
    order: 'ATC',
    name: 'ATENCION AL CLIENTE',
    amount: '20/02/2024',
    priority: 'Pendiente'
  },
  {
    number: '1123123123',
    order: 'Ventas',
    name: 'COMPRAS EN $',
    amount: '20/02/2024',
    priority: 'Aprobado'
  },
  {
    number: '1123123123',
    order: 'Operaciones',
    name: 'ALMACEN CDD',
    amount: '20/02/2024',
    priority: 'Error'
  },
  {
    number: '1123123123',
    order: 'Control y Gestion',
    name: 'TESTING DE APLICATIVOS',
    amount: '20/02/2024',
    priority: 'Aprobado'
  },
  {
    number: '1123123123',
    order: 'RRSS',
    name: 'SOLICITUD DE PRESTAMO',
    amount: '20/02/2024',
    priority: 'Error'
  },
  {
    number: '1123123123',
    order: 'RRSS',
    name: 'SOLICITUD DE DIA LIBRE',
    amount: '20/02/2024',
    priority: 'Aprobado'
  },
]);
</script>

<template>
  <!-- TABLA -->
  <UiTitleCard title="Maestro de Codificación" class-name="px-0 pb-0" >
    <v-table class="bordered-table" hover density="comfortable" rounded="lg">
      <thead class="bg-containerBg">
        <tr>
          <th class="text-left text-caption font-weight-bold text-uppercase">Comanda</th>
          <th class="text-left text-caption font-weight-bold text-uppercase">Nombre</th>
          <th class="text-right text-caption font-weight-bold text-uppercase" style="min-width: 100px">Codigo</th>
          <th class="text-left text-caption font-weight-bold text-uppercase">Status</th>
          <th class="text-right text-caption font-weight-bold text-uppercase">Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in projects" :key="item.name">
          <td class="py-3">
            <router-link to="/dashboard/default" class="text-secondary link-hover">{{ item.number }}</router-link>
          </td>
          <td class="py-3">{{ item.name }}</td>
          <td class="py-3 text-right" style="min-width: 100px">{{ item.order }}</td>
          <td class="py-3">
            <v-chip variant="tonal" color="error" size="x-small" prepend-icon="mdi-alert-circle-outline" v-if="item.priority === 'Error'">
              <p class="mb-0">Reprobado</p>
            </v-chip>
            <v-chip variant="tonal" color="success" size="x-small" prepend-icon="mdi-check" v-else-if="item.priority === 'Aprobado'">
              <p class=" mb-0">Aprobado</p>
            </v-chip>
            <v-chip variant="tonal" color="warning" size="x-small" prepend-icon="mdi-timer-sand" v-else>
              <p class="mb-0">Pendiente</p>
            </v-chip>
          </td>
          <td class="py-3 text-right" style="min-width: 100px">{{ item.amount }}</td>
        </tr>
      </tbody>
    </v-table>
  </UiTitleCard>
</template>
