<script setup lang="ts">
import { useCustomizerStore } from '../../../stores/customizer';
// icons
import { MenuFoldOutlined, SearchOutlined, GithubOutlined } from '@ant-design/icons-vue';

// dropdown imports
import NotificationDD from './NotificationDD.vue';
import Searchbar from './SearchBarPanel.vue';
import ProfileDD from './ProfileDD.vue';
import Sucursales from './Sucursales.vue';
import { onMounted, ref } from 'vue';

import { io } from "socket.io-client";
const baseUrlBack = `${import.meta.env.VITE_BACK_URL}`;
const socket = io('ws://localhost:3003'); // ws

// pinia 
import { useAuthStore } from '../../../stores/auth';
import { useNotifyStore } from '../../../stores/notify';

const customizer = useCustomizerStore();
const auth = useAuthStore();
const noti = useNotifyStore();
const User = ref('');

// onMounted(()=> {
//   console.log("verticalHeader");
// })

const jsonFromLocalStorage = sessionStorage.getItem('user');
if (jsonFromLocalStorage !== null) {
  const parsedData = JSON.parse(jsonFromLocalStorage);
  User.value = parsedData.data.Nombre;
}

// socket io
// socket.on('lol', () => {
//   console.log('estoy funcionando...lol');
// })

// A la escucha 
// socket.on('nuevaComanda', (datos) => {
//   console.log('datos recibidos: ', datos);
// });
// powerby alice

setInterval(() => {
  socket.emit('getUser', auth.user.data);
}, 5000);

socket.on('notifications', (notificaciones) => {
  noti.update(notificaciones);
});
</script>

<template>
  <v-app-bar elevation="0" height="60">
    <v-btn class="hidden-md-and-down text-secondary mr-3" color="darkText" icon rounded="sm" variant="text"
      @click.stop="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)" size="small">
      <MenuFoldOutlined :style="{ fontSize: '16px' }" />
    </v-btn>
    <v-btn class="hidden-lg-and-up text-secondary ms-3" color="darkText" icon rounded="sm" variant="text"
      @click.stop="customizer.SET_SIDEBAR_DRAWER" size="small">
      <MenuFoldOutlined :style="{ fontSize: '16px' }" />
    </v-btn>

    <!-- search mobile -->
    <v-menu :close-on-content-click="false" class="hidden-lg-and-up" offset="10, 0">
      <template v-slot:activator="{ props }">

        <v-btn class="hidden-lg-and-up text-secondary ml-1" color="lightsecondary" icon rounded="sm" variant="flat"
          size="small" v-bind="props">
          <SearchOutlined :style="{ fontSize: '17px' }" />
        </v-btn>

      </template>
      <v-sheet class="search-sheet v-col-12 pa-0" width="320">

        <v-text-field persistent-placeholder placeholder="Search here.." color="primary" variant="solo" hide-details>
          <template v-slot:prepend-inner>
            <SearchOutlined :style="{ fontSize: '17px' }" />
          </template>
        </v-text-field>

      </v-sheet>
    </v-menu>
    <!-- ---------------------------------------------- -->
    <!-- Search part -->
    <!-- ---------------------------------------------- -->
    <v-sheet class="d-none d-lg-block" width="250">
      <Sucursales />
    </v-sheet>

    <!---/Search part -->

    <v-spacer />

    <!-- Notification -->
    <NotificationDD />

    <!-- ---------------------------------------------- -->
    <!-- User Profile -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false" offset="8, 0">
      <template v-slot:activator="{ props }">
        <v-btn class="profileBtn" variant="text" rounded="sm" v-bind="props">
          <div class="d-flex align-center">
            <v-avatar class="mr-sm-2 mr-0 py-2">
              <img src="@/assets/images/users/avatar-1.png" alt="Julia" />
            </v-avatar>
            <h6 class="text-subtitle-1 mb-0 d-sm-block d-none">{{ User }}</h6>
          </div>
        </v-btn>
      </template>
      <v-sheet rounded="md" width="290">
        <ProfileDD />
      </v-sheet>
    </v-menu>
  </v-app-bar>
</template>
