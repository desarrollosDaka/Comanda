<script setup lang="ts">
import { Form } from "vee-validate";
import { ref, onMounted , watch} from "vue";
import Swal from "sweetalert2";
import axios from "axios";
import { useRoute } from "vue-router";
import { router } from "@/router";
import UploadImages from "./uploadImages.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const route = useRoute();

// CAPTURAMOS EL ID DE COMANDA
const id = ref(); // id de la COMANDA (INTERNO )
const idComanda = ref()

id.value = route.params.id;
idComanda.value = route.params.idComanda;

// variables
const valid = ref(false);
const origen = ref();
const tipo = ref();
const cedulaUno = ref();
const email = ref("");
const nombreCompleto = ref("");
const estado = ref();
const ciudad = ref();
const municipio = ref();
const direccion = ref("");
const direccionEnvio = ref("");
const direccionZoom = ref();
const referencia = ref("");
const referenciaEnvio = ref("");
const autorizado = ref(false);
const nombreDos = ref("");
const cedulaDos = ref("");
const telefonoUno = ref("");
const telefonoDos = ref("");
const ID_pago = ref();
const user_mod = ref();
const doc_file = ref();
const info_estado = ref();
const info_muni = ref();
const info_ciudad = ref();
const info_estadoRl = ref();
const info_muniRl = ref();
const info_ciudadRl = ref();
// const ID_status = ref("1");
// const idComandaRandom = ref();
const Status = ref();
const info_Zoom = ref();
const porcentaje = ref();
const retencion = ref(false);
const ID_Delivery = ref();
const info_tiendas = ref();
const info_Delivery = ref();
const info_Payment = ref();
// const valorSeleccionado = ref();
// const valorSeleccionadoTwo = ref();
// const valorSeleccionadoRl = ref();
// const valorSeleccionadoTwoRl = ref();
const ID_rol = ref();
const tipoDocumento = ref();
const tipoDocumentoRL = ref();
const razonSocial = ref();
const razonComercial = ref();
const Nombre_rep = ref();
const cedula_rep = ref();
const email_rep = ref();
const telefono_rep = ref();
const estado_rep = ref();
const ciudad_rep = ref();
const municipio_rep = ref();
const itemDocument = ref<Document[]>([]);
const ID_ticket = ref();

const pagosArray = ref();
const baseUrl = `${import.meta.env.VITE_URL}/api/orders`;
const baseUrlEstado = `${import.meta.env.VITE_URL}/api/states`;
const baseUrlCiudad = `${import.meta.env.VITE_URL}/api/cities`;
const baseUrlMunicipio = `${import.meta.env.VITE_URL}/api/municipalities`;
const baseUrlStore = `${import.meta.env.VITE_URL}/api/stores`;
const baseUrlClients = `${import.meta.env.VITE_URL}/api/clients`;
const baseUrlDelivery = `${import.meta.env.VITE_URL}/api/delivery`;
const baseUrlPayment = `${import.meta.env.VITE_URL}/api/payment`;

const INSERT_METHOD = "insert";

// Localstorage
const jsonFromLocalStorage = sessionStorage.getItem("user");
if (jsonFromLocalStorage !== null) {
  const parsedData = JSON.parse(jsonFromLocalStorage);
  user_mod.value = parsedData.data.Nombre;
}

// validaciones
const origenRules = ref([
  (v: string) => !!v || "El origen del cliente es requerido",
]);
const tipoRules = ref([
  (v: string) => !!v || "El tipo de cliente es requerido",
]);
const emailRules = ref([
  (v: string) => !!v || "El email es requerido",
  (v: string) => /.+@.+\..+/.test(v) || "El email debe ser válido",
]);
const CedulaUnoRules = ref([
  (v: string) => !!v || "La cedula/rif del cliente es requerido",
]);
const nombreCompletoRules = ref([
  (v: string) => !!v || "El nombre del cliente es requerido",
]);
const estadosRules = ref([(v: any) => !!v || "El estado es requerido"]);
const municipioRules = ref([(v: any) => !!v || "El municipio es requerido"]);
const ciudadRules = ref([(v: any) => !!v || "El ciudad es requerido"]);
const direccionRules = ref([
  (v: string) => !!v || "La direccion completa es requerido",
]);
const referenciaRules = ref([
  (v: string) => !!v || "La referencia del delivery es requerido",
]);
const autorizadoRules = ref([
  (v: string) => !!v || "El nombre del autorizado es requerido",
]);
const cedulaDosRules = ref([
  (v: string) => !!v || "La cedula de la persona autorizada es requerida",
]);
const telefonoRules = ref([
  (v: string) => !!v || "El telefono de la persona autorizada es requerida",
]);
const metodoRules = ref([
  (v: string) => !!v || "El metodo de pago es requerida",
]);
const fileRules = ref([(v: any) => !!v || "El archivo es requerido"]);

