<script setup lang="ts">

import UiTitleCard from "@/components/shared/UiTitleCard.vue";
import Swal from "sweetalert2";
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { router } from "@/router";
import { useUserRol } from "@/composables/users";
import UploadImages from "@/views/formComanda/uploadImages.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useAddDocument } from "@/composables/addDocuments";
import { useUploadFiles } from "@/composables/file";


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
const search = ref("");
const loadingInfo = ref(false);
const baseUrl = `${import.meta.env.VITE_URL}/api/orders`;
const baseUrlAsesor = `${import.meta.env.VITE_URL}/api/orders`;
const baseUrlProducts = `${import.meta.env.VITE_URL}/api/orders`;
const id = ref();
const id_orders = ref();
const infoAsesores = ref();
const selectedAsesor = ref();
const dialog = ref(false);
const numFactura = ref();
id.value = route.params.id;
id_orders.value = route.params.id_orders;

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
const guiaZoom = ref();
const direccionDelivery = ref();
const Type = ref()

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

const { dataUser } = useUserRol(USER_ROL.value); // buscamos los datos para el tipo de asesor
const ROLESNOTMEDIOPAGO = [1, 5]; //ESTE ARREGLO INDICA QUIEN NO VA VER LA INFO MEDIO DE PAGO
const ROLEADDFILESBILL = [6, 8]; // ROLES CON ACCESO A CARGAR DOCUMENTOS y CARGAR NUMERO DE FACTURA
const ROLEATC = [10]; // ROLES CON ACCESO A CARGAR DOCUMENTOS y CARGAR NUMERO DE FACTURA 

const itemDocument = ref<Document[]>([]);

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
    }
  } catch (error) {
    console.log(error);
  }
};

