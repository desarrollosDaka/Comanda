<script setup lang="ts">
import { reactive , ref, onMounted } from 'vue';
import UiTitleCard from '@/components/shared/UiTitleCard.vue';
import Swal from 'sweetalert2'
import axios from 'axios';


const infoProduct = ref();
const loadingInfo = ref(false);
const baseUrl = `http://localhost:3002/api/product`;


const increment = (item: any) => {
    item.order++;
};

const decrement = (item: any) => {
  if (item.order > 1) {
    item.order--;
  }
};
// const getOrders = async () => {
//     loadingInfo.value = true
//     try{
//         const url = `${baseUrl}/masterOrder`
//         const {data} = await axios.get(url);
//         info.value =  data[0]
//     } catch(error){
//         console.log(error)
//     }
//     loadingInfo.value = false
// }

interface Product {
  Producto: string;
  ID_producto: string;
}

const getProduct = async () => {
  try{
    const url = `${baseUrl}/replicaProduct`
    const {data} = await axios.get(url);

    infoProduct.value =  data.map((product: Product) => ({
            title: product.Producto,
            value: product.ID_producto
        }));
  } catch(error){
      console.log(error)
  }
}

onMounted( async () => {
    await getProduct();
});
const projects = reactive ([
  {
    number: 'MICROONDA 1.4 PIE ACERO INOX. C/NEGRO MS402MADXBB SAMSUNG',
    name: 'LB-00000001',
    order: 1,
    amount: '160',
    priority: '160'
  }
]);
</script>

<template>
    <v-row class="mb-0">
        <v-col cols="12" md="6">
            <v-autocomplete
            density="compact"
            label="Buscar Articulo"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            color="primary"
            :items="infoProduct"
            flat 
            hide-details
            single-line
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="3" class="py-3">
            <v-btn
                color="primary"
                append-icon="mdi-arrow-down"
                variant="tonal">
                    AGREGAR
            </v-btn>
        </v-col>
    </v-row>
    <!-- TABLA -->
    <v-row class="mb-0">
    <!-- TABLA -->
        <v-col cols="12" md="9">
            <UiTitleCard title="Articulos" class-name="px-0 pb-0" >
                <v-table class="bordered-table" hover density="comfortable" rounded="lg" variant="flat">
                    <thead>
                        <tr class="bg-containerBg">
                            <th class="text-left text-caption font-weight-bold text-uppercase">Producto</th>
                            <th class="text-left text-caption font-weight-bold text-uppercase">SKU</th>
                            <th class="text-right text-caption font-weight-bold text-uppercase" style="min-width: 100px">Cantidad</th>
                            <th class="text-left text-caption font-weight-bold text-uppercase">Precio</th>
                            <th class="text-right text-caption font-weight-bold text-uppercase">Sub Total</th>
                            <th class="text-right text-caption font-weight-bold text-uppercase"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in projects" :key="item.name">
                        <td class="py-3">
                            <router-link to="/dashboard/default" class="text-secondary link-hover">{{ item.number }}</router-link>
                        </td>
                        <td class="py-3">{{ item.name }}</td>
                        <td class="py-3 text-right" style="min-width: 100px">
                            <button class="botonCantidad"  @click="decrement(item)" :disabled="item.order === 1" >-</button>
                                <span>{{ item.order }}</span>
                            <button class="botonCantidad" @click="increment(item)"> +</button>
                        </td>
                        <td class="py-3">
                            {{ item.priority }}$
                        </td>
                        <td class="py-3 text-right" style="min-width: 100px">{{ item.amount }}$</td>
                        <td class="py-3 text-right" style="min-width: 100px"><v-icon color="inputBorder" style="cursor: pointer" icon="mdi-trash-can"></v-icon></td>
                        </tr>
                    </tbody>
                </v-table>
            </UiTitleCard> 
        </v-col>

    <!-- ANALITICA -->
        <v-col cols="12" md="3" class="py-12">
                <v-card title="RESUMEN" text="Total a pagar:1800$" variant="flat">
                <v-card-actions>
                    <v-btn
                        color="warning"
                        variant="tonal">
                            AGREGAR ARTICULOS 
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<style scoped>
.botonCantidad{
    padding: 6px;
    font-size: 19px;
    font-weight: 900;
    color: #003f88;
}
</style>
