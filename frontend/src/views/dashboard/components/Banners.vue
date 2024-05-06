<script setup lang="ts">
import { computed, shallowRef, ref } from 'vue';
import { useTheme } from 'vuetify';
import { getLightBorder } from './UpdateColors';
import UiTitleCard from '@/components/shared/UiTitleCard.vue';

const theme = useTheme();
const WarningColor = theme.current.value.colors.warning;

const user = ref()

// Localstorage
const jsonFromLocalStorage = sessionStorage.getItem('user');
if (jsonFromLocalStorage !== null) {
  const parsedData = JSON.parse(jsonFromLocalStorage);
  user.value = parsedData.data.Nombre;
} 


</script>

<template>
  <!-- BANNERS -->
    <div class="contenedorBanner">
        <aside class="responsive-banner">
            <div class="container-envelope">
                <div class="description">   
                    <h1>Bienvenido {{ user }}</h1>
                    <p>Explora la aplicacion Comanda online de tiendas daka.
                    </p>
                    <router-link to="PageInfo">
                        <v-btn 
                        color="lightsecondary"
                        variant="outlined"
                        append-icon="mdi-arrow-right">
                        Mas Información
                    </v-btn>
                    </router-link>
                </div>
                <div class="imgBanner">
                    <img src="../../../assets/images/logos/banner-logo2.png" alt="Banner Image">
                </div>
            </div>
        </aside>
    </div>
</template>

<style scoped>
    .responsive-banner {
    margin: 15px auto;
    width: 100%;
    position: relative;
    height: auto;
    min-height: 300px;
    max-height: 500px;
    border-radius: 10px;
    overflow: hidden;
    background-image: linear-gradient(to right, #001fac, #eee8e8);
}

.container-envelope {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    color: #fff;
}

.description{
    padding: 5rem;
}
.description h1{
    margin-bottom:10px;
    font-size: 30px;
    font-weight: 600;
}
.description p{
    margin-bottom:20px;
}

.imgBanner{
    position: relative;
    margin-left: 100px;
}
.imgBanner img{
    margin-top: 30px;
    margin-left: 50px;
    max-width: 330px;
    width: 230px;
    position: relative;
}

</style>
