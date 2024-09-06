<script setup lang="ts">
import { shallowRef } from 'vue';
import { useCustomizerStore } from '../../../stores/customizer';

import sidebarItems from './sidebarItemAdministrators';
import sidebarItemsRol from './sidebarItemGroup_1';
import sidebarAsesorOnline from './sibedarItemAsesorOnline';

import sidebarItemsGerente from './sidebartItemManagers';
import sidebarEspecialistaCaja from './sidebarItemEspecialista';
import sidebarAlmacenista from './sidebarItemAlmacenista';
import sidebarATC from './sidebarItemATC';
import sidebarCDD from './sidebarItemCDD';
import sidebarCajeros from './sidebarItemCajero';
import sidebarATCOnline from './sidebarItemATCOnline';
import { ref } from 'vue';

import NavGroup from './NavGroup/NavGroup.vue';
import NavItem from './NavItem/NavItem.vue';
import NavCollapse from './NavCollapse/NavCollapse.vue';
import Logo from '../logo/LogoDark.vue';

const customizer = useCustomizerStore();
const sidebarMenuAdmin = shallowRef(sidebarItems);
const sidebarMenu = shallowRef(sidebarItemsRol);
const sidebarMenuAsesorOnline = shallowRef(sidebarAsesorOnline);
const sidebarMenuGerente = shallowRef(sidebarItemsGerente);
const sidebarMenuEspecialistaCaja = shallowRef(sidebarEspecialistaCaja);
const sidebarMenuAlmacenista = shallowRef(sidebarAlmacenista);
const sidebarMenuATC = shallowRef(sidebarATC);
const sidebarMenuCDD = shallowRef(sidebarCDD);
const sidebarMenuCajero = shallowRef(sidebarCajeros);
const sidebarMenuATCOnline = shallowRef(sidebarATCOnline);

const User = ref('');
const Rol = ref<number>(0)

const ADVISORS_STORERS_CASHIER = [5, 9] //rol asesores, almacenistas, cajeras
const MANAGERS = [4] //rol gerentes

const jsonFromLocalStorage = sessionStorage.getItem('user');
if (jsonFromLocalStorage !== null) {
  const parsedData = JSON.parse(jsonFromLocalStorage);
  User.value = parsedData.data.Nombre;
  Rol.value = +parsedData.data.ID_rol;
} 

</script>

