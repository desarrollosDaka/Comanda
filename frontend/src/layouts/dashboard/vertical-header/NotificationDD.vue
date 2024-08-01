<script setup lang="ts">
import { ref } from 'vue';
// icons
import { CheckCircleOutlined, GiftOutlined, MessageOutlined, SettingOutlined, BellOutlined } from '@ant-design/icons-vue';

const isActive = ref(true);

function deactivateItem() {
  isActive.value = false;
}

</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- NOTIFICACIONES DE LA APLICACION -->
  <!-- ---------------------------------------------- -->

  <v-menu :close-on-content-click="false" offset="6, 0">
    <template v-slot:activator="{ props }">
      <v-btn icon class="text-secondary ml-sm-2 ml-1" color="darkText" rounded="sm" size="small" v-bind="props">
        <v-badge :content="isActive ? '2' : '0'" color="primary" offset-x="-4" offset-y="-5">
          <BellOutlined :style="{ fontSize: '22px' }" />
        </v-badge>
      </v-btn>
    </template>
    <v-sheet rounded="md" width="387" class="notification-dropdown">
      <div class="pa-4">
        <div class="d-flex align-center justify-space-between">
          <h6 class="text-subtitle-1 mb-0">Notificaciones</h6>
          <v-btn
            variant="text"
            color="success"
            icon
            rounded
            size="small"
            @click="deactivateItem()"
            :class="isActive ? 'd-block' : 'd-none'"
          >
            <CheckCircleOutlined :style="{ fontSize: '16px' }" />
            <v-tooltip aria-label="tooltip" activator="parent" location="bottom" :content-class="isActive ? 'custom-tooltip' : 'd-none'">
              <span class="text-caption">Mark as all read</span>
            </v-tooltip>
          </v-btn>
        </div>
      </div>

      <v-divider></v-divider>
      <perfect-scrollbar style="height: calc(100vh - 300px); max-height: 265px">
        <v-list class="py-0" lines="two" aria-label="notification list" aria-busy="true">

          <v-list-item value="1" color="secondary" class="no-spacer py-1">
            <template v-slot:prepend>
              <v-avatar size="36" variant="flat" color="lightsuccess" class="mr-3 py-2 text-success">
                <GiftOutlined />
              </v-avatar>

            </template>
            <div class="d-inline-flex justify-space-between w-100">
              <h6 class="text-subtitle-1 font-weight-regular mb-0">
              <span style="font-weight: 600">Daniel Gonzalez</span> Ha creado un nuevo documento.
              </h6>
              <span class="text-caption">3:00 PM</span>
            </div>
            <p class="text-caption text-medium-emphasis my-0">Hace 2 min</p>
          </v-list-item>

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
  > .v-overlay__content.custom-tooltip {
    padding: 2px 6px;
  }
}
</style>