const TipoDocumentoRules = ref([
  (v: any) => !!v || "El tipo de documento es requerido",
]);
const ticketRules = ref([(v: any) => !!v || "El Nro de Ticket Zendesk es requerido",]);

const getOrder = async () => {
  try {
    const url = `${baseUrl}/filterOrder/${id.value}`;
    const { data } = await axios.get(url);

    if (data) {
      cedulaUno.value = data[0][0]["Cedula"];
      tipo.value = data[0][0]["Tipo_cliente"];
      retencion.value = data[0][0]["Retencion"];
      porcentaje.value = data[0][0]["Porc_retencion"];
      email.value = data[0][0]["Email"];
      nombreCompleto.value = data[0][0]["Cliente"];
      estado.value = data[0][0]["ID_states"];
      ciudad.value = data[0][0]["ID_city"];
      municipio.value = data[0][0]["ID_municipio"];
      origen.value = data[0][0]["ID_sucursal"];
      direccion.value = data[0][0]["Direccion"];
      ID_ticket.value = data[0][0]["ID_ticket"];
      direccionEnvio.value = data[0][0]["Direccion_envio"];
      referencia.value = data[0][0]["Referencia"];
      referenciaEnvio.value = data[0][0]["Referencia_envio"];
      ID_Delivery.value = +data[0][0]["Tipo_delivery"];
      direccionZoom.value = data[0][0]["SucursalZoom"];
      autorizado.value = data[0][0]["Autoriza"];
      cedulaDos.value = data[0][0]["Cedula_autoriza"];
      nombreDos.value = data[0][0]["Nombre_autoriza"];
      telefonoUno.value = data[0][0]["Telefono"];
      telefonoDos.value = data[0][0]["Telefono_autoriza"];
      ID_pago.value = data[0][0]["ID_pago"];
      pagosArray.value = ID_pago.value.split(',').map(Number);
      user_mod.value = data[0][0]["User_crea"];
      tipoDocumento.value = data[0][0]["Tipo_cedula"];
      tipoDocumentoRL.value = data[0][0]["Tipo_cedula_rep"];
      razonComercial.value = data[0][0]["Razon_comercial"];
      cedula_rep.value = data[0][0]["Cedula_rep"];
      Nombre_rep.value = data[0][0]["Nombre_rep"];
      email_rep.value = data[0][0]["Email_rep"];
      telefono_rep.value = data[0][0]["Telefono_rep"];
      estado_rep.value = data[0][0]["ID_state_rep"];
      municipio_rep.value = data[0][0]["ID_municipio_rep"]; 
      ciudad_rep.value = data[0][0]["ID_city_rep"]; 
      Status.value = data[0][0]["ID_status"]
    }

  } catch (error) {
    toast.error("Ocurrio un error al consultar los datos de la comanda", {
      position: toast.POSITION.TOP_CENTER,
      transition: toast.TRANSITIONS.ZOOM,
      autoClose: 4000,
      theme: "colored",
      toastStyle: {
        fontSize: "16px",
        opacity: "1",
      },
    });
  }
};

// BUSCADOR DE CLIENTES
async function searchModel() {
  try {
    const { data } = await axios.get(
      `${baseUrlClients}/searchClient/${cedulaUno.value}`
    );
    if (data) {
      tipo.value = data.Tipo_cliente;
      tipoDocumento.value = data.Tipo_cedula;
      email.value = data.Email;
      telefonoUno.value = data.Telefono;
      nombreCompleto.value = data.Nombre;
      nombreCompleto.value = data.Nombre;
      estado.value = data.ID_state;
      ciudad.value = data.ID_city;
      municipio.value = data.ID_municipio;
      retencion.value = data.Retencion;
      razonComercial.value = data.Razon_comercial;
      porcentaje.value = data.Porc_retencion;
      estado_rep.value = data.ID_state_rep;
      ciudad_rep.value = data.ID_city_rep;
      municipio_rep.value = data.ID_municipio_rep;
      Nombre_rep.value = data.Nombre_rep;
      email_rep.value = data.Email_rep;
      tipoDocumentoRL.value = data.Tipo_cedula_rep;
      cedula_rep.value = data.Cedula_rep;
      telefono_rep.value = data.Telefono_rep;
    }
  } catch (error) {
    Swal.fire({
      title: "El cliente no existe!",
      text: "Crea el cliente para continuar",
      icon: "error",
    });
  }
}

interface Estado {
  Nombre: string;
  ID_states: string;
}
// api get
async function getEstados() {
  try {
    const { data } = await axios.get(`${baseUrlEstado}/masterStates`);
    info_estado.value = data.map((estados: Estado) => ({
      title: estados.Nombre,
      value: estados.ID_states,
    }));
    
  } catch (error) {
    console.log(error);
  }
}

