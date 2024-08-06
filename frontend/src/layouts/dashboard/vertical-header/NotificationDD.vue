<script setup lang="ts">

import { io } from "socket.io-client";
const baseUrlBack = `${import.meta.env.VITE_BACK_URL}`;

import { onMounted, ref, watch } from 'vue';
import { useNotifyStore } from '@/stores/notify';
import Notify from '@/components/Notify.vue';

const localNotify = ref([]);
const localLenNotify = ref('');
////////////////////////
const socket = io(`${baseUrlBack}`, {
  reconnection: false, // Deshabilitar la reconexión automática
});
// icons
import { CheckCircleOutlined, GiftOutlined, MessageOutlined, SettingOutlined, BellOutlined } from '@ant-design/icons-vue';


const getNotify = async (state: any, idUser: string) => {
  await state.getNotificationsData(idUser);
};

const notification = (state: any) => {
  localNotify.value = state.notifications;
};

const lenNotify = (state: any) => {
  const len: string = state.countNotifications;
  localLenNotify.value = len;
};

// socket io
(async ()=> {
  const notifyStore = useNotifyStore();
  await notifyStore.socketNotify("10");
})();

onMounted(async () => {
  const notifyStore = useNotifyStore();
  await getNotify(notifyStore, "10");
  notification(notifyStore);
  lenNotify(notifyStore);

  console.log(localNotify.value);
  
});

const isActive = ref(true);
const info = ref<{ id: number, message: string }[]>([]);

/////////////////notifications /////////////////////
const PUBLIC_VAPID_KEY: string = "BChYwJmtdx1DnCyWvAImpEzQXmNnLQavrl1CtZxwwRlxhiq5F3Uj_AmqQUKH87H7QUd-dGfMAsMwR61vUhHwAOo";
const route1: string = `${import.meta.env.VITE_URL}/api`


function deactivateItem() {
  isActive.value = false;
}


const handleNewItem = () => {
  //console.log("Nuevo valor agregado:", newItem);
  console.log("handleNewItem called");
fetch(route1 + '/notification', {
  method: 'POST',
  body: JSON.stringify({ message: "NUEVO MENSAJE" }),
  headers: {
    'Content-Type': 'application/json'
  }
});  
};

// Listen for events from the server
socket.on('get-master-notify', (rta:any) => {
  console.log('Datos actualizados:', rta);
  if (Array.isArray(rta)) {
    info.value = rta[0];
    console.log(info.value);
  } else {
    console.error('La respuesta no es un array:', rta);
  }
});



let isFirstLoad = true;

watch(info, (newValue, oldValue) => {
  // if (isFirstLoad) {
  //   isFirstLoad = false;
  // } else if (newValue.length > oldValue.length) {
  //   handleNewItem();
  // }
  console.log("watch triggered", newValue, oldValue);
  if (newValue.length > oldValue.length) {
    handleNewItem();
  }
});


// Watch para localLenNotify
watch(localLenNotify, (newValue, oldValue) => {
  //console.log("localLenNotify changed", newValue, oldValue);
  if (newValue > oldValue) {
    //console.log("lenNotify ha crecido");
    //handleNewItem();
    // Aquí puedes agregar la lógica que necesites cuando lenNotify crezca
  }
});


</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- NOTIFICACIONES DE LA APLICACION -->
  <!-- ---------------------------------------------- -->

  <v-menu :close-on-content-click="false" offset="6, 0">
    <template v-slot:activator="{ props }">
      <v-btn icon class="text-secondary ml-sm-2 ml-1" color="darkText" rounded="sm" size="small" v-bind="props">

        <v-badge :content="isActive ? `${localLenNotify}` : '0'" color="primary" offset-x="-4" offset-y="-5">

          <BellOutlined :style="{ fontSize: '22px' }" />
        </v-badge>
      </v-btn>
    </template>
    <v-sheet rounded="md" width="387" class="notification-dropdown">
      <div class="pa-4">
        <div class="d-flex align-center justify-space-between">
          <h6 class="text-subtitle-1 mb-0">Notificaciones</h6>
          <v-btn variant="text" color="success" icon rounded size="small" @click="deactivateItem()"
            :class="isActive ? 'd-block' : 'd-none'">
            <CheckCircleOutlined :style="{ fontSize: '16px' }" />
            <v-tooltip aria-label="tooltip" activator="parent" location="bottom"
              :content-class="isActive ? 'custom-tooltip' : 'd-none'">
              <span class="text-caption">Mark as all read</span>
            </v-tooltip>
          </v-btn>
        </div>
      </div>

      <v-divider></v-divider>
      <perfect-scrollbar style="height: calc(100vh - 300px); max-height: 265px">
        <v-list class="py-0" lines="two" aria-label="notification list" aria-busy="true">

          <Notify v-for="notify in localNotify" :notifyData="notify" />

          <v-divider></v-divider>
        </v-list>
      </perfect-scrollbar>
      <v-divider></v-divider>
      <div class="pa-2 text-center">
        <v-btn color="primary" variant="text">View All</v-btn>
      </div>
    </v-sheet>
  </v-menu>
</template>



<style lang="scss">
.v-tooltip {
  >.v-overlay__content.custom-tooltip {
    padding: 2px 6px;
  }
}
</style>
