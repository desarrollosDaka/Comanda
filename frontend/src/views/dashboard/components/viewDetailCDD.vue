<script setup lang="ts">
import UiTitleCard from "@/components/shared/UiTitleCard.vue";
import Swal from "sweetalert2";
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { router } from "@/router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useAddDocument } from "@/composables/addDocuments";
import UploadImages from "@/views/formComanda/uploadImages.vue";
import { HttpHeadIcon } from "vue-tabler-icons";
import { useUploadFilesCaja } from "@/composables/fileCajero";



interface Document {
  file: File;
  type: string;
  mode: string;
}

interface Item {
  Producto: string;
  ID_producto: number;
  guiaZoom: string;
  direccionDelivery: string;
  Precio: number;
  Unidades: number;
  Subtotal: number;
  ID_order: number;
}

const route = useRoute();
const loadingInfo = ref(false);
const baseUrl = `${import.meta.env.VITE_URL}/api/orders`;
const id = ref();
const id_orders = ref();

id.value = route.params.id1;
id_orders.value = route.params.id2;

const info = ref<Item[]>();
const origen = ref();
const tipo = ref();
const cedulaUno = ref();
const email = ref("");
const nombreCompleto = ref("");
const estado = ref();
const ciudad = ref();
const municipio = ref();
const direccion = ref("");
const referencia = ref("");
const autorizado = ref(false);
const cedulaDos = ref("");
const telefonoUno = ref("");
const ID_pago = ref();
const ID_status = ref();
const porcentaje = ref();
const retencion = ref(false);
const ID_delivery = ref();
const User_asing = ref();
const id_sucursal = ref();
const messageStatus = ref();
const itemDocument = ref<Document[]>([]);
const dialog = ref(false);
const numFactura = ref();
const boxFactura = ref();
const description_payment = ref();
const nombreDos = ref("");
const porcentajeRetencion = ref("");



let USER_ROL = ref<number>(0); //Variable donde se almacena el ROL DEL USUARIO que vendria del localstorage
let USER = ref<number>(0); //Variable donde se almacena el ID USUARIO que vendria del localstorage
let user_crea = ref<string>("");

// Localstorage
const jsonFromLocalStorage = sessionStorage.getItem("user");
if (jsonFromLocalStorage !== null) {
  const parsedData = JSON.parse(jsonFromLocalStorage); 
  user_crea.value = parsedData.data.Nombre;
  USER_ROL.value = +parsedData.data.ID_rol;
  USER.value = parsedData.data.ID_user;
  id_sucursal.value = parsedData.data.Id_sucursal;
}

function handleSelectImages(items: any) {
  itemDocument.value = items;
}

const ROLESNOTMEDIOPAGO = [1, 5]; //ESTE ARREGLO INDICA QUIEN NO VA VER LA INFO MEDIO DE PAGO
const ROLEADDFILESBILL = [8]; // ROLES CON ACCESO A CARGAR DOCUMENTOS y CARGAR NUMERO DE FACTURA

const getOrder = async () => {
  try {
    const url = `${baseUrl}/filterOrder/${id.value}`;
    const { data } = await axios.get(url);

    if(data){
      cedulaUno.value = data[0][0]["Cedula"];
      tipo.value = data[0][0]["Tipo_cliente"];
      retencion.value = data[0][0]["Retencion"];
      porcentaje.value = data[0][0]["Porc_retencion"];
      email.value = data[0][0]["Email"];
      nombreCompleto.value = data[0][0]["Cliente"];
      estado.value = data[0][0]["Estado"];
      ciudad.value = data[0][0]["Ciudad"];
      municipio.value = data[0][0]["Municipio"]; 
      origen.value = data[0][0]["Sucursal"];
      direccion.value = data[0][0]["Direccion"];
      referencia.value = data[0][0]["Referencia"];
      ID_delivery.value = data[0][0]["Delivery_type"];
      ID_status.value = data[0][0]["Status"];
      autorizado.value = data[0][0]["Autoriza"];
      cedulaDos.value = data[0][0]["Cedula_autoriza"];
      telefonoUno.value = data[0][0]["Telefono_autoriza"];
      ID_pago.value = data[0][0]["Pago"];
      User_asing.value = data[0][0]["User_asing"]; 
      boxFactura.value = data[0][0]["Caja_factura"];
      description_payment.value = data[0][0]["Description_payment"];
      nombreDos.value = data[0][0]["Nombre_autoriza"];
      porcentajeRetencion.value = data[0][0]["Porc_retencion"];

    }

    if(ID_status.value === 'Creada'){
      messageStatus.value = 'Asignar comanda'

    }else{
      messageStatus.value = 'Facturar comanda'

    }
  } catch (error) { 
    console.log(error);
  }
};


