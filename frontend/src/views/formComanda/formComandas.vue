<script setup lang="ts">
import { Form } from "vee-validate";
import { ref, watch, onMounted } from "vue";
import Swal from "sweetalert2";
import axios from "axios";
import { router } from "@/router";
import UploadImages from "./uploadImages.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useAddDocument } from "@/composables/addDocuments";
import { useUploadFiles } from "@/composables/file";


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
const direccionZoom = ref();
const referencia = ref("");
const autorizado = ref(false);
const nombreDos = ref("");
const cedulaDos = ref("");
const telefonoUno = ref("");
const telefonoDos = ref("");
const ID_pago = ref();
const user_crea = ref();
const doc_file = ref();
const info_estado = ref();
const info_muni = ref();
const info_ciudad = ref();
const info_muniRl = ref();
const info_ciudadRl = ref();
const ID_status = ref("1");
const idComandaRandom = ref();
const deliveryZoom = ref();
const info_Zoom = ref();
const porcentaje = ref();
const retencion = ref(false);
const ID_Delivery = ref();
const info_tiendas = ref();
const info_Delivery = ref();
const info_Payment = ref();
const valorSeleccionado = ref();
const valorSeleccionadoTwo = ref();
const valorSeleccionadoRl = ref();
const valorSeleccionadoTwoRl = ref();
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
const idOrder = ref();
const Id_sucursal= ref();
// URL
const baseUrl = `${import.meta.env.VITE_URL}/api/orders`;
const baseUrlEstado = `${import.meta.env.VITE_URL}/api/states`;
const baseUrlCiudad = `${import.meta.env.VITE_URL}/api/cities`;
const baseUrlMunicipio = `${import.meta.env.VITE_URL}/api/municipalities`;
const baseUrlStore = `${import.meta.env.VITE_URL}/api/stores`;
const baseUrlClients = `${import.meta.env.VITE_URL}/api/clients`;
const baseUrlDelivery = `${import.meta.env.VITE_URL}/api/delivery`;
const baseUrlPayment = `${import.meta.env.VITE_URL}/api/payment`;


// Localstorage
const jsonFromLocalStorage = sessionStorage.getItem("user");
if (jsonFromLocalStorage !== null) {
  const parsedData = JSON.parse(jsonFromLocalStorage);
  user_crea.value = parsedData.data.Nombre;
  ID_rol.value = parsedData.data.ID_rol;
  Id_sucursal.value = parsedData.data.Id_sucursal;

}

/// validaciones
const origenRules = ref([(v: string) => !!v || "El origen del cliente es requerido",]);
const tipoRules = ref([(v: string) => !!v || "El tipo de cliente es requerido",]);
const emailRules = ref([(v: string) => !!v || "El email es requerido",(v: string) => /.+@.+\..+/.test(v) || "El email debe ser válido",]);
const CedulaUnoRules = ref([(v: string) => !!v || "La cedula/rif del cliente es requerido",]);
const nombreCompletoRules = ref([(v: string) => !!v || "El nombre del cliente es requerido",]);
const estadosRules = ref([(v: any) => !!v || "El estado es requerido"]);
const municipioRules = ref([(v: any) => !!v || "El municipio es requerido"]);
const ciudadRules = ref([(v: any) => !!v || "El ciudad es requerido"]);
const direccionRules = ref([(v: string) => !!v || "La direccion completa es requerido",]);
const referenciaRules = ref([(v: string) => !!v || "La referencia del delivery es requerido"]);
const autorizadoRules = ref([(v: string) => !!v || "La persona autorizada es requerida",]);
const cedulaDosRules = ref([(v: string) => !!v || "La cedula de la persona autorizada es requerida",]);
const nombreDosRules = ref([(v: string) => !!v || "El nombre de la persona autorizada es requerida",]);
const telefonoRules = ref([(v: string) => !!v || "El telefono de la persona autorizada es requerida",]);
const metodoRules = ref([(v: string) => !!v || "El metodo de pago es requerida",]);
const fileRules = ref([(v: any) => !!v || "El archivo es requerido"]);
const TipoDocumentoRules = ref([(v: any) => !!v || "El tipo de documento es requerido",]);

// api post
async function Created(json: any) {
  try {
    const respuesta = await axios.post(`${baseUrl}/createOrder`, json);
    if(respuesta){
      let rta = await respuesta.data.order.ID_order
      return rta
    }
  } catch (error) {
    console.log(error);
  }
}


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

