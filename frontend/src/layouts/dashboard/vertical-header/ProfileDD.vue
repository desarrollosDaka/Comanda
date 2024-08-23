<script setup lang="ts">
import { ref } from 'vue';
// icons
import {
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
import { useAuthStore } from '@/stores/auth';

const tab = ref(null);
const authStore = useAuthStore();
const User = ref('');
const Email = ref('');

const jsonFromLocalStorage = sessionStorage.getItem('user');
if (jsonFromLocalStorage !== null) {
  const parsedData = JSON.parse(jsonFromLocalStorage);
  User.value = parsedData.data.Nombre;
  Email.value = parsedData.data.Email;
} 

</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- PERFIL -->
  <!-- ---------------------------------------------- -->
  <div>
    <div class="d-flex align-center pa-5">
      
      <v-avatar size="32" class="mr-2">
        <img src="@/assets/images/users/avatar-1.png" width="32" alt="Julia" />
      </v-avatar>

      <div>
        <h6 class="text-h6 mb-0">{{ User }}</h6>
        <p class="text-caption mb-0">{{ Email }}</p>
      </div>

      <div class="ml-auto">
        <v-btn variant="text" color="primary" rounded="sm" icon size="large" @click="authStore.logout()">
          <LogoutOutlined :style="{ fontSize: '20px' }" />
        </v-btn>
      </div>

    </div>

    <v-tabs v-model="tab" color="primary" grow disabled>
      <v-tab value="111"> <SettingOutlined class="v-icon--start" /></v-tab>
    </v-tabs>

    <perfect-scrollbar style="height: calc(68vh - 300px); max-height: 240px">
      <v-window v-model="tab">
        <v-window-item value="111">

          <v-list class="py-0" aria-label="profile list" aria-busy="true">

            <v-list-item @click="authStore.logout()" color="secondary" rounded="0">
              <template v-slot:prepend>
                <LogoutOutlined :style="{ fontSize: '18px' }" class="mr-4" />
              </template>
              <v-list-item-title class="text-subtitle-2"> Cerrar Sesion</v-list-item-title>
            </v-list-item>

          </v-list>

        </v-window-item>
      </v-window>
    </perfect-scrollbar>

  </div>
</template>