const cajaFactura = async () => {
  try {
    if (numFactura.value) {
      const url = `${baseUrl}/updateCajaFactura/${id.value}`;
      const { data: respuesta } = await axios.put(url, { caja_factura: numFactura.value });

      if (respuesta) {
        dialog.value = false
        return toast.success(`Caja factura asignada a la comanda`, {
          position: toast.POSITION.TOP_CENTER,
          transition: toast.TRANSITIONS.ZOOM,
          autoClose: 4000,
        });
      }
    }

  } catch (error) {
    console.log(error);
  }
};


const getArticulos = async () => {
  loadingInfo.value = true;
  try {
    const url = `${baseUrl}/filterOrderDetails/${id.value}`;
    const { data } = await axios.get(url);
    info.value = data[0];
    
  } catch (error) {
    console.log(error);
  }
  loadingInfo.value = false;
};

const updateEstatus = async () => {
  try {
    let changeStatus; 

    if(ID_status.value === 'Creada'){   
      changeStatus = 2; 

    }
    else if(ID_status.value === 'Asignada'){
      changeStatus = 4;
    } 

    useAddDocument(itemDocument.value, id.value, id_orders.value); //Visualizan y agregan  archivos

    await axios.put(`${baseUrl}/updateStatusOrder/${id.value}`, {
      status_comanda: changeStatus
    });
   
  } catch (error) {
    console.log(error);
  }
};

const changeStatusComanda = () =>{


  const { isvalidate } = useUploadFilesCaja(itemDocument.value, ID_status.value); //Verificamos los tipos de documentos
  console.log(itemDocument.value)
     if (ROLEADDFILESBILL.includes(USER_ROL.value) && !numFactura.value && ID_status.value  === 'Asignada') {
    return toast.error(`Error. Debes ingresar el numero de factura`, {
      position: toast.POSITION.TOP_CENTER,
      transition: toast.TRANSITIONS.ZOOM,
      autoClose: 4000,
    });
  }
  if (isvalidate){
    Swal.fire({
      title: ID_status.value === 'Creada' ? `Comanda Asignada correctamente` : `Comanda Facturada correctamente`,
      text: "La comanda va a cambiar de estatus",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        updateEstatus();
        Swal.fire({
          title: "la comanda ha cambiado de estatus!",
          text: "No podras revertir esto",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push(`/ComandasCDD`);
          }
        });
      }
    });
  }
 
}

onMounted(async () => {
  await getOrder();
  await getArticulos();
});

</script>