<template>
  <v-navigation-drawer
    left
    v-model="customizer.Sidebar_drawer"
    elevation="0"
    rail-width="60"
    mobile-breakpoint="lg"
    app
    class="leftSidebar"
    :rail="customizer.mini_sidebar"
    expand-on-hover
  >
    <div class="logo-daka">
      <Logo />
    </div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <perfect-scrollbar class="scrollnavbar">

       <!-- ADMINISTRADORES-->
      <v-list aria-busy="true" aria-label="menu list" v-if="Rol === 99">
        <!---Menu Loop -->
        <template v-for="(item, i) in sidebarMenuAdmin" :key="i">
          <!---Item Sub Header -->
          <NavGroup :item="item" v-if="item.header" :key="item.title" />
          <!---Item Divider -->
          <v-divider class="my-3" v-else-if="item.divider" />
          <!---If Has Child -->
          <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
          <!---Single Item-->
          <NavItem :item="item" v-else />
          <!---End Single Item-->
        </template>
      </v-list>

      <!-- CAJERO -->
      <v-list aria-busy="true" aria-label="menu list" v-if="Rol === 6">
        <!---Menu Loop -->
        <template v-for="(item, i) in sidebarMenuCajero" :key="i">
          <!---Item Sub Header -->
          <NavGroup :item="item" v-if="item.header" :key="item.title" />
          <!---Item Divider -->
          <v-divider class="my-3" v-else-if="item.divider" />
          <!---If Has Child -->
          <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
          <!---Single Item-->
          <NavItem :item="item" v-else />
          <!---End Single Item-->
        </template>
      </v-list>

      <!-- ASESOR ONLINE -->
      <v-list aria-busy="true" aria-label="menu list" v-if="Rol === 1">
        <!---Menu Loop -->
        <template v-for="(item, i) in sidebarMenuAsesorOnline" :key="i">
          <!---Item Sub Header -->
          <NavGroup :item="item" v-if="item.header" :key="item.title" />
          <!---Item Divider -->
          <v-divider class="my-3" v-else-if="item.divider" />
          <!---If Has Child -->
          <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
          <!---Single Item-->
          <NavItem :item="item" v-else />
          <!---End Single Item-->
        </template>
      </v-list>

      <!-- ATC -->
      <v-list aria-busy="true" aria-label="menu list" v-if="Rol === 10">
        <!---Menu Loop -->
        <template v-for="(item, i) in sidebarMenuATC" :key="i">
          <!---Item Sub Header -->
          <NavGroup :item="item" v-if="item.header" :key="item.title" />
          <!---Item Divider -->
          <v-divider class="my-3" v-else-if="item.divider" />
          <!---If Has Child -->
          <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
          <!---Single Item-->
          <NavItem :item="item" v-else />
          <!---End Single Item-->
        </template>
      </v-list>

      <!-- CDD -->
      <v-list aria-busy="true" aria-label="menu list" v-if="Rol === 8">
        <!---Menu Loop -->
        <template v-for="(item, i) in sidebarMenuCDD" :key="i">
          <!---Item Sub Header -->
          <NavGroup :item="item" v-if="item.header" :key="item.title" />
          <!---Item Divider -->
          <v-divider class="my-3" v-else-if="item.divider" />
          <!---If Has Child -->
          <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
          <!---Single Item-->
          <NavItem :item="item" v-else />
          <!---End Single Item-->
        </template>
      </v-list>

      <!-- ESPECIALISTA CAJERA -->
      <v-list aria-busy="true" aria-label="menu list" v-if="Rol === 11">
        <!---Menu Loop -->
        <template v-for="(item, i) in sidebarMenuEspecialistaCaja" :key="i">
          <!---Item Sub Header -->
          <NavGroup :item="item" v-if="item.header" :key="item.title" />
          <!---Item Divider -->
          <v-divider class="my-3" v-else-if="item.divider" />
          <!---If Has Child -->
          <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
          <!---Single Item-->
          <NavItem :item="item" v-else />
          <!---End Single Item-->
        </template>
      </v-list>

      <!-- ALMACENISTA -->
      <v-list aria-busy="true" aria-label="menu list" v-if="Rol === 7">
        <!---Menu Loop -->
        <template v-for="(item, i) in sidebarMenuAlmacenista" :key="i">
          <!---Item Sub Header -->
          <NavGroup :item="item" v-if="item.header" :key="item.title" />
          <!---Item Divider -->
          <v-divider class="my-3" v-else-if="item.divider" />
          <!---If Has Child -->
          <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
          <!---Single Item-->
          <NavItem :item="item" v-else />
          <!---End Single Item-->
        </template>
      </v-list>

      <!-- ASESORES ALMACENISTAS Y CAJERAS-->
      <v-list aria-busy="true" aria-label="menu list" v-if="ADVISORS_STORERS_CASHIER.includes(Rol)">
        <!---Menu Loop -->
        <template v-for="(item, i) in sidebarMenu" :key="i">
          <!---Item Sub Header -->
          <NavGroup :item="item" v-if="item.header" :key="item.title" />
          <!---Item Divider -->
          <v-divider class="my-3" v-else-if="item.divider" />
          <!---If Has Child -->
          <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
          <!---Single Item-->
          <NavItem :item="item" v-else />
          <!---End Single Item-->
        </template>
      </v-list>

      <!-- GERENTES-->
      <v-list aria-busy="true" aria-label="menu list" v-if="MANAGERS.includes(Rol)">
        <!---Menu Loop -->
        <template v-for="(item, i) in sidebarMenuGerente" :key="i">
          <!---Item Sub Header -->
          <NavGroup :item="item" v-if="item.header" :key="item.title" />
          <!---Item Divider -->
          <v-divider class="my-3" v-else-if="item.divider" />
          <!---If Has Child -->
          <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
          <!---Single Item-->
          <NavItem :item="item" v-else />
          <!---End Single Item-->
        </template>
      </v-list>

      

      <!-- ATC ONLINE-->
      <v-list aria-busy="true" aria-label="menu list" v-if="Rol === 2">
        <!---Menu Loop -->
        <template v-for="(item, i) in sidebarMenuATCOnline" :key="i">
          <!---Item Sub Header -->
          <NavGroup :item="item" v-if="item.header" :key="item.title" />
          <!---Item Divider -->
          <v-divider class="my-3" v-else-if="item.divider" />
          <!---If Has Child -->
          <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
          <!---Single Item-->
          <NavItem :item="item" v-else />
          <!---End Single Item-->
        </template>
      </v-list>

    </perfect-scrollbar>
  </v-navigation-drawer>
  
</template>

<style scope>
.logo-daka{
  margin-left: 28px;
  padding: 25px;
}
</style>