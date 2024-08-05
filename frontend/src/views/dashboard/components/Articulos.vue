<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import UiTitleCard from '@/components/shared/UiTitleCard.vue';
import Swal from 'sweetalert2'
import axios from 'axios';
import { useRoute } from 'vue-router'
import { router } from '@/router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const baseUrl = `${import.meta.env.VITE_URL}/api/products`;
const baseUrlProducts = `${import.meta.env.VITE_URL}/api/orders`;
const route = useRoute()
const listProduct = ref<ListProduct[]>([])
const infoProduct = ref()
const product = ref([])

const loadingProducts = ref(false); 

const notify = () => {
    toast.info('Hello1!!');
    toast.error('Hello2!!');
    toast.success('Hello3!!');
    toast.success('Hello4!!', {
        theme: 'colored',
        position: toast.POSITION.TOP_LEFT,
    });
    toast.warn('Hello5!!', {
        position: toast.POSITION.TOP_LEFT,
    });
    toast.warn('Hello6!!', {
        theme: 'dark',
        position: toast.POSITION.TOP_LEFT,
    });
};

// CAPTURAMOS EL ID DE COMANDA /filterOrderDetails/:id
const id = ref() // id de la COMANDA
id.value = route.params.id

const update = ref() // modo Update
update.value = route.params.update

const isOrder = ref<boolean>(true)

const getProduct = async () => {
    try {
        loadingProducts.value = true; // Bloquear el botón al cargar productos
        const url = `${baseUrl}/masterProducts`
        const { data } = await axios.get(url);

        infoProduct.value = data[0].map((product: Product) => ({
            title: product.Producto,
            value: product.ID_producto,
            precio: product.Precio
        }));

    } catch (error) {
        toast.error("Ocurrio un error al consultar los datos de los productos", {
            position: toast.POSITION.TOP_CENTER,
            transition: toast.TRANSITIONS.ZOOM,
            autoClose: 4000,
            theme: 'colored',
            toastStyle: {
                fontSize: '16px',
                opacity: '1',
            },
        });
    } finally {
        loadingProducts.value = false;
    }
}

const getOrders = async () => {
    try {
        const url = `${baseUrlProducts}/filterOrder/${id.value}`
        const { data } = await axios.get(url);

        if (data[0].length <= 0) {

            toast.error("Error: La orden no a sido creada", {
                position: toast.POSITION.TOP_CENTER,
                transition: toast.TRANSITIONS.ZOOM,
                autoClose: 6000,
                theme: 'colored',
                toastStyle: {
                    fontSize: '16px',
                    opacity: '1',
                },
            });

            isOrder.value = false
            return
        }

    } catch (error) {
        console.error(error)
    }
}


