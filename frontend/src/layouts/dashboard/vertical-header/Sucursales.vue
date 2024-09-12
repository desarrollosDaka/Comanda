<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const id_sucursal = ref();
const info = ref() 
const baseUrl = `${import.meta.env.VITE_URL}/api/stores`;

// Localstorage
const jsonFromLocalStorage = sessionStorage.getItem('user');
if (jsonFromLocalStorage !== null) {
    const parsedData = JSON.parse(jsonFromLocalStorage);
    id_sucursal.value = parsedData.data.Id_sucursal;
}

const getStore = async () => {
  try{

    const url = `${baseUrl}/filterStores/${id_sucursal.value}`
    const {data} = await axios.get(url);
      info.value =  data[0][0].Sucursal
  } catch(error){
      console.log(error)
  }
}

onMounted( async () => {
    await getStore();
});

</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- Sucursales -->
    <!-- ---------------------------------------------- -->
    <v-chip class="ma-2" label>
        <v-icon color="warning" icon="mdi-map-marker-outline" start></v-icon>
            Sucursal: {{ info }}
    </v-chip>
</template>
