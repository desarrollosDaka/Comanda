
<script setup lang="ts">
import { reactive, ref, onMounted, computed } from 'vue';
import UiTitleCard from '@/components/shared/UiTitleCard.vue';
import Swal from 'sweetalert2'
import axios from 'axios';
import { useRoute } from 'vue-router'
import { router } from '@/router';

const route = useRoute()

// CAPTURAMOS EL ID DE COMANDA
const id = ref() // id de la COMANDA
id.value = route.params.id


const baseUrl = `${import.meta.env.VITE_URL}/api/products`;
const baseUrlProducts = `${import.meta.env.VITE_URL}/api/orders`;

const getProduct = async () => {
    try {

        const url = `${baseUrl}/masterProducts`
        const { data } = await axios.get(url);
        infoProduct.value = data.map((product: Product) => ({
            title: product.Producto,
            value: product.ID_producto,
            precio: product.Precio
        }));
        
    } catch (error) {
        console.log(error)
    }
}

onMounted(async () => {
    await getProduct();
});


interface Product {
    Producto: string;
    ID_producto: string;
    Precio: number;
}

interface ListProduct {
    name: string;
    code: string;
    amount: number;
    price: number;
    subtotal: number;
}

const listProduct = ref<ListProduct[]>([])


const infoProduct = ref()
const product = ref([])


function addProduct(cod_product: any): void {

    const product = infoProduct.value.filter((data: { value: any; }) => data.value === cod_product);

    const newProduct: ListProduct = {
        name: product[0].title,
        code: product[0].value,
        amount: 1,
        price: product[0].precio,
        subtotal: product[0].precio


    }

    listProduct.value.push(newProduct)
}


function removeProduct(index: number): void {

    listProduct.value.splice(index, 1)
}


async function addProducts(json: any) {

    if(listProduct.value.length <= 0) return
    // Alerta
    Swal.fire({
        title: `Registro de Productos`,
        text: "¿Estas seguro de agregar los articulos?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, Guardar!",

    }).then((result) => {
        if (result.isConfirmed) {
            Created()
            Swal.fire({
                title: "Guardado!",
                text: "Datos guardados con exito!",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log('agregado y guardado')
                }
            });

        }
    });

}


async function Created() {


    listProduct.value.forEach(element => {

        const json = {

            Id_Comanda:id.value,
            id_producto:element.code,
            producto:element.name,
            unidades: element.amount,
            precio: element.price,
            subtotal: element.subtotal
        }

        console.log(json)
        try {
             axios.post(`${baseUrlProducts}/createOrderDetails`, json)
        } catch (error) {
            console.log(error)
        }

    });


    router.push(`/maestroPedidos/`); 
}


const increment = (item: any) => {
    item.amount++;
    item.subtotal = item.amount * item.price
};

const decrement = (item: any) => {
    if (item.amount > 1) {
        item.amount--;
        item.subtotal = item.amount * item.price
    }
};


const totalSubtotal = computed(() => {
    return listProduct.value.reduce((total, producto) => total + producto.subtotal, 0)
})


</script>

<template>
    <v-row class="mb-0">
        <v-col cols="12" md="6">
            <v-autocomplete density="compact" label="Buscar Articulo" prepend-inner-icon="mdi-magnify"
                variant="outlined" color="primary" v-model="product" :items="infoProduct" flat hide-details
                single-line></v-autocomplete>
        </v-col>
        <v-col cols="12" md="3" class="py-3">
            <v-btn color="primary" append-icon="mdi-arrow-down" @click="addProduct(product)" variant="tonal">
                AGREGAR
            </v-btn>
        </v-col>
    </v-row>
    <!-- TABLA -->
    <v-row class="mb-0">
        <!-- TABLA -->
        <v-col cols="12" md="9">
            <UiTitleCard title="Articulos" class-name="px-0 pb-0">
                <v-table class="bordered-table" hover density="comfortable" rounded="lg" variant="flat">
                    <thead>
                        <tr class="bg-containerBg">
                            <th class="text-left text-caption font-weight-bold text-uppercase">Producto</th>
                            <th class="text-left text-caption font-weight-bold text-uppercase">SKU</th>
                            <th class="text-right text-caption font-weight-bold text-uppercase"
                                style="min-width: 100px">Cantidad</th>
                            <th class="text-left text-caption font-weight-bold text-uppercase">Precio</th>
                            <th class="text-right text-caption font-weight-bold text-uppercase">Sub Total</th>
                            <th class="text-right text-caption font-weight-bold text-uppercase"></th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr v-for="(item, index) in listProduct" :key="index">
                            <td class="py-3">
                                <router-link to="/dashboard/default" class="text-secondary link-hover">{{ item.name
                                    }}</router-link>
                            </td>
                            <td class="py-3">{{ item.code }} </td>
                            <td class="py-3 text-right" style="min-width: 100px">
                                <button class="botonCantidad" @click="decrement(item)">-</button>
                                <span>{{ item.amount }}</span>
                                <button class="botonCantidad" @click="increment(item)"> +</button>
                            </td>
                            <td class="py-3">
                                {{ item.price }}$
                            </td>
                            <td class="py-3 text-right" style="min-width: 100px"> {{ item.subtotal }}$</td>
                            <td class="py-3 text-right" style="min-width: 100px" @click="removeProduct(index)"><v-icon
                                    color="inputBorder" style="cursor: pointer" icon="mdi-trash-can"></v-icon></td>
                        </tr>
                    </tbody>
                </v-table>
            </UiTitleCard>
        </v-col>

        <!-- ANALITICA -->
        <v-col cols="12" md="3" class="py-12">
            <v-card title="RESUMEN" :text="`Total a pagar: ${totalSubtotal}`" variant="flat">
                <v-card-actions>
                    <v-btn color="warning" variant="tonal" @click="addProducts">
                        AGREGAR ARTICULOS
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<style scoped>
.botonCantidad {
    padding: 6px;
    font-size: 19px;
    font-weight: 900;
    color: #003f88;
}
</style>