interface Ciudad {
  Nombre: string;
  ID_city: number;
}
interface Muni {
  Nombre: string;
  ID_municipio: number;
}

const deliveryCDD = ref([
  {
    title: 'ZOOM',
    value: 1
  },
  {
    title: 'ZOOM TIENDA',
    value: 3
  }
]) 

const getSelect = async () => {

  watch(estado, (newValue, oldValue) => {
    if (newValue !== oldValue) {
      municipio.value = null;
      ciudad.value = null;
    }
  });

  if (estado.value) {
    const { data:municipio } = await axios.get(`${baseUrlMunicipio}/filterMunicipality/${estado.value}`);
    info_muni.value = municipio[0].map((muni: Muni) => ({
      title: muni.Nombre,
      value: muni.ID_municipio,
    }));
  }
  
}

const getSelectTwo = async () => {

  watch(municipio, (newValue, oldValue) => {
    if (newValue !== oldValue) {
      ciudad.value = null;
    }
  });

  if (municipio.value) {
    const { data:ciudad } = await axios.get(`${baseUrlCiudad}/filterCities/${municipio.value}`);
    info_ciudad.value = ciudad[0].map((ciudad: Ciudad) => ({
      title: ciudad.Nombre,
      value: ciudad.ID_city,
    }));
    
  }
}

// Representante legal
interface CiudadRl {
  Nombre: string;
  ID_city: number;
}
interface MuniRl {
  Nombre: string;
  ID_municipio: number;
}
interface EstadoRL {
  Nombre: string;
  ID_states: string;
}
// api get
async function getEstadosRL() {
  try {
    const { data } = await axios.get(`${baseUrlEstado}/masterStates`);
    info_estadoRl.value = data.map((estadosrl: EstadoRL) => ({
      title: estadosrl.Nombre,
      value: estadosrl.ID_states,
    }));
    
  } catch (error) {
    console.log(error);
  }
}

const getSelectRL = async () => {
  
  watch(estado_rep, (newValue, oldValue) => {
    if (newValue !== oldValue) {
      municipio_rep.value = null;
      ciudad_rep.value = null;
    }
  });

  const { data } = await axios.get(`${baseUrlMunicipio}/filterMunicipality/${estado_rep.value}`);
  info_muniRl.value = data[0].map((munirl: MuniRl) => ({
    title: munirl.Nombre,
    value: munirl.ID_municipio,
  }));
}

const getSelectTwoRL = async () => {

  watch(municipio_rep, (newValue, oldValue) => {
    if (newValue !== oldValue) {
      ciudad_rep.value = null;
    }
  });

  const { data:ciudad } = await axios.get(`${baseUrlCiudad}/filterCities/${municipio_rep.value}`);
  info_ciudadRl.value = ciudad[0].map((ciudadrl: CiudadRl) => ({
    title: ciudadrl.Nombre,
    value: ciudadrl.ID_city,
  }));
}


interface Destino {
  Sucursal: string;
  ID_sucursal: number;
}
async function getSucursal() {
  try {
    const { data } = await axios.get(`${baseUrlStore}/masterStores`);
   
    info_tiendas.value = data[0]
    .filter((destino: Destino) => destino.ID_sucursal !== 1) 
    .map((destino: Destino) => ({
      title: destino.Sucursal,
      value: destino.ID_sucursal,
    }));
  } catch (error) {
    console.log(error);
  }
}

interface Delivery {
  Delivery_type: string;
  ID_Delivery: number;
}

async function getDelivery() {
  try {
    const { data } = await axios.get(`${baseUrlDelivery}/masterDelivery`);
    info_Delivery.value = data.map((delivery: Delivery) => ({
      title: delivery.Delivery_type,
      value: delivery.ID_Delivery,
    }));
    
  } catch (error) {
    console.log(error);
  }
}

interface Payment {
  Pago: string;
  ID_pago: number;
}
async function getPayment() {
  try {
    const { data } = await axios.get(`${baseUrlPayment}/masterPayment`);
    info_Payment.value = data.map((payment: Payment) => ({
      title: payment.Pago,
      value: payment.ID_pago,
    }));
  } catch (error) {
    console.log(error);
  }
}

interface Zoom {
  SucursalZoom: string;
  Sucursal: string;
}
async function getZoom() {
  try {
    const { data } = await axios.get(`${baseUrlStore}/masterStores`);
    info_Zoom.value = data[0].map((zoom: Zoom) => ({
      title: zoom.Sucursal,
      value: zoom.SucursalZoom,
    }));
  } catch (error) {
    console.log(error);
  }
}

