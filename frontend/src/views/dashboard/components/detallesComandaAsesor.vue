<script setup lang="ts">
import UiTitleCard from '@/components/shared/UiTitleCard.vue';
import Swal from 'sweetalert2'
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { router } from '@/router';
const route = useRoute()

const search = ref('') 
const loadingInfo = ref(false);
const baseUrl = `${import.meta.env.VITE_URL}/api/orders`;
const baseUrlProducts = `${import.meta.env.VITE_URL}/api/orders`;
const id = ref() 
id.value = route.params.id

const info = ref([]);
const origen = ref();
const tipo = ref();
const cedulaUno = ref();
const email = ref('');
const nombreCompleto = ref('');
const estado = ref();
const ciudad = ref();
const municipio = ref();
const direccion = ref('');
const referencia = ref('');
const autorizado = ref(false);
const cedulaDos = ref('');
const telefonoUno = ref('');
const ID_pago = ref();
const ID_status = ref();
const porcentaje = ref();
const retencion = ref(false);
const ID_delivery = ref();
const User_asing = ref();

const getOrder = async () => {
    try {
        // const url = `${baseUrl}/filterOrder/${id.value}`
        const url = `${baseUrl}/filterOrder/${id.value}`
        const {data} = await axios.get(url);

        if (data) {
            cedulaUno.value = data[0][0]["Cedula"]
            tipo.value = data[0][0]["Tipo_cliente"]
            retencion.value = data[0][0]["Retencion"]
            porcentaje.value = data[0][0]["Porc_retencion"]
            email.value = data[0][0]["Email"]
            nombreCompleto.value = data[0][0]["Cliente"]
            estado.value = data[0][0]["Estado"]
            ciudad.value = data[0][0]["Ciudad"]
            municipio.value = data[0][0]["Municipio"]
            origen.value = data[0][0]["Sucursal"]
            direccion.value = data[0][0]["Direccion"]
            referencia.value = data[0][0]["Referencia"]
            ID_delivery.value = data[0][0]["Delivery_type"]
            ID_status.value = data[0][0]["Status"]
            autorizado.value = data[0][0]["Autoriza"] 
            cedulaDos.value = data[0][0]["Cedula_autoriza"]
            telefonoUno.value = data[0][0]["Telefono_autoriza"]  
            ID_pago.value = data[0][0]["Pago"]
            User_asing.value = data[0][0]["User_asing"]
        }

    } catch (error) {
        console.log(error)
    }
}

const getArticulos = async () => {
  loadingInfo.value = true
  try{
    const url = `${baseUrl}/filterOrderDetails/${id.value}`
    const {data} = await axios.get(url);
    info.value =  data[0]

    console.log(info);
    

  } catch(error){
      console.log(error)
  }
  loadingInfo.value = false
}

const updateEstatus = async () => {

    ID_status.value = 2
    try{
        await axios.put(`${baseUrl}/updateStatusOrder/${id.value}`,{
            status_comanda: ID_status.value
        });
        
    } catch(error){
        console.log(error)
    }

}

onMounted( async () => {
    await getOrder();
    await getArticulos();
});

function updateData(id:string){
    Swal.fire({
        title: "¿Prefactura Creada?",
        text: "No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si"
    }).then((result) => {
        if (result.isConfirmed) {
            updateEstatus()
            Swal.fire({
            title: "Prefactura Creada!",
            text: "la comanda ha cambiado de estatus!",
            icon: "success",
            }).then((result) => {
            if (result.isConfirmed) {
                router.push(`/maestroComandaAsignada`);
                }
            });
        }
    });
}

</script>

<template>
    <!-- informacion de la comanda -->
    <v-row class="mb-0">
        <v-col cols="12" md="4" class="px-10 py-5">
            <h2>Datos del Cliente</h2>
            <p><b>Cedula:</b> {{cedulaUno}}</p>
            <p><b>Tipo:</b> {{ tipo }}</p>
            <p><b>Email:</b> {{ email }}</p>
            <p><b>Cliente:</b> {{nombreCompleto}}</p>
            <p><b>Estados:</b> {{estado}}</p>
            <p><b>Ciudad:</b> {{ciudad}}</p>
            <p><b>Municipio:</b> {{ municipio }}</p>
        </v-col>
        <v-col cols="12" md="4" class="px-10 py-5">
            <h2>Datos de la comanda</h2>
            <p><b>Origen:</b> {{origen}}</p>
            <p><b>Direccion Completa:</b> {{ direccion }}</p>
            <p><b>Referencia:</b> {{ referencia }}</p>
            <p><b>Delivery:</b> {{ID_delivery}}</p>
            <p><b>Autorizado para recibir:</b>
                <v-chip 
                    variant="tonal"
                    color="warning"
                    size="x-small"
                    prepend-icon="mdi-timer-sand"
                    v-if="autorizado === true">
                    <p class="mb-0">Si</p>
                </v-chip>

                <v-chip 
                    variant="tonal"
                    color="error"
                    size="x-small"
                    prepend-icon="mdi-timer-sand"
                    v-else>
                    <p class="mb-0">No</p>
                </v-chip>
            </p>
            <p><b>Cedula/Rif:</b> {{cedulaDos}}</p>
            <p><b>medio de pago:</b> {{ID_pago}}</p>
        </v-col>
        <v-col cols="12" md="4" class="px-10 py-5">
            <h2>Estatus</h2>
            <p><b>Status de comanda:</b> {{ID_status}}</p>
            <p><b>Asesor:</b> {{ User_asing }}</p>
        </v-col>
    </v-row>

    <UiTitleCard title="Productos Asociados" class-name="px-0 pb-0">
            <!-- productos de la comanda -->
            <v-row>
                <v-col cols="12" md="12">
                    <v-table class="bordered-table" hover density="comfortable" rounded="lg">
                    <thead class="bg-containerBg">
                        <tr class="bg-containerBg">
                                <th class="text-left text-caption font-weight-bold text-uppercase">Producto</th>
                                <th class="text-left text-caption font-weight-bold text-uppercase">SKU</th>
                                <th class="text-right text-caption font-weight-bold text-uppercase"
                                    style="min-width: 100px">Cantidad</th>
                                <th class="text-left text-caption font-weight-bold text-uppercase">Precio</th>
                                <th class="text-right text-caption font-weight-bold text-uppercase">Sub Total</th>
                            </tr>
                    </thead>

                    <tbody>
                        <tr v-for="item in info" >
                            <td class="py-3 text-secondary">{{ item['Producto'] }}</td>
                            <td class="py-3">{{ item['ID_producto'] }} </td>
                            <td class="py-3 text-right" style="min-width: 100px"><span>{{ item['Unidades'] }}</span></td>
                            <td class="py-3">{{ item['Precio'] }}$</td>
                            <td class="py-3 text-right" style="min-width: 100px"> {{ item['Subtotal'] }}$</td>
                        </tr>
                    </tbody>
                </v-table>
                </v-col>
            </v-row>
    </UiTitleCard>

    <v-row class="mb-0 mt-5">
        <v-col cols="12" md="12">
            <v-btn :disabled="ID_status === 'Asignada'" append-icon="mdi-check-all" variant="elevated" color="primary" @click="updateData">
                Prefactura Creada
            </v-btn>
        </v-col>
    </v-row>

</template>

<style >
  thead{
    background-color: rgb(250, 250, 250);
  }
</style>
