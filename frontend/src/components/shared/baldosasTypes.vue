<script setup lang="ts">
import { shallowRef } from 'vue';

// icons
import { RiseOutlined, FallOutlined } from '@ant-design/icons-vue';
import {  useRoute } from 'vue-router'
import {  ref } from 'vue'
const route = useRoute()


// URL
const proccess: any = ref('')
proccess.value = route.params.proccess

</script>
<template>
  <!-- BALDOSAS PRINCIPAl -->
  <v-row class="my-0">
    <!-- CARD -->
    <v-col cols="12" sm="6" md="4" >
      <v-card elevation="0">
        <v-card variant="tonal" color="primary" rounded="lg">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">
              <div>
                <h6 class="text-h6 text-lightText mb-1"><i class="ri-calendar-check-fill iconoBaldosas"></i></h6>
                <h4 class="text-h4 d-flex align-center mb-0">
                    Caracterizacion - C
                </h4>
                <br>
                <router-link :to="{path:`/plantillaDepartamento/${proccess}/C`}">
                  <v-btn variant="tonal" size="small">Ver mas</v-btn>
                </router-link>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>

    <!-- CARD -->
    <v-col cols="12" sm="6" md="4" >
      <v-card elevation="0">
        <v-card variant="tonal" color="primary" rounded="lg">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">
              <div>
                <h6 class="text-h6 text-lightText mb-1"><i class="ri-git-merge-line iconoBaldosas"></i></h6>
                <h4 class="text-h4 d-flex align-center mb-0">
                    Procedimientos - P  
                </h4>
                <br>
                <router-link :to="{path:`/plantillaDepartamento/${proccess}/P`}">
                  <v-btn variant="tonal" size="small">Ver mas</v-btn>
                </router-link>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>

    <!-- CARD -->
    <v-col cols="12" sm="6" md="4" >
      <v-card elevation="0">
        <v-card variant="tonal" color="primary" rounded="lg">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">
              <div>
                <h6 class="text-h6 text-lightText mb-1"><i class="ri-speak-line iconoBaldosas"></i></h6>
                <h4 class="text-h4 d-flex align-center mb-0">
                    Instrucción de Trabajo - I
                </h4>
                <br>
                <router-link :to="{path:`/plantillaDepartamento/${proccess}/I`}">
                  <v-btn variant="tonal" size="small">Ver mas</v-btn>
                </router-link>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>

    <!-- CARD -->
    <v-col cols="12" sm="6" md="6" >
      <v-card elevation="0">
        <v-card variant="tonal" color="primary" rounded="lg">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">
              <div>
                <h6 class="text-h6 text-lightText mb-1"><i class="ri-file-damage-line iconoBaldosas"></i></h6>
                <h4 class="text-h3 d-flex align-center mb-0">
                    Especificación - E
                </h4>
                <br>
                <router-link :to="{path:`/plantillaDepartamento/${proccess}/E`}">
                  <v-btn variant="tonal" size="small">Ver mas</v-btn>
                </router-link>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>

    <!-- CARD -->
    <v-col cols="12" sm="6" md="6" >
      <v-card elevation="0">
        <v-card variant="tonal" color="primary" rounded="lg">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">
              <div>
                <h6 class="text-h6 text-lightText mb-1"><i class="ri-pages-line iconoBaldosas"></i></h6>
                <h4 class="text-h3 d-flex align-center mb-0">
                  Formularios - F
                </h4>
                <br>
                <router-link :to="{path:`/plantillaDepartamento/${proccess}/F`}">
                  <v-btn variant="tonal" size="small">Ver mas</v-btn>
                </router-link>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>

    <!-- CARD -->
    <v-col cols="12" sm="6" md="6" >
      <v-card elevation="0">
        <v-card variant="tonal" color="primary" rounded="lg">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">
              <div>
                <h6 class="text-h6 text-lightText mb-1"><i class="ri-secure-payment-line iconoBaldosas"></i></h6>
                <h4 class="text-h3 d-flex align-center mb-0">
                   Políticas, Normas y Lineamientos - L
                </h4>
                <br>
                <router-link :to="{path:`/plantillaDepartamento/${proccess}/L`}">
                  <v-btn variant="tonal" size="small">Ver mas</v-btn>
                </router-link>  
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>

    <!-- CARD -->
    <v-col cols="12" sm="6" md="6" >
      <v-card elevation="0">
        <v-card variant="tonal" color="primary" rounded="lg">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">
              <div>
                <h6 class="text-h6 text-lightText mb-1"><i class="ri-vidicon-line iconoBaldosas"></i></h6>
                <h4 class="text-h3 d-flex align-center mb-0">
                   Herramientas Audiovisuales - H
                </h4>
                <br>
                <router-link :to="{path:`/plantillaDepartamento/${proccess}/H`}">
                  <v-btn variant="tonal" size="small">Ver mas</v-btn>
                </router-link>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>

  </v-row>

</template>

<style scoped>
  .iconoBaldosas{
    font-size: 30px;
    color: black;
  }
</style>