const getDocumentsATC = async () => {
  try {
    const detalle = 'DETALLE DE ENVIO'
    const url = `${baseUrl}/filterOrderDetailsfilesEnvio/${id.value}/${detalle}`;
    const { data } = await axios.get(url);
    Type.value = data[0][0].Type_File;
      
  } catch (error) {
    console.log('No posee detalle de envio');
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

  const jsonData = info.value?.map((item) => ({
    id_comanda: id.value,
    id_order: item.ID_order,
    producto: item.Producto,
    id_producto: item.ID_producto,
    guiaZoom: item.guiaZoom,
    direccionDelivery: item.direccionDelivery,
    precio: item.Precio,
  }));
  
  try {
    //SOLO USUARIOS CON ROL DE CAJERAS
    // if (ROLEADDFILESBILL.includes(USER_ROL.value)) {
    if (USER_ROL.value === 1 || USER_ROL.value === 6 || USER_ROL.value === 8) {
      useAddDocument(itemDocument.value, id.value, id_orders.value); //Visualizan y agregan  archivos

    } else if(ROLEATC.includes(USER_ROL.value)){
      await axios.put(`${baseUrl}/updateOrderDetails/${id.value}`, jsonData);
    }

    await axios.put(`${baseUrl}/updateStatusOrder/${id.value}`, {
      status_comanda: dataUser.changeID_status,
    });
  } catch (error) {
    console.log(error);
  }
};

interface Asesores {
  Nombre: string;
  ID_user: number;
}

const getAsesores = async () => {
  try {

    const url = `${baseUrlAsesor}/filterMasterAsesorSuc/${id_sucursal.value}`;
    const { data } = await axios.get(url);

    infoAsesores.value = data[0].map((asesor: Asesores) => ({
      title: asesor.Nombre,
      value: asesor.ID_user,
    }));
  } catch (error) {
    console.log(error);
  }
};

const cajaFactura = async () => {
  try {
    if(numFactura.value){
      const url = `${baseUrl}/updateCajaFactura/${id.value}`;
    const { data:respuesta } = await axios.put(url, {caja_factura: numFactura.value});

    if(respuesta){ 
      dialog.value = false
      return toast.error(`Caja factura asignada a la comanda`, {
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

onMounted(async () => {
  await getOrder();
  await getArticulos();
  await getAsesores();
  await getDocumentsATC(); 
});

async function updateData() {
  if (ROLEADDFILESBILL.includes(USER_ROL.value) && !numFactura.value) {
    return toast.error(`Error. Debes ingresar el numero de factura`, {
      position: toast.POSITION.TOP_CENTER,
      transition: toast.TRANSITIONS.ZOOM,
      autoClose: 4000,
    });
  }

  const { isvalidate } = ROLEADDFILESBILL.includes(USER_ROL.value)
    ? useUploadFiles(itemDocument.value)
    : { isvalidate: true }; //Verificamos los tipos de documentos si el rol permite cargar archivos

  if (isvalidate)
    Swal.fire({
      title: dataUser.msgButton,
      text: "No podrás revertir esto!",
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
          title: dataUser.msgButton,
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

function handleSelectImages(items: any) {
  itemDocument.value = items;
}

const asignAsesor = async () => {
  if (!selectedAsesor.value) {
    return toast.error("Error. Debe seleccionar un asesor", {
      position: toast.POSITION.TOP_CENTER,
      transition: toast.TRANSITIONS.ZOOM,
      autoClose: 4000,
    });
  }

  const status = dataUser.changeID_status;
  try {
    const response = await axios.put(
      `${baseUrl}/updateOrderAsesor/${id.value}`,
      { User_asing: selectedAsesor.value, ID_status: status }
    );
    if (response) {
      Swal.fire({
        title: "Asesor Asignado",
        text: "Se asigno un asesor a la comanda seleccionada!",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push(`/maestroComandaAsignada`);
        }
      });

    } 
  } catch (error) {
        toast.error(`Error, al momento de guardar el asesor ${error}`, {
            position: toast.POSITION.TOP_CENTER,
            transition: toast.TRANSITIONS.ZOOM,
            autoClose: 4000
        });
    }
}

const getNameAsesor = (id: number) => {
  if (infoAsesores && infoAsesores.value) {
    const asesor = infoAsesores.value.find((item: any) => item.value == id)?.title;
    return asesor;
  }
  return null;
};

const rechazarRetencion = async () => {
    const statusRechazado = 4
    const url = `${baseUrl}/updateStatusOrder/${id.value}`;
    await axios.put(url, {status_comanda: statusRechazado});
};

const alertaRechazar = () =>{
  Swal.fire({
      title: "Vas a Rechazar la comanda",
      text: "Cuando rechazas la comanda, se devuelve a los asesores online de daka para volver a cargarlo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        rechazarRetencion();
        Swal.fire({
          title: dataUser.msgButton,
          text: "la comanda ha cambiado de estatus!",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push(`/retenciones`);
          }
        });
      }
    });
}

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
            <p><b>Email:</b> {{ email }}</p>
            <p><b>Cliente:</b> {{ nombreCompleto }}</p>
            <p><b>Estados:</b> {{ estado }}</p>
            <p><b>Ciudad:</b> {{ ciudad }}</p>
            <p><b>Municipio:</b> {{ municipio }}</p>
        </v-col>
        <v-col cols="12" md="4" class="px-10 py-5">
            <h2>Datos de la comanda</h2>
            <p><b>Origen:</b> {{ origen }}</p>
            <p><b>Direccion Completa:</b> {{ direccion }}</p>
            <p><b>Referencia:</b> {{ referencia }}</p>
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
            <p><b>Cedula/Rif:</b> {{ cedulaDos }}</p>
            <p v-if="!ROLESNOTMEDIOPAGO.includes(USER_ROL)"><b>medio de pago:</b> {{ ID_pago }}</p>
        </v-col>
        <v-col cols="12" md="4" class="px-10 py-5">
            <h2>Estatus</h2>
            <p><b>Status de comanda:</b> {{ ID_status }}</p>
            <p><b>Asesor:</b> {{ getNameAsesor(User_asing) }} </p>
        </v-col>
    </v-row>

    <!-- tabla para los demas usuarios -->
    <UiTitleCard title="Productos Asociados" class-name="px-0 pb-0" >
        <!-- DEMAS USER -->
        <v-row v-if="Type != 'DETALLE DE ENVIO' 
                    || USER_ROL === 1 
                    || USER_ROL === 2 
                    || USER_ROL === 3 
                    || USER_ROL === 4 
                    || USER_ROL === 5 
                    || USER_ROL === 6 
                    || USER_ROL === 7 
                    || USER_ROL === 8 
                    || USER_ROL === 9 
                    || USER_ROL === 11 
                    || USER_ROL === 99">

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
                            <td class="py-3 text-right" style="min-width: 100px"> {{ item['Subtotal'] }}$</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>

        <!-- ATC -->
        <v-row v-else="Type === 'DETALLE DE ENVIO' || USER_ROL === 10">
            <v-col cols="12" md="12">
                <v-table class="bordered-table" hover density="comfortable" rounded="lg">
                    <thead class="bg-containerBg">
                        <tr class="bg-containerBg">
                            <th class="text-left text-caption font-weight-bold text-uppercase">Producto</th>
                            <th class="text-left text-caption font-weight-bold text-uppercase">SKU</th>
                            <th class="text-left text-caption font-weight-bold text-uppercase" v-if="ID_delivery == 'DELIVERY TIENDA'">Direccion</th>
                            <th class="text-left text-caption font-weight-bold text-uppercase" v-if="ID_delivery == 'ZOOM' || ID_delivery == 'ZOOM TIENDA'">Guia Zoom</th>
                            <th class="text-left text-caption font-weight-bold text-uppercase">Precio</th>
                        </tr>
                    </thead>
    
                    <tbody>
                        <tr v-for="(item, index) in info" :key="index">
                            <td class="py-3 text-secondary">{{ item['Producto'] }}</td>
                            <td class="py-3">{{ item['ID_producto'] }} </td>
                            <td class="py-3"  v-if="ID_delivery == 'DELIVERY TIENDA'">
                              <v-text-field 
                                variant="solo-inverted"
                                v-model="item.direccionDelivery"
                                placeholder="Direccion"
                                class="inputDelivery"
                              >
                              </v-text-field>
                            </td>
                            <td class="py-3" v-if="ID_delivery == 'ZOOM' || ID_delivery == 'ZOOM TIENDA'">
                              <v-text-field 
                                variant="solo-inverted"
                                v-model="item.guiaZoom"
                                placeholder="Guia"
                                class="inputDelivery2"
                              >
                              </v-text-field>
                            </td>
                            <td class="py-3">{{ item['Precio'] }}$</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
    </UiTitleCard>

    <!-- COMPONENTE QUE PERMITE AGREGAR LOS ARCHIVOS DE IMAGENES -->
    <UploadImages v-if="USER_ROL === 6 || USER_ROL === 8 || USER_ROL === 1 || USER_ROL === 10 || USER_ROL === 11" 
      @isSelectImages=handleSelectImages 
      :ID_detalle=id
      :deleteImageUpdate=false
    />

    <v-row class="mb-0 mt-5">
        <v-col v-if="USER_ROL === 4" cols="12" md="12" sm="6">
            <v-label text="Asignar Asesor"></v-label>
            <br>
            <v-autocomplete id="tipo" placeholder="Asesores de ventas" clearable chips :items="infoAsesores"
                variant="outlined" class="mt-2" color="primary" v-model="selectedAsesor"></v-autocomplete>
        </v-col>
    </v-row>

    <v-container>
        <v-row align="center" justify="start">

          <!-- BOTON PARA CAMBIAR DE ESATUS -->
            <v-col cols="auto">
                <v-btn 
                  :disabled="ID_status == 2" 
                  append-icon="mdi-check-all" 
                  variant="elevated" 
                  color="primary"
                  @click="USER_ROL === 4 ? asignAsesor() : updateData()"
                >
                  {{ dataUser.msgButton }}
                </v-btn>
            </v-col>

            <!-- BOTON PARA INGRESAR EL NUMERO DE FACTURA -->
            <v-col cols="auto" v-if="ROLEADDFILESBILL.includes(USER_ROL)">
                <v-btn 
                  @click="dialog=true" 
                  append-icon="mdi-check-all" 
                  variant="elevated" 
                  color="primary"
                >
                  Ingresar Numero de Factura
                </v-btn>
            </v-col>

            <!-- BOTON PARA RECHAZAR COMANDA -->
            <v-col cols="auto" v-if="USER_ROL === 11">
                <v-btn 
                  @click="alertaRechazar" 
                  append-icon="mdi-delete-sweep" 
                  variant="elevated" 
                  color="error"
                >
                  Rechazar Retencion 
                </v-btn>
            </v-col>
        </v-row>
    </v-container>

    <v-dialog v-model="dialog" width="auto">
        <v-card max-width="600" prepend-icon="mdi-counter" title="Numero de Factura">

            <v-text-field ref="zip" v-model="numFactura" :rules="[() => !!numFactura || 'Numero factura es requerido']"
                placeholder="23-734" required></v-text-field>
           

            <template v-slot:actions>
                <v-btn class="ms-auto" text="Ok" @click="cajaFactura"></v-btn>
            </template>
        </v-card>

    </v-dialog>
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