onMounted(async () => {

    getOrders();
    if (update.value) handleProductUpdate();

    const toastLoading = toast.loading("Cargando Productos...", {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: 'colored',
        type: 'success',
        icon: 'info',
        toastStyle: {
            fontSize: '16px',
            opacity: '1',
        },
    });


    await getProduct();
    toast.remove(toastLoading)
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

function addProduct(cod_product: any): void {

    const product = infoProduct.value.filter((data: { value: any; }) => data.value === cod_product);
    const newProduct: ListProduct = {
        name: product[0].title,
        code: product[0].value,
        amount: 1,
        price: product[0].precio,
        subtotal: product[0].precio
    }

    // VERIFICO QUE NO SE DUPLIQUE EL PRODUCTO
    // const found = listProduct.value.find((product) => product.code === cod_product)

    // if (!found) listProduct.value.push(newProduct)
    listProduct.value.push(newProduct)
}

async function removeProduct(code: string, index: number) {

    listProduct.value.splice(index, 1)
    const data = {
        "ID_detalle": id.value,
        "ID_producto": code
    }

    if (update.value) {

        try {
            await axios.put(`${baseUrlProducts}/deleteOrderDetail/`, data)
        } catch (error) {
            console.error(error)
        }

    }
}

async function addProducts(json: any) {

    if (listProduct.value.length <= 0) return
    // Alerta
    Swal.fire({
        title: update.value ? 'Actualización de articulos' : 'Registro de articulos',
        text: update.value ? "¿Estas seguro de actualizar los articulos?" : "¿Estas seguro de agregar los articulos?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: update.value ? "Si, Actualizar!" : "Si, Guardar! ",

    }).then((result) => {
        if (result.isConfirmed) {
            Created()
            Swal.fire({
                title: "Guardado!",
                text: update.value ? "Datos actualizados con exito!" : "Datos guardados con exito!",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {

                    toast.info(update.value ? "Comanda actualizada" : "Comanda agregada", {
                        position: toast.POSITION.BOTTOM_CENTER,
                        transition: toast.TRANSITIONS.ZOOM,
                        autoClose: 2000,
                        theme: 'colored',
                        toastStyle: {
                            fontSize: '16px',
                            opacity: '1',
                        },
                    });
                }
            });

        }
    });

}

async function Created() {
    for (const element of listProduct.value) {

        const json = {
            Id_Comanda: id.value,
            id_producto: element.code,
            producto: element.name,
            unidades: element.amount,
            precio: element.price,
            subtotal: element.subtotal
        }

        try {
            await axios.post(`${baseUrlProducts}/createOrderDetails`, json)
        } catch (error) {
            console.error(error)
        }

    };
    back()
}

const amountInput = (item: any) => {
    item.subtotal = item.amount * item.price
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


const back = () => {
    router.push(`/maestroPedidos/`);
}


async function handleProductUpdate() {
    let articles

    // RECORRO LA DATA DE ARTICULOS PARA AGREGARLO AL OBJECTO DE ARTICULOS
    try {
        const url = `${baseUrlProducts}/filterOrderDetails/${id.value}`
        const { data } = await axios.get(url);
        articles = data[0]

    } catch (error) {
        toast.error("Error: no se agregaron los articulos", {
            position: toast.POSITION.TOP_CENTER,
            transition: toast.TRANSITIONS.ZOOM,
            autoClose: 6000,
            theme: 'colored',
            toastStyle: {
                fontSize: '16px',
                opacity: '1',
            },
        });
    }

    for (const element of articles) {

        const newProduct: ListProduct = {
            name: element.Producto,
            code: element.ID_producto,
            amount: element.Unidades,
            price: element.Precio,
            subtotal: element.Subtotal
        }
        listProduct.value.push(newProduct)
    };
}
</script>

<template>
    <v-row class="mb-0">
        <v-col cols="12" md="6">
            <v-autocomplete density="compact" label="Buscar Articulo" prepend-inner-icon="mdi-magnify"
                variant="outlined" color="blue-grey-lighten-2" item-title="value" v-model="product"
                :items="infoProduct"  :disabled="loadingProducts"
                >

                <template v-slot:item="{ props, item }">
                    <!-- GENERA ERROR EN LA TERMINAR, PERO NO EN CONSOLA -->
                    <v-list-item v-bind="props" :subtitle="item.raw.title"></v-list-item>
                </template>

            </v-autocomplete>

        </v-col>
        <v-col cols="12" md="3" class="py-3">
            <v-btn color="primary" append-icon="mdi-arrow-down" @click="addProduct(product)" variant="tonal" :disabled="loadingProducts">
                AGREGAR
            </v-btn>
        </v-col>
    </v-row>
    <!-- TABLA -->
    <v-row v-if="isOrder" class="mb-0">
        <!-- TABLA -->
        <v-col cols="12" md="9">
            <UiTitleCard title="Articulos" class-name="px-0 pb-0">
                <v-table class="bordered-table" hover density="comfortable" rounded="lg" variant="flat">
                    <thead>
                        <tr class="bg-containerBg">
                            <th class="text-left text-caption font-weight-bold text-uppercase">Producto</th>
                            <th class="text-left text-caption font-weight-bold text-uppercase">SKU</th>
                            <th class="text-left text-caption font-weight-bold text-uppercase" style="min-width: 100px">
                                Cantidad</th>
                            <th class="text-left text-caption font-weight-bold text-uppercase">Precio</th>
                            <th class="text-left text-caption font-weight-bold text-uppercase">Sub Total</th>
                            <th class="text-left text-caption font-weight-bold text-uppercase"></th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr v-for="(item, index) in listProduct" :key="index">
                            <td class="py-3">
                                <router-link to="/dashboard/default" class="text-secondary link-hover">{{ item.name
                                    }}</router-link>
                            </td>
                            <td class="py-3">{{ item.code }} </td>
                            <!-- <td class="py-3  m-3 text-right" style="min-width: 100px">
                                <button class="botonCantidad" @click="decrement(item)">-</button>
                                <span>{{ item.amount }}</span>
                                <button class="botonCantidad" @click="increment(item)"> +</button>
                            </td> -->
                            <td>
                                <div class="number-control">
                                    <div class="number-left" @click="decrement(item)"></div>
                                    <input type="number" v-model="item.amount" @change="amountInput(item)" name="number"
                                        class="number-quantity text-right">
                                    <div class="number-right" @click="increment(item)"></div>
                                </div>
                            </td>
                            <td class="py-3">
                                ${{ item.price }}
                            </td>
                            <td class="py-3 text-right" style="min-width: 100px"> {{ item.subtotal }}$</td>
                            <td class="py-3 text-right" style="min-width: 100px"
                                @click="removeProduct(item.code, index)">
                                <v-icon color="#D11919" style="cursor: pointer" icon="mdi-trash-can"
                                    title="Eliminar"></v-icon>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </UiTitleCard>
        </v-col>

        <!-- ANALITICA -->
        <v-col cols="12" md="3" class="py-12 ">
            <v-card title="RESUMEN" variant="flat">
                <div class="text-h4 pa-2">{{ `Total a pagar:` }}</div>
                <div class="text-h1 pa-2 text-center ">${{ ` ${totalSubtotal}` }}</div>
                <v-card-actions class="text-certer">
                    <v-btn :color="update ? 'primary' : 'warning'" @click="addProducts" variant="outlined">
                        {{ update ? 'ACTUALIZAR COMANDA' : 'CREAR COMANDA' }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>

    </v-row>

    <v-row v-if="!isOrder">

        <v-card class="justify-center">
            <v-card-item>
                <div class="image"><svg aria-hidden="true" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                        fill="none">
                        <path
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                            stroke-linejoin="round" stroke-linecap="round"></path>
                    </svg></div>
                <v-card-title>No hay Id_Comanda creada</v-card-title>
                <v-card-subtitle>Ocurrió un error</v-card-subtitle>
            </v-card-item>

            <v-card-text>
                Ocurrio un error, no hay pedido registrado, por lo tanto no se pueden agregar
                articulos
            </v-card-text>

            <v-btn class="cancel" variant="tonal" @click="back">
                CREAR PEDIDO
            </v-btn>

        </v-card>

    </v-row>
</template>

<style scoped>
.number-control {
    display: flex;
    align-items: center;
    justify-content: center;


}

.number-left::before,
.number-right::after {
    content: attr(data-content);
    background-color: #55A41B;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    width: 20px;
    color: white;
    transition: background-color 0.3s;
    cursor: pointer;
}

.number-left::before {
    content: "-";
}

.number-right::after {
    content: "+";
}

.number-quantity {
    padding: 0.25rem;
    border: 0;
    width: 50px;
    -moz-appearance: textfield;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
}

.number-left:hover::before,
.number-right:hover::after {
    background-color: #666666;
}


.botonCantidad {
    padding: 10px;
    font-size: 19px;
    font-weight: 900;
    color: #003f88;
}


.image {
    display: flex;
    margin-left: auto;
    margin-right: auto;
    background-color: #FEE2E2;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    border-radius: 9999px;
}

.image svg {
    color: #DC2626;
    width: 1.5rem;
    height: 1.5rem;
}

.cancel {
    display: inline-flex;
    margin-top: 0.75rem;
    padding: 0.5rem 1rem;
    background-color: #ffffff;
    color: #374151;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 500;
    justify-content: center;
    width: 100%;
    border-radius: 0.375rem;
    border: 1px solid #D1D5DB;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
</style>