interface Document {
  file: File;
  type: string;
  mode: string;
}
// api post
async function handleFormComanda() {
  let porcentajeValue = porcentaje.value ? porcentaje.value : 0;

  const jsonData = {
    Id_Comanda: id.value,
    ID_rol: ID_rol.value,
    origen: origen.value,
    tipo: tipo.value,
    cedulaUno: cedulaUno.value,
    email: email.value,
    nombreCompleto: nombreCompleto.value,
    estado: estado.value,
    ciudad: ciudad.value,
    municipio: municipio.value,
    ID_delivery: ID_Delivery.value,
    direccion: direccion.value,
    referencia: referencia.value,
    direccionEnvio: ID_Delivery.value === 3 ? null : direccionEnvio.value,
    referenciaEnvio: ID_Delivery.value === 3 ? null : referenciaEnvio.value,
    sucursalZoom: ID_Delivery.value === 1 || ID_Delivery.value === 2 || ID_Delivery.value === 4 ? null : direccionZoom.value,
    autorizado: autorizado.value.toString(),
    cedulaDos: autorizado.value === false ? null : cedulaDos.value,
    nombreDos: autorizado.value === false ? null : nombreDos.value,
    telefonoDos: autorizado.value === false ? null : telefonoDos.value,
    telefonoUno: telefonoUno.value,
    ID_pago: pagosArray.value,
    ID_ticket: ID_ticket.value,
    // ID_status: ID_status.value,
    retencion: tipo.value === "NATURAL" ? "false" : retencion.value.toString(),
    porcentaje: tipo.value === "NATURAL" ? null : porcentajeValue,
    user_mod: user_mod.value,
    tipo_cedula: tipoDocumento.value,
    Tipo_cedula_rep: tipo.value === "NATURAL" ? null : tipoDocumentoRL.value,
    razonComercial: tipo.value === "NATURAL" ? null : razonComercial.value,
    nombre_rep: tipo.value === "NATURAL" ? null : Nombre_rep.value,
    cedula_rep: tipo.value === "NATURAL" ? null : cedula_rep.value,
    email_rep: tipo.value === "NATURAL" ? null : email_rep.value,
    telefono_rep: tipo.value === "NATURAL" ? null : telefono_rep.value,
    estado_rep: tipo.value === "NATURAL" ? null : estado_rep.value,
    ciudad_rep: tipo.value === "NATURAL" ? null : ciudad_rep.value,
    municipio_rep: tipo.value === "NATURAL" ? null : municipio_rep.value,
  };

  // ACTUALIZAMOS PRIMERO LA DATA DEL FORMULARIO
  try {
    await axios.put(`${baseUrl}/updateOrder/${id.value}`, jsonData);
  } catch (error) {
    toast.error(
      "Ocurrio un error al momento de actualizar los datos de la comanda",
      {
        position: toast.POSITION.TOP_CENTER,
        transition: toast.TRANSITIONS.ZOOM,
        autoClose: 4000,
        theme: "colored",
        toastStyle: {
          fontSize: "16px",
          opacity: "1",
        },
      }
    );
  }

  const formDataDocuments = new FormData();

  // filtramos solos los item tipo insert
  itemDocument.value = itemDocument.value.filter(
    (item) => item.mode === INSERT_METHOD
  );

  for (let i = 0; i < itemDocument.value.length; i++) {
    const file = itemDocument.value[i].file;
    const type = itemDocument.value[i].type;
    const mode = itemDocument.value[i].mode;

    formDataDocuments.append("doc_file", file);
    formDataDocuments.append(`typeDoc_${i}`, type);
    formDataDocuments.append(`user_${i}`, user_mod.value);
  }
  try {

    await axios.post(
      `${baseUrl}/createOrderDocument/${id.value}/${idComanda.value}`,
      formDataDocuments
    );
  } catch (error) {
    toast.error(
      "Ocurrio un error al momento de registrar los datos de los archivos",
      {
        position: toast.POSITION.TOP_CENTER,
        transition: toast.TRANSITIONS.ZOOM,
        autoClose: 4000,
        theme: "colored",
        toastStyle: {
          fontSize: "16px",
          opacity: "1",
        },
      }
    );
  }
}

// Function para enviar form
async function validate() {

  // VALIDAMOS PRIMERO QUE EXISTAN LOS DOCUMENTOS CON SUS RESPECTIVOS TIPO DE DOCUMENTOS
  const isvalidateDocuments = validateDocuments();
  if (isvalidateDocuments)
    // Alerta
    Swal.fire({
      title: `Actualizar Comanda`,
      text: "¿Desea guardar estos datos?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, Guardar!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleFormComanda();
        Swal.fire({
          title: "Guardado!",
          text: "Datos actualizados con exito!",
          icon: "success",
        })
        handleProductUpdate();
      }
    });
}

const handleProductUpdate = () => {
  router.push(`/addArticulos/${id.value}/${true}`);
};

function handleSelectImages(items: any) {
  itemDocument.value = items;
}

function validateDocuments(): boolean {
  let isvalidate = true;

  if (itemDocument.value.length <= 0) {
    toast.error("Error: Debes seleccionar al menos un archivo", {
      position: toast.POSITION.TOP_CENTER,
      transition: toast.TRANSITIONS.ZOOM,
      autoClose: 4000,
      theme: "colored",
      toastStyle: {
        fontSize: "16px",
        opacity: "1",
      },
    });

    isvalidate = false;
  } else {
    itemDocument.value.forEach((element) => {
      if (element.type === null) {
        isvalidate = false;
      }
    });

    if (!isvalidate)
      toast.warn(`Error: Seleccione el tipo de documento`, {
        delay: 1000,
        position: toast.POSITION.BOTTOM_CENTER,
        transition: toast.TRANSITIONS.ZOOM,
        theme: "dark",
        autoClose: 3000,
      });
  }

  return isvalidate;
}

onMounted(async () => {
  await getOrder();
  await getEstados();
  await getSelect();
  await getSelectTwo();
  await getEstadosRL();
  await getSelectRL();
  await getSelectTwoRL();
  
  
});
onMounted(async () => {
  await getSucursal();
});
onMounted(async () => {
  await getDelivery();
});
onMounted(async () => {
  await getPayment();
});
onMounted(async () => {
  await getZoom();
});
</script>

<template>
  <Form
    @submit="validate"
    enctype="multipart/form-data"
    class="mt-3"
    v-slot="{ isSubmitting }"
  >
    <!-- /////////////////////////////////////// CLIENTE ///////////////////////////////////////////////////// -->
    <v-row>
      <v-col cols="12" md="11">
        <h4>Paso 1</h4>
      </v-col>
      <!-- <v-col cols="12" md="1">
        <v-btn :disabled="!cedulaUno" color="primary" @click="searchModel">Buscar</v-btn>
      </v-col> -->
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <v-label for="tipo">Tipo<span class="red">*</span></v-label>
        <v-autocomplete
          id="tipo"
          placeholder="Tipo de cliente"
          class="mt-2 my-input"
          clearable
          chips
          :items="['NATURAL', 'JURIDICO']"
          variant="outlined"
          :rules="tipoRules"
          aria-label="Name Documents"
          color="primary"
          v-model="tipo"
          :disabled="Status != 1 && Status != 10"
        >
        </v-autocomplete>
      </v-col>

      <v-col cols="12" md="2">
        <v-label for="tipoDocumento"></v-label>
        <v-autocomplete
          id="tipoDocumento"
          :items="['V', 'P', 'E', 'J', 'G']"
          variant="outlined"
          v-model="tipoDocumento"
          required
          color="primary"
          placeholder="V"
          :rules="TipoDocumentoRules"
          class="mt-2 my-input"
          :disabled="Status != 1 && Status != 10"
        >
        </v-autocomplete>
      </v-col>

      <v-col cols="12" md="6">
        <v-label for="cedulaUno">Cedula/Rif<span class="red">*</span></v-label>
        <v-text-field
          id="cedulaUno"
          type="number"
          placeholder="Cedula/Rif"
          variant="outlined"
          aria-label="Name Documents"
          class="mt-2 my-input"
          v-model="cedulaUno"
          :rules="CedulaUnoRules"
          color="primary"
          :disabled="Status != 1 && Status != 10"
        >
        </v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <v-label for="email">Email<span class="red">*</span></v-label>
        <v-text-field
          id="email"
          type="email"
          placeholder="EJEMPLO@TIENDASDAKA.COM"
          variant="outlined"
          aria-label="Name Documents"
          class="mt-2 my-input"
          :rules="emailRules"
          v-model="email"
          color="primary"
          :disabled="Status != 1 && Status != 10"
        >
        </v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-label for="name" v-if="tipo === 'JURIDICO'">Razon Social<span class="red">*</span></v-label>
        <v-label for="name" v-else-if="tipo === 'NATURAL'">Nombre Completo<span class="red">*</span></v-label>
        <v-label for="name" v-else>Nombre Completo<span class="red">*</span></v-label>
        <v-text-field
          id="name"
          type="text"
          placeholder="Tiendas Dakas"
          variant="outlined"
          aria-label="Name Documents"
          class="mt-2 my-input"
          :rules="nombreCompletoRules"
          v-model="nombreCompleto"
          color="primary"
          :disabled="Status != 1 && Status != 10"
        >
        </v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-label for="telefonoCliente">Telefono<span class="red">*</span></v-label>
        <v-text-field
          id="telefonoCliente"
          type="number"
          placeholder="Numero Telefonico del cliente"
          variant="outlined"
          class="mt-2 my-input"
          :rules="telefonoRules"
          v-model="telefonoUno"
          color="primary"
          :disabled="Status != 1 && Status != 10"
        >
        </v-text-field>
      </v-col>
    </v-row>

    <v-row v-if="tipo === 'JURIDICO'">
      <v-col cols="12" md="1">
        <v-label for="retencion">Retención<span class="red">*</span></v-label>
        <v-switch
          id="retencion"
          class="mt-3 my-input"
          v-model="retencion"
          color="warning"
          :disabled="Status != 1 && Status != 10"
        ></v-switch>
      </v-col>

      <v-col cols="12" md="3">
        <v-label for="porcentaje"></v-label>
        <v-autocomplete
          prepend-icon="mdi-percent-outline"
          id="porcentaje"
          placeholder="%"
          :items="['75', '100']"
          variant="outlined"
          v-model="porcentaje"
          required
          color="primary"
          class="mt-2 my-input"
          :disabled="Status != 1 && Status != 10"
        >
        </v-autocomplete>
      </v-col>

      <v-col cols="12" md="4">
        <v-label for="razonComercial">Razon Comercial<span class="red">*</span></v-label>
        <v-text-field
          id="razonComercial"
          type="text"
          placeholder="Razon Comercial"
          variant="outlined"
          aria-label="Name Documents"
          class="mt-2 my-input"
          v-model="razonComercial"
          color="primary"
          :disabled="Status != 1 && Status != 10"
        >
        </v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <v-label for="estado">Estado<span class="red">*</span></v-label>
        <v-autocomplete
          id="estado"
          placeholder="Seleccione el estado"
          class="mt-2 my-input"
          clearable
          chips
          :items="info_estado"
          variant="outlined"
          :rules="estadosRules"
          aria-label="Name Documents"
          color="primary"
          v-model="estado"
          @update:modelValue="getSelect"
          :disabled="Status != 1 && Status != 10"
        >
        </v-autocomplete>
      </v-col>

      <v-col cols="12" md="4">
        <v-label for="municipio">Municipio<span class="red">*</span></v-label>
        <v-autocomplete
          id="municipio"
          placeholder="Seleccione el municipio"
          class="mt-2 my-input"
          clearable
          chips
          :items="info_muni"
          variant="outlined"
          :rules="municipioRules"
          aria-label="Name Documents"
          color="primary"
          v-model="municipio"
          @update:modelValue="getSelectTwo"
          :disabled="Status != 1 && Status != 10"
        >
        </v-autocomplete>
      </v-col>

      <v-col cols="12" md="4">
        <v-label for="ciudad">Ciudad<span class="red">*</span></v-label>
        <v-autocomplete
          id="ciudad"
          placeholder="Seleccione la ciudad"
          class="mt-2 my-input"
          clearable
          chips
          :items="info_ciudad"
          variant="outlined"
          :rules="ciudadRules"
          aria-label="Name Documents"
          color="primary"
          v-model="ciudad"
          :disabled="Status != 1 && Status != 10"
        >
        </v-autocomplete>
      </v-col>
      <v-col cols="12" md="6">
        <v-label for="direccion">Direccion completa del cliente<span class="red">*</span></v-label>
        <v-text-field
          id="direccion"
          type="text"
          placeholder="Direccion Completa"
          variant="outlined"
          aria-label="Name Documents"
          class="mt-2 my-input"
          v-model="direccion"
          :rules="direccionRules"
          color="primary"
          :disabled="Status != 1 && Status != 10"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-label for="referencia">Referencia<span class="red">*</span></v-label>
        <v-text-field
          id="referencia"
          type="text"
          placeholder="Referencia del delivery"
          variant="outlined"
          aria-label="Name Documents"
          class="mt-2 my-input"
          :rules="referenciaRules"
          v-model="referencia"
          color="primary"
          :disabled="Status != 1 && Status != 10"
        ></v-text-field>
      </v-col>
    </v-row>
    <br />

    <!-- ////////////////////////////////// Representante legal //////////////////////////////////////////// -->
    <div v-if="tipo === 'JURIDICO'">
      <v-divider></v-divider>
      <br />
      <h4>Datos del Representante Legal</h4>
      <v-row>
        <v-col cols="12" md="2">
          <v-label for="tipoDocumento"></v-label>
          <v-autocomplete
            id="tipoDocumento"
            :items="['V', 'J', 'F', 'E']"
            variant="outlined"
            v-model="tipoDocumentoRL"
            required
            color="primary"
            placeholder="V"
            class="mt-2 my-input"
            :disabled="Status != 1 && Status != 10"
          >
          </v-autocomplete>
        </v-col>

        <v-col cols="12" md="6">
          <v-label for="cedulaUno">Cedula/Rif<span class="red">*</span></v-label>
          <v-text-field
            id="cedulaUno"
            type="number"
            placeholder="Cedula/Rif"
            variant="outlined"
            aria-label="Name Documents"
            class="mt-2 my-input"
            v-model="cedula_rep"
            :rules="CedulaUnoRules"
            color="primary"
            :disabled="Status != 1 && Status != 10"
          >
          </v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-label for="email">Email del Representante<span class="red">*</span></v-label>
          <v-text-field
            id="email"
            type="email"
            placeholder="ejmeplo@tiendasdaka.com"
            variant="outlined"
            aria-label="Name Documents"
            class="mt-2 my-input"
            :rules="emailRules"
            v-model="email_rep"
            color="primary"
            :disabled="Status != 1 && Status != 10"
          >
          </v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-label for="name">Nombre Completo del Representante<span class="red">*</span></v-label>
          <v-text-field
            id="name"
            type="text"
            placeholder="Nombre Completo"
            variant="outlined"
            aria-label="Name Documents"
            class="mt-2 my-input"
            :rules="nombreCompletoRules"
            v-model="Nombre_rep"
            color="primary"
            :disabled="Status != 1 && Status != 10"
          >
          </v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-label for="telefonoCliente">Telefono del Representante<span class="red">*</span></v-label>
          <v-text-field
            id="telefonoCliente"
            type="number"
            placeholder="Numero Telefonico del cliente"
            variant="outlined"
            class="mt-2 my-input"
            :rules="telefonoRules"
            v-model="telefono_rep"
            color="primary"
            :disabled="Status != 1 && Status != 10"
          >
          </v-text-field>
        </v-col>

        <v-col cols="12" md="4">
            <v-label for="estado">Estado<span class="red">*</span></v-label>
            <v-autocomplete
              id="estado"
              placeholder="Seleccione el estado"
              class="mt-2 my-input"
              clearable
              chips
              :items="info_estadoRl"
              variant="outlined"
              :rules="estadosRules"
              aria-label="Name Documents"
              color="primary"
              v-model="estado_rep"
              @update:modelValue="getSelectRL"
              :disabled="Status != 1 && Status != 10"
            >
            </v-autocomplete>
          </v-col>

          <v-col cols="12" md="4">
            <v-label for="municipio">Municipio<span class="red">*</span></v-label>
            <v-autocomplete
              id="municipio"
              placeholder="Seleccione el municipio"
              class="mt-2 my-input"
              clearable
              chips
              :items="info_muniRl"
              variant="outlined"
              :rules="municipioRules"
              aria-label="Name Documents"
              color="primary"
              v-model="municipio_rep"
              @update:modelValue="getSelectTwoRL"
              :disabled="Status != 1 && Status != 10"
            >
            </v-autocomplete>
          </v-col>

          <v-col cols="12" md="4">
            <v-label for="ciudad">Ciudad<span class="red">*</span></v-label>
            <v-autocomplete
              id="ciudad"
              placeholder="Seleccione la ciudad"
              class="mt-2 my-input"
              clearable
              chips
              :items="info_ciudadRl"
              variant="outlined"
              :rules="ciudadRules"   
              aria-label="Name Documents"
              color="primary"
              v-model="ciudad_rep"
              :disabled="Status != 1 && Status != 10"
            >
            </v-autocomplete>
          </v-col>
      </v-row>
    </div>
    <br />
    <!-- /////////////////////////////////////// Representante legal ////////////////////////////////////////// -->

    <!-- /////////////////////////////////////// COMANDA ///////////////////////////////////////////////////// -->
    <v-divider></v-divider>
    <br />
    <h4>Paso 2</h4>
    <v-row>
      <v-col cols="12" md="8">
        <v-label for="origen">Destino<span class="red">*</span></v-label>
        <v-autocomplete
          id="origen"
          placeholder="Destino de la comanda"
          class="mt-2 my-input"
          clearable
          chips
          :items="info_tiendas"
          variant="outlined"
          :rules="origenRules"
          aria-label="Name Documents"
          color="primary"
          v-model="origen"
          :disabled="Status != 1 && Status != 10"
        >
        </v-autocomplete>
      </v-col>

      <v-col cols="12" md="4">
        <v-label for="delivery">Delivery<span class="red">*</span></v-label>

        <v-autocomplete
          id="delivery"
          placeholder="Seleccione el tipo de delivery"
          class="mt-2 my-input"
          clearable
          chips
          :items="origen == 99 ? deliveryCDD : info_Delivery"
          variant="outlined"
          :rules="metodoRules"
          aria-label="delivery"
          color="primary"
          v-model="ID_Delivery"
          :disabled="Status != 1 && Status != 10"
        >
        
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-row v-if="ID_Delivery === 1 || ID_Delivery === 4">
      <v-col cols="12" md="6">
        <v-label for="direccion">Direccion completa del envio<span class="red">*</span></v-label>
        <v-text-field
          id="direccion"
          type="text"
          placeholder="Direccion Completa"
          variant="outlined"
          aria-label="Name Documents"
          class="mt-2 my-input"
          v-model="direccionEnvio"
          :rules="direccionRules"
          color="primary"
          :disabled="Status != 1 && Status != 10"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-label for="referencia">Referencia<span class="red">*</span></v-label>
        <v-text-field
          id="referencia"
          type="text"
          placeholder="Referencia del delivery"
          variant="outlined"
          aria-label="Name Documents"
          class="mt-2 my-input"
          :rules="referenciaRules"
          v-model="referenciaEnvio"
          color="primary"
          :disabled="Status != 1 && Status != 10"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12" v-if="ID_Delivery === 3">
        <v-label for="direccion">Direccion del Delivery<span class="red">*</span></v-label>
        <v-autocomplete
          id="direccion"
          placeholder="Seleccione la Direccion del Delivery"
          class="mt-2 my-input"
          clearable
          chips
          :items="info_Zoom"
          variant="outlined"
          aria-label="delivery"
          color="primary"
          v-model="direccionZoom"
          :disabled="Status != 1 && Status != 10"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      
      <v-col cols="12" md="3">
        <v-label for="autorizado">Autorizado para recibir el envio</v-label>
        <v-switch v-model="autorizado" color="primary" :disabled="Status != 1 && Status != 10"></v-switch>
      </v-col>

      <v-col cols="12" md="4" v-if="autorizado == true">
        <v-label for="nombreDos">Nombre del Autorizado<span class="red">*</span></v-label>
        <v-text-field
          id="nombreDos"
          type="text"
          placeholder="Nombre del autorizado"
          variant="outlined"
          aria-label="Name Documents"
          class="mt-2 my-input"
          v-model="nombreDos"
          :rules="autorizadoRules"
          color="primary"
          :disabled="Status != 1 && Status != 10"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="4" v-if="autorizado == true">
        <v-label for="cedulaDos">Cedula/Rif del Autorizado<span class="red">*</span></v-label>
        <v-text-field
          id="cedulaDos"
          type="number"
          placeholder="Referencia del delivery"
          variant="outlined"
          aria-label="Name Documents"
          class="mt-2 my-input"
          v-model="cedulaDos"
          :rules="cedulaDosRules"
          color="primary"
          :disabled="Status != 1 && Status != 10"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="5" v-if="autorizado == true">
        <v-label for="telefono">Telefono del Autorizado<span class="red">*</span></v-label>
        <v-text-field
          id="telefono"
          type="number"
          placeholder="Telefono del autorizado"
          variant="outlined"
          class="mt-2 my-input"
          :rules="telefonoRules"
          v-model="telefonoDos"
          color="primary"
          :disabled="Status != 1 && Status != 10"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-label for="medioPago">Medio de Pago<span class="red">*</span></v-label>
        <v-autocomplete
          id="medioPago"
          placeholder="Seleccione el tipo de pago"
          class="mt-2 my-input"
          clearable
          chips
          :items="info_Payment"
          variant="outlined"
          :rules="metodoRules"
          aria-label="pago"
          color="primary"
          v-model="pagosArray"
          multiple
          :disabled="Status != 1 && Status != 10"
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" md="6">
        <v-label for="creado">Modificado Por</v-label>
        <v-text-field
          disabled
          id="creado"
          placeholder="Creado por"
          variant="outlined"
          required
          aria-label="Name Documents"
          class="mt-2 my-input"
          v-model="user_mod"
          color="primary"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-label for="referencia">Ticket Zendesk<span class="red">*</span></v-label>
        <v-text-field
          id="referencia"
          type="text"
          placeholder="ID Ticket Zendesk"
          variant="outlined"
          aria-label="Name Documents"
          class="mt-2 my-input"
          :rules="ticketRules"
          v-model="ID_ticket"
          color="primary"
          :disabled="Status != 1 && Status != 10"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- COMPONENTE QUE PERMITE AGREGAR LOS ARCHIVOS DE IMAGENES -->
    <UploadImages @isSelectImages="handleSelectImages" :ID_detalle="id" />

    <v-btn
      color="primary"
      :loading="isSubmitting"
      append-icon="mdi-arrow-right"
      class="mt-6"
      variant="flat"
      size="large"
      :disabled="
        !origen ||
        !tipo ||
        !cedulaUno ||
        !estado ||
        !ciudad ||
        !municipio ||
        !email ||
        !nombreCompleto ||
        !telefonoUno ||
        !ID_pago"
      type="submit"
    >
      Actualizar
    </v-btn>

    <v-btn
      class="mt-6 mx-1"
      variant="flat"
      append-icon="mdi-arrow-right"
      size="large"
      color="warning"
      @click="handleProductUpdate"
      >Detalle Articulos
    </v-btn>
  </Form>
</template>

<style lang="scss">
.loginForm {
  .v-text-field .v-field--active input {
    font-weight: 500;
  }
}

.logoDakaLogin {
  margin-left: 95px;
}

.my-input input {
  text-transform: uppercase;
}
.red{
  color: red;
  font-size: 16px;
}
</style>
