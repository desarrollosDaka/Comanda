<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import img from '@/assets/images/info2.svg';

// component content
const page = ref({ title: 'Información' });
const breadcrumbs = ref([
  {
    title: 'SGI',
    disabled: true,
    href: '#'
  }
]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="12">
          <UiParentCard title="Gestor de documentos">
            <p>
                ¡Bienvenidos a la aplicación <span class="azul">Gestor de Documentos (SGI)</span> de <span class="amarillo">Tiendas Daka!</span> Esta aplicación ha 
                sido diseñada para facilitar el acceso a todos los documentos importantes de nuestra empresa. 
                Con SGI, podrás visualizar y descargar una amplia variedad de documentos en formato PDF, imágenes 
                y videos informativos. Nuestro objetivo es proporcionarte una plataforma eficiente y fácil de usar 
                que te permita tener a tu alcance toda la información que necesitas. Ya sea que estés buscando 
                políticas de la empresa, manuales de formación o actualizaciones de noticias, SGI tiene todo cubierto. 
                ¡Esperamos que disfrutes de la experiencia y encuentres nuestra aplicación útil e informativa!
            </p>
            <router-link to="documentacionDaka"><span class="azul">Ir a Mapa de Procesos</span></router-link>
            <div class="container">
                <img class="imagen" :src="img" alt="imagen ilustra">
            </div>
          </UiParentCard>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<style scoped>
.azul{
    color: #1982c4;
    font-weight: 700;
}
.amarillo{
    color: #fdc500;
    font-weight: 700;
}

.imagen{
    width: 700px;
    max-width: 100%;
    margin-left: 0 auto;
    margin-right: 0 auto;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