<template>

    <!-- informacion de la comanda -->
    <div class="card">
        <div class="data">

            <p>COMANDA #{{ id_orders }}</p>
            <div class="range">
                <div class="fill">
                </div>
            </div>

        </div>
    </div>

    <v-row class="mb-0">

        <v-col cols="12" md="4" class="px-10 py-5">
            <h2>Datos del Cliente</h2>
            <p><b>Cedula:</b> {{ cedulaUno }}</p>
            <p><b>Tipo:</b> {{ tipo }}</p>
            <p v-if="porcentajeRetencion"><b>%</b> {{ porcentajeRetencion }}</p>
            <p><b>Email:</b> {{ email }}</p>
            <p><b>Cliente:</b> {{ nombreCompleto }}</p>
            <p><b>Estados:</b> {{ estado }}</p>
            <p><b>Ciudad:</b> {{ ciudad }}</p>
            <p><b>Municipio:</b> {{ municipio }}</p>
        </v-col>

        <v-col cols="12" md="4" class="px-10 py-5">
            <h2>Datos de la comanda</h2>
            <p v-if="origen"><b>Destino:</b> {{ origen }}</p>
            <p v-if="direccion"><b>Direccion Completa:</b> {{ direccion }}</p>
            <p v-if="referencia"><b>Referencia:</b> {{ referencia }}</p>
            <p><b>Delivery:</b> {{ ID_delivery }}</p>
            <p><b>Autorizado para recibir:</b>
                <v-chip variant="tonal" color="warning" size="x-small" prepend-icon="mdi-timer-sand"
                    v-if="autorizado === true">
                    <p class="mb-0">Si</p>
                </v-chip>

                <v-chip variant="tonal" color="error" size="x-small" prepend-icon="mdi-timer-sand" v-else>
                    <p class="mb-0">No</p>
                </v-chip>
            </p>
            <p v-if="cedulaDos"><b>Cedula/Rif Autorizado:</b> {{ cedulaDos }}</p>
            <p v-if="nombreDos"><b>Nombre Autorizado:</b> {{ nombreDos }}</p>
            <p v-if="telefonoUno"><b>Telefono Autorizado:</b> {{ telefonoUno }}</p>
            <p v-if="!ROLESNOTMEDIOPAGO.includes(USER_ROL)"><b>medio de pago:</b> {{ ID_pago }}</p>
        </v-col>
        <v-col cols="12" md="4" class="px-10 py-5">
            <h2>Estatus</h2>
            <p><b>Status de comanda:</b> {{ ID_status }}</p>
            <!-- <p><b>Asesor:</b> {{ getNameAsesor(User_asing) }} </p> -->
            <p v-if="description_payment"><b>Descripcion de pagos:</b> {{ description_payment }}</p>
        </v-col>
    </v-row>

    <!-- tabla para los demas usuarios -->
    <UiTitleCard title="Productos Asociados" class-name="px-0 pb-0">
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
                        <tr v-for="(item, index) in info" :key="index">
                            <td class="py-3 text-secondary">{{ item['Producto'] }}</td>
                            <td class="py-3">{{ item['ID_producto'] }} </td>
                            <td class="py-3 text-right" style="min-width: 100px"><span>{{ item['Unidades'] }}</span>
                            </td>
                            <td class="py-3">{{ item['Precio'] }}$</td>
                            <td class="py-3 text-right" style="min-width: 100px"> {{ item['Subtotal']}}$</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
    </UiTitleCard>

    <v-dialog v-model="dialog" width="auto">
    <v-card max-width="600" prepend-icon="mdi-counter" title="Documento POS">

      <v-text-field ref="zip" v-model="numFactura" :rules="[() => !!numFactura || 'Documento POS es requerido']"
        placeholder="Documento POS" required></v-text-field>


      <template v-slot:actions>
        <v-btn class="ms-auto" text="Ok" @click="cajaFactura"></v-btn>
      </template>
    </v-card>

  </v-dialog>
    <!-- COMPONENTE QUE PERMITE AGREGAR LOS ARCHIVOS DE IMAGENES -->
  <UploadImages v-if="USER_ROL === 8 || USER_ROL === 9"
  @isSelectImages=handleSelectImages :ID_detalle=id :deleteImageUpdate=false />

  
    <v-container>
        <br>
        <v-row align="center" justify="start">

          <!-- BOTON PARA CAMBIAR DE ESATUS -->
            <v-col cols="auto">
                <v-btn 
                  :disabled="ID_status == 2" 
                  append-icon="mdi-check-all" 
                  variant="elevated"
                  color="primary"
                  @click="changeStatusComanda()"
                >
                  {{ messageStatus }}
                </v-btn>   
            </v-col>


             <!-- BOTON PARA INGRESAR EL NUMERO DE FACTURA -->
      <v-col cols="auto" v-if="ROLEADDFILESBILL.includes(USER_ROL) && ID_status === 'Asignada'">
        <v-btn @click="dialog = true" append-icon="mdi-check-all" variant="elevated" color="primary">
          Ingresar Documento POS
        </v-btn>
      </v-col>

        </v-row>
    </v-container>
</template>

<style>
thead {
    background-color: rgb(250, 250, 250);
}

.card {
    padding: 1rem;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 5px 5px #323232;
    border: 2px solid #323232;
    margin-bottom: 50px;
}

.data {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.data p {
    margin-top: 1rem;
    margin-bottom: 1rem;
    color: #1F2937;
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-weight: 700;
    text-align: left;
}

.data .range {
    position: relative;
    background-color: #E5E7EB;
    width: 100%;
    height: 0.5rem;
    border-radius: 0.25rem;
}

.data .range .fill {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #143E90;
    width: 76%;
    height: 100%;
    border-radius: 0.25rem;
}

.inputDelivery{
  width: 200px;
}
.inputDelivery2{
  width: 200px;
}
</style>