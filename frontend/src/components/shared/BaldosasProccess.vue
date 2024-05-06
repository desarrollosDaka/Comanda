<script setup lang="ts">
import { shallowRef } from 'vue';

// icons
import { RiseOutlined, FallOutlined } from '@ant-design/icons-vue';

const fivecards = shallowRef([
  {
    name: 'Platilla',
    earn: 'Maestro de codificacion',
    percent: '',
    color: 'primary',
    icon: RiseOutlined,
    text: '35,000'
  },
  {
    name: '#reportes',
    earn: 'Reporteria y Tableros',
    percent: '',
    color: 'success',
    icon: RiseOutlined,
    text: '8,900'
  },
  {
    name: '#configuraciones',
    earn: 'Gestionar Notificaciones',
    percent: '',
    color: 'warning',
    icon: FallOutlined,
    text: '1,943'
  },
  {
    name: '#Documentos',
    earn: 'Documentos de Tiendas Daka',
    percent: '',
    color: 'error',
    icon: FallOutlined,
    text: '$20,395'
  }
]);
</script>
<template>
  <!-- BALDOSAS PRINCIPAl -->
  <v-row class="my-0">
    <!-- CARD -->
    <v-col cols="12" sm="6" md="12" >
      <v-card elevation="0">
        <v-card variant="tonal" color="error" rounded="lg">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">
              <div>
                  <h6 class="text-h6 text-lightText mb-1"><i class="ri-git-merge-line iconoBaldosas"></i></h6>
                  <h4 class="text-h3 d-flex align-center mb-4">
                    Planificación Estratégica - PE
                  </h4>
                  <br>
                  <router-link to="/documentacionTypes/PE">
                    <v-btn variant="tonal" color="error" append-icon="mdi-arrow-right" size="small">Ver mas</v-btn>
                  </router-link>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
  <v-divider></v-divider>

  <br>
  <v-row class="my-0">
    <!-- CARD -->
    <v-col cols="12" sm="6" md="6" >
      <v-card elevation="0">
        <v-card variant="tonal" color="primary" rounded="lg">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">

              <div>
                <h6 class="text-h6 text-lightText mb-1"><i class="ri-shopping-bag-line iconoBaldosas"></i></h6>
                <h4 class="text-h3 d-flex align-center mb-0">
                  Compra de Mercancia - CM
                </h4>
                <br>
                <router-link to="/documentacionTypes/CM">
                  <v-btn variant="tonal" append-icon="mdi-arrow-right" size="small">Ver mas</v-btn> 
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
                <h6 class="text-h6 text-lightText mb-1"><i class="ri-community-line iconoBaldosas"></i></h6>
                <h4 class="text-h3 d-flex align-center mb-0">
                  Logistica y Distribucion - LD
                </h4>
                <br>
                <router-link to="/documentacionTypes/LD">
                  <v-btn variant="tonal" append-icon="mdi-arrow-right" size="small">Ver mas</v-btn>
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
                <h6 class="text-h6 text-lightText mb-1"><i class="ri-shopping-cart-2-line iconoBaldosas"></i></h6>
                <h4 class="text-h3 d-flex align-center mb-0">
                  Ventas - VE
                </h4>
                <br>
                <router-link to="/documentacionTypes/VE">
                  <v-btn variant="tonal" append-icon="mdi-arrow-right" size="small">Ver mas</v-btn>
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
                <h6 class="text-h6 text-lightText mb-1"><i class="ri-store-line iconoBaldosas"></i></h6>
                <h4 class="text-h3 d-flex align-center mb-0">
                  Post-venta - PV
                </h4>
                <br>
                <router-link to="/documentacionTypes/PV">
                  <v-btn variant="tonal" append-icon="mdi-arrow-right" size="small">Ver mas</v-btn>
                </router-link>
          
              </div>
              
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>
    
  </v-row>
  
  <v-divider></v-divider>
  <br>
  <h3>Apoyo</h3>
  <v-row class="my-0">
    <!-- CARD -->
    <v-col cols="12" sm="6" md="4" >
      <v-card elevation="0">
        <v-card variant="tonal" color="success" rounded="lg">
          <v-card-text>

            <div class="d-flex align-items-center justify-space-between">

              <div>

                <h6 class="text-h6 text-lightText mb-1"><i class="ri-git-merge-line iconoBaldosas"></i></h6>

                <h4 class="text-h3 d-flex align-center mb-0">
                  Tecnologia - TE
                </h4>

                <br>

                <router-link to="/documentacionTypes/TE">
                  <v-btn variant="tonal" color="success" append-icon="mdi-arrow-right" size="small">Ver mas</v-btn>
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
        <v-card variant="tonal" color="success" rounded="lg">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">

              <div>
                <h6 class="text-h6 text-lightText mb-1"><i class="ri-folder-chart-line iconoBaldosas"></i></h6>
                <h4 class="text-h3 d-flex align-center mb-0">
                  Seguridad - SF
                </h4>
                <br>
                <router-link to="/documentacionTypes/SF">
                  <v-btn variant="tonal" color="success" append-icon="mdi-arrow-right" size="small">Ver mas</v-btn>
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
        <v-card variant="tonal" color="success" rounded="lg">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">

              <div>
                <h6 class="text-h6 text-lightText mb-1"><i class="ri-settings-2-line iconoBaldosas"></i></h6>
                <h4 class="text-h3 d-flex align-center mb-0">
                  Comercial - CS
                </h4>
                <br>
                <router-link to="/documentacionTypes/CS">
                  <v-btn variant="tonal" color="success" append-icon="mdi-arrow-right" size="small">Ver mas</v-btn>
                </router-link>
          
              </div>
              
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>

    <!-- CARD -->
    <v-col cols="12" sm="6" md="3" >
      <v-card elevation="0">
        <v-card variant="tonal" color="success" rounded="lg">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">

              <div>
                <h6 class="text-h6 text-lightText mb-1"><i class="ri-shapes-line iconoBaldosas"></i></h6>
                <h4 class="text-h3 d-flex align-center mb-0">
                  Mercadeo - ME
                </h4>
                <br>
                <router-link to="/documentacionTypes/ME">
                  <v-btn variant="tonal" color="success" append-icon="mdi-arrow-right" size="small">Ver mas</v-btn>
                </router-link>
          
              </div>
              
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>

    <!-- CARD -->
    <v-col cols="12" sm="6" md="3" >
      <v-card elevation="0">
        <v-card variant="tonal" color="success" rounded="lg">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">

              <div>
                <h6 class="text-h6 text-lightText mb-1"><i class="ri-git-merge-line iconoBaldosas"></i></h6>
                <h4 class="text-h3 d-flex align-center mb-0">
                  Finanzas - AF
                </h4>
                <br>
                <router-link to="/documentacionTypes/AF">
                  <v-btn variant="tonal" color="success" append-icon="mdi-arrow-right" size="small">Ver mas</v-btn>
                </router-link>
          
              </div>
              
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>

    <!-- CARD -->
    <v-col cols="12" sm="6" md="3" >
      <v-card elevation="0">
        <v-card variant="tonal" color="success" rounded="lg">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">

              <div>
                <h6 class="text-h6 text-lightText mb-1"><i class="ri-folder-chart-line iconoBaldosas"></i></h6>
                <h4 class="text-h3 d-flex align-center mb-0">
                  Inventario - AI
                </h4>
                <br>
                <router-link to="/documentacionTypes/AI">
                  <v-btn variant="tonal" color="success" append-icon="mdi-arrow-right" size="small">Ver mas</v-btn>
                </router-link>
          
              </div>
              
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>

    <!-- CARD -->
    <v-col cols="12" sm="6" md="3" >
      <v-card elevation="0">
        <v-card variant="tonal" color="success" rounded="lg">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">

              <div>
                <h6 class="text-h6 text-lightText mb-1"><i class="ri-shapes-line iconoBaldosas"></i></h6>
                <h4 class="text-h3 d-flex align-center mb-0">
                  Auditoria - AU
                </h4>
                <br>
                <router-link to="/documentacionTypes/AU">
                  <v-btn variant="tonal" color="success" append-icon="mdi-arrow-right" size="small">Ver mas</v-btn>
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
        <v-card variant="tonal" color="success" rounded="lg">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">

              <div>
                <h6 class="text-h6 text-lightText mb-1"><i class="ri-settings-2-line iconoBaldosas"></i></h6>
                <h4 class="text-h3 d-flex align-center mb-0">
                  Logistia Inversa - LI
                </h4>
                <br>
                <router-link to="/documentacionTypes/LI">
                  <v-btn variant="tonal" color="success" append-icon="mdi-arrow-right" size="small">Ver mas</v-btn>
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
        <v-card variant="tonal" color="success" rounded="lg">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">

              <div>
                <h6 class="text-h6 text-lightText mb-1"><i class="ri-shapes-line iconoBaldosas"></i></h6>
                <h4 class="text-h3 d-flex align-center mb-0">
                  RRHH - GH
                </h4>
                <br>
                <router-link to="/documentacionTypes/GH">
                  <v-btn variant="tonal" color="success" append-icon="mdi-arrow-right" size="small">Ver mas</v-btn>
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
        <v-card variant="tonal" color="success" rounded="lg">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">

              <div>
                <h6 class="text-h6 text-lightText mb-1"><i class="ri-shapes-line iconoBaldosas"></i></h6>
                <h4 class="text-h3 d-flex align-center mb-0">
                  Calidad - CA
                </h4>
                <br>
                <router-link to="/documentacionTypes/CA">
                  <v-btn 
                    variant="tonal" 
                    color="success" 
                    append-icon="mdi-arrow-right" 
                    size="small">
                      Ver mas
                  </v-btn>
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
