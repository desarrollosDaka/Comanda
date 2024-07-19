<script setup lang="ts">
import { shallowRef } from 'vue';
import { useCustomizerStore } from '../../../stores/customizer';
import sidebarItems from './sidebarItemAdministrators';
import sidebarItemsRol from './sidebarItemGroup_1';
import sidebarItemsGerente from './sidebartItemManagers';
import { ref } from 'vue';

import NavGroup from './NavGroup/NavGroup.vue';
import NavItem from './NavItem/NavItem.vue';
import NavCollapse from './NavCollapse/NavCollapse.vue';
import Logo from '../logo/LogoDark.vue';

const customizer = useCustomizerStore();
const sidebarMenu = shallowRef(sidebarItems);
const sidebarMenuUSer = shallowRef(sidebarItemsRol);

const User = ref('');
const Rol = ref<number>(0)

const ADVISORS_STORERS_CASHIER = [1,5,6,7,8,9] //rol asesores, almacenistas, cajeras
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
    <div class="pa-5">
      <Logo />
    </div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <perfect-scrollbar class="scrollnavbar">

       <!-- ADMINISTRADORES-->

      <v-list aria-busy="true" aria-label="menu list" v-if="Rol === 99">
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

      <!-- ASESORES ALMACENISTAS Y CAJERAS-->

        <v-list aria-busy="true" aria-label="menu list" v-if="ADVISORS_STORERS_CASHIER.includes(Rol)">
        <!---Menu Loop -->
        <template v-for="(item, i) in sidebarMenuUSer" :key="i">
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
        <template v-for="(item, i) in sidebarItemsGerente" :key="i">
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