const getSelect = async () => {

  municipio.value = null
  ciudad.value = null
  valorSeleccionado.value = estado.value

  if (valorSeleccionado.value) {
    const { data:municipio } = await axios.get(`${baseUrlMunicipio}/filterMunicipality/${valorSeleccionado.value}`);
    info_muni.value = municipio[0].map((muni: Muni) => ({
      title: muni.Nombre,
      value: muni.ID_municipio,
    }));
  } else {
    // Si no se selecciona ningún estado, vacía la lista 
    info_muni.value = [];
    info_ciudad.value = [];
  }
}

const getSelectTwo = async () => {
  ciudad.value = null
  valorSeleccionadoTwo.value = municipio.value
  if (valorSeleccionadoTwo.value) {
    const { data:ciudad } = await axios.get(`${baseUrlCiudad}/filterCities/${valorSeleccionadoTwo.value}`);
    info_ciudad.value = ciudad[0].map((ciudad: Ciudad) => ({
      title: ciudad.Nombre,
      value: ciudad.ID_city,
    }));
  } else {
    // Si no se selecciona ningún estado, vacía la lista 
    info_ciudad.value = [];
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

const getSelectRL = async () => {
  municipio_rep.value = null
  ciudad_rep.value = null
  valorSeleccionadoRl.value = estado_rep.value

  if (valorSeleccionadoRl.value) {
    const { data:municipio } = await axios.get(`${baseUrlMunicipio}/filterMunicipality/${valorSeleccionadoRl.value}`);
    info_muniRl.value = municipio[0].map((munirl: MuniRl) => ({
      title: munirl.Nombre,
      value: munirl.ID_municipio,
    }));
  } else {
    // Si no se selecciona ningún estado, vacía la lista 
    info_muniRl.value = [];
    info_ciudadRl.value = [];
  }
}

const getSelectTwoRl = async () => {
  ciudad_rep.value = null
  valorSeleccionadoTwoRl.value = municipio_rep.value
  if (valorSeleccionadoTwoRl.value) {
    const { data:ciudad } = await axios.get(`${baseUrlCiudad}/filterCities/${valorSeleccionadoTwoRl.value}`);
    info_ciudadRl.value = ciudad[0].map((ciudadrl: CiudadRl) => ({
      title: ciudadrl.Nombre,
      value: ciudadrl.ID_city,
    }));
  } else {
    // Si no se selecciona ningún estado, vacía la lista 
    info_ciudadRl.value = [];
  }
}

interface Destino {
  Sucursal: string;
  ID_sucursal: number;
}
async function getSucursal() {
  try {
    const { data } = await axios.get(`${baseUrlStore}/masterStores`);
    info_tiendas.value = data[0]
      .filter((destino: Destino) => destino.ID_sucursal !== Id_sucursal.value)
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

// Capturar la imagen
const File = (event: any) => {
  doc_file.value = event.target.files[0];
};

// api post
async function handleFormComanda() {
  let porcentajeValue = porcentaje.value ? porcentaje.value : 0;
  const jsonData = {
    Id_Comanda: idComandaRandom.value,
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
    direccion: ID_Delivery.value === 3 ? null : direccion.value,
    referencia: ID_Delivery.value === 3 ? null : referencia.value,
    sucursalZoom:
      ID_Delivery.value === 1 ||
      ID_Delivery.value === 2 ||
      ID_Delivery.value === 4 ? null : direccionZoom.value,
    autorizado: autorizado.value.toString(),
    cedulaDos: autorizado.value === false ? null : cedulaDos.value,
    nombreDos: autorizado.value === false ? null : nombreDos.value,
    telefonoDos: autorizado.value === false ? null : telefonoDos.value,
    telefonoUno: telefonoUno.value,
    ID_pago: ID_pago.value,
    ID_status: ID_status.value,
    retencion: tipo.value === "NATURAL" ? "false" : retencion.value.toString(),
    porcentaje: tipo.value === "NATURAL" ? null : porcentajeValue,
    user_crea: user_crea.value,
    tipo_cedula: tipoDocumento.value,
    Tipo_cedula_rep: tipo.value === "NATURAL" ? null : tipoDocumentoRL.value,
    razonComercial: tipo.value === "NATURAL" ? null : razonComercial.value,
    Nombre_rep: tipo.value === "NATURAL" ? null : Nombre_rep.value,
    cedula_rep: tipo.value === "NATURAL" ? null : cedula_rep.value,
    email_rep: tipo.value === "NATURAL" ? null : email_rep.value,
    telefono_rep: tipo.value === "NATURAL" ? null : telefono_rep.value,
    estado_rep: tipo.value === "NATURAL" ? null : estado_rep.value,
    ciudad_rep: tipo.value === "NATURAL" ? null : ciudad_rep.value,
    municipio_rep: tipo.value === "NATURAL" ? null : municipio_rep.value,
  };

  let rta = await Created(jsonData);
  useAddDocument(itemDocument.value, idComandaRandom.value, rta); //Visualizan y agregan  archivos
}

// Function para enviar form
/* eslint-disable @typescript-eslint/no-explicit-any */
async function validate() {
  // VALIDAMOS PRIMERO QUE EXISTAN LOS DOCUMENTOS CON SUS RESPECTIVOS TIPO DE DOCUMENTOS
  // const isvalidateDocuments = validateDocuments()

  // if (isvalidateDocuments)
  const { isvalidate } = useUploadFiles(itemDocument.value); //Verificamos los tipos de documentos

  if (isvalidate)
    // Alerta
    Swal.fire({
      title: `Comanda Generada`,
      text: "¿Desea guardar estos datos?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, Guardar!",
    }).then((result) => {
      if (result.isConfirmed) {
        // const respuesta = Created(formData);
        const respuesta = handleFormComanda();
        Swal.fire({
          title: "Guardado!",
          text: "Datos guardados con exito!",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push(`/addArticulos/${idComandaRandom.value}`);
          }
        }); 
      }
    });
}

function generarCadenaAleatoria(longitud: number) {
  let caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let resultado = "";
  for (let i = 0; i < longitud; i++) {
    let indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    resultado += caracteres[indiceAleatorio];
  }
  return resultado;
}

onMounted(async () => {
  await getEstados();
  await getSucursal();
  await getDelivery();
  await getPayment();
  await getZoom();

  let cadenaAleatoria = generarCadenaAleatoria(20);
  idComandaRandom.value = cadenaAleatoria;
});

function handleSelectImages(items: any) {
  itemDocument.value = items;
}

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
      <v-col cols="12" md="1">
        <v-btn :disabled="!cedulaUno" color="primary" @click="searchModel"
          >Buscar</v-btn
        >
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <v-label for="tipo">Tipo</v-label>
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
        >
        </v-autocomplete>
      </v-col>

      <v-col cols="12" md="2">
        <v-label for="tipoDocumento"></v-label>
        <v-autocomplete
          id="tipoDocumento"
          :items="['V', 'J', 'G', 'E']"
          variant="outlined"
          v-model="tipoDocumento"
          required
          color="primary"
          placeholder="V"
          :rules="TipoDocumentoRules"
          class="mt-2 my-input"
        >
        </v-autocomplete>
      </v-col>

      <v-col cols="12" md="6">
        <v-label for="cedulaUno">Cedula/Rif</v-label>
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
        >
        </v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <v-label for="email">Email</v-label>
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
        >
        </v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-label for="name" v-if="tipo === 'JURIDICO'">Razon Social</v-label>
        <v-label for="name" v-else-if="tipo === 'NATURAL'"
          >Nombre Completo</v-label
        >
        <v-label for="name" v-else>Nombre Completo</v-label>
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
        >
        </v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-label for="telefonoCliente">Telefono</v-label>
        <v-text-field
          id="telefonoCliente"
          type="number"
          placeholder="Numero Telefonico del cliente"
          variant="outlined"
          class="mt-2 my-input"
          :rules="telefonoRules"
          v-model="telefonoUno"
          color="primary"
        >
        </v-text-field>
      </v-col>
    </v-row>

    <v-row v-if="tipo === 'JURIDICO'">
      <v-col cols="12" md="1">
        <v-label for="retencion">Retención</v-label>
        <v-switch
          id="retencion"
          class="mt-3"
          v-model="retencion"
          color="warning"
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
        >
        </v-autocomplete>
      </v-col>

      <v-col cols="12" md="4">
        <v-label for="razonComercial">Razon Comercial</v-label>
        <v-text-field
          id="razonComercial"
          type="text"
          placeholder="Razon Comercial"
          variant="outlined"
          aria-label="Name Documents"
          class="mt-2 my-input"
          v-model="razonComercial"
          color="primary"
        >
        </v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <v-label for="estado">Estado</v-label>
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
        >
        </v-autocomplete>
      </v-col>

      <v-col cols="12" md="4">
        <v-label for="municipio">Municipio</v-label>
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
        >
        </v-autocomplete>
      </v-col>

      <v-col cols="12" md="4">
        <v-label for="ciudad">Ciudad</v-label>
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
        >
        </v-autocomplete>
      </v-col>
    </v-row>
    <br />

    <!-- ////////////////////////////////// Representante legal //////////////////////////////////////////// -->
    <div v-if="tipo === 'JURIDICO'">
      <v-divider></v-divider>
      <br/>
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
            >
            </v-autocomplete>
          </v-col>

          <v-col cols="12" md="6">
            <v-label for="cedulaUno">Cedula/Rif</v-label>
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
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-label for="email">Email del Representante</v-label>
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
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-label for="name">Nombre Completo del Representante</v-label>
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
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-label for="telefonoCliente">Telefono del Representante</v-label>
            <v-text-field
              id="telefonoCliente"
              type="number"
              placeholder="Numero Telefonico del cliente"
              variant="outlined"
              class="mt-2 my-input"
              :rules="telefonoRules"
              v-model="telefono_rep"
              color="primary"
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-label for="estado">Estado</v-label>
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
              v-model="estado_rep"
              @update:modelValue="getSelectRL"
            >
            </v-autocomplete>
          </v-col>

          <v-col cols="12" md="4">
            <v-label for="municipio">Municipio</v-label>
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
              @update:modelValue="getSelectTwoRl"
            >
            </v-autocomplete>
          </v-col>

          <v-col cols="12" md="4">
            <v-label for="ciudad">Ciudad</v-label>
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
            >
            </v-autocomplete>
          </v-col>
      </v-row>
    </div>
    <br/>
    <!-- /////////////////////////////////////// Representante legal ////////////////////////////////////////// -->

    <!-- /////////////////////////////////////// COMANDA ///////////////////////////////////////////////////// -->
    <v-divider></v-divider>
    <br />
    <h4>Paso 2</h4>
    <v-row>
      <v-col cols="12" md="8">
        <v-label for="origen">Destino</v-label>
        <v-autocomplete
          id="origen"
          placeholder="Origen de la comanda"
          class="mt-2 my-input"
          clearable
          chips
          :items="info_tiendas"
          variant="outlined"
          :rules="origenRules"
          aria-label="Name Documents"
          color="primary"
          v-model="origen"
        >
        </v-autocomplete>
      </v-col>

      <v-col cols="12" md="4">
        <v-label for="delivery">Delivery</v-label>
        
        <v-autocomplete
          id="delivery"
          placeholder="Seleccione el tipo de delivery"
          class="mt-2 my-input"
          clearable
          chips
          :items="info_Delivery"
          variant="outlined"
          :rules="metodoRules"
          aria-label="delivery"
          color="primary"
          v-model="ID_Delivery"
        >
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-row v-if="ID_Delivery === 1 || ID_Delivery === 4">
      <v-col cols="12" md="6">
        <v-label for="direccion">Direccion completa</v-label>
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
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="6">
        <v-label for="referencia">Referencia</v-label>
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
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12" v-if="ID_Delivery === 3">
        <v-label for="direccion">Direccion del Delivery</v-label>
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
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="3">
        <v-label for="autorizado">Autorizado para recibir el envio</v-label>
        <v-switch v-model="autorizado" color="primary"></v-switch>
      </v-col>

      <v-col cols="12" md="4" v-if="autorizado == true">
        <v-label for="nombreDos">Nombre del Autorizado</v-label>
        <v-text-field
          id="nombreDos"
          type="text"
          placeholder="Nombre del autorizado"
          variant="outlined"
          aria-label="Name Documents"
          class="mt-2 my-input"
          v-model="nombreDos"
          :rules="nombreDosRules"
          color="primary"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="4" v-if="autorizado == true">
        <v-label for="cedulaDos">Cedula/Rif del Autorizado</v-label>
        <v-text-field
          id="cedulaDos"
          type="number"
          placeholder="Cedula del autorizado"
          variant="outlined"
          aria-label="Name Documents"
          class="mt-2 my-input"
          v-model="cedulaDos"
          :rules="cedulaDosRules"
          color="primary"
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="5" v-if="autorizado == true">
        <v-label for="telefono">Telefono del Autorizado</v-label>
        <v-text-field
          id="telefono"
          type="number"
          placeholder="Telefono del autorizado"
          variant="outlined"
          class="mt-2 my-input"
          :rules="telefonoRules"
          v-model="telefonoDos"
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-label for="medioPago">Medio de Pago</v-label>
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
          v-model="ID_pago"
          multiple
        ></v-autocomplete>
      </v-col>

      <v-col cols="12" md="6">
        <v-label for="creado">Creado Por</v-label>
        <v-text-field
          disabled
          id="creado"
          placeholder="Creado por"
          variant="outlined"
          required
          aria-label="Name Documents"
          class="mt-2 my-input"
          v-model="user_crea"
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- COMPONENTE QUE PERMITE AGREGAR LOS ARCHIVOS DE IMAGENES -->
    <UploadImages
      @isSelectImages="handleSelectImages"
      :ID_detalle="idComandaRandom"
    />

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
        !ID_pago
      "
      type="submit"
    >
      Guardar
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
</style>