<script setup lang="ts">
import Logo from '@/layouts/dashboard/logo/LogoDark.vue';
import AuthLogin from '../authForms/AuthLogin.vue';
import AuthFooter from './AuthFooter.vue';
</script>

<template >
  <v-row class="bg-containerBg position-relative background" no-gutters>
    <!-- <div class="blur-logo">
      <Logo />
    </div> -->
    <v-col cols="12">
      
    </v-col>
    <!---Login Part-->
    <v-col cols="12" lg="12" class="d-flex align-center">
      <v-container>
        <div class="d-flex align-center justify-center" style="min-height: calc(100vh - 148px)">
          <v-row justify="center">
            <v-col cols="12" md="12">
              <v-card elevation="0" class="loginBox">
                <v-card elevation="24">
                  <v-card-text class="pa-sm-10 pa-6">
                    <!---Login Form-->
                    <AuthLogin />
                    <!---Login Form-->
                  </v-card-text>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
    <!---Login Part-->
    <v-col cols="12">
      <v-container class="pt-0 pb-6">
        <AuthFooter />
      </v-container>
    </v-col>
  </v-row>
</template>
<style lang="scss">
.loginBox {
  max-width: 475px;
  margin: 0 auto;
}

.blur-logo {
  position: absolute;
  filter: blur(18px);
  bottom: 0;
  transform: inherit;
}

.background{
  background-color:hsla(224,100%,50%,1);
background-image:
radial-gradient(at 40% 20%, rgb(21, 5, 233) 0px, transparent 50%),
radial-gradient(at 58% 0%, rgb(255, 203, 31) 0px, transparent 50%),
radial-gradient(at 0% 50%, rgb(30, 6, 243) 0px, transparent 50%),
radial-gradient(at 0% 100%, rgb(3, 49, 255) 0px, transparent 50%),
radial-gradient(at 80% 100%, rgb(206, 209, 13) 0px, transparent 50%),
radial-gradient(at 19% 0%, rgb(20, 3, 255) 0px, transparent 50%);
}

</style>
