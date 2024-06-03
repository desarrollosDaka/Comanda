<script setup lang="ts">
import { Form } from 'vee-validate';
import { ref, computed, onMounted, shallowRef } from 'vue';
import Swal from 'sweetalert2'
import axios from 'axios'
import { router } from '@/router';

// variables
const valid = ref(false);
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
const autorizado = ref('');
const cedulaDos = ref('');
const telefonoUno = ref('');
const ID_pago = ref();
const user_crea = ref();
const doc_file = ref();
const info_estado = ref();
const info_muni = ref();
const info_ciudad = ref();
const ID_status = ref('1');
const idComandaRandom = ref();
const porcentaje = ref();
const retencion = ref(false);
const ID_delivery = ref();

const baseUrl = `${import.meta.env.VITE_URL}/api/orders`;
const baseUrlEstado = `${import.meta.env.VITE_URL}/api/states`;
const baseUrlCiudad = `${import.meta.env.VITE_URL}/api/cities`;
const baseUrlMunicipio = `${import.meta.env.VITE_URL}/api/municipalities`;
const baseUrlClients = `${import.meta.env.VITE_URL}/api/clients`;

const tiendas = ref([
    {
        title: 'CDD',
        value: '1',
    },
    {
        title: 'AGENCIA VALENCIA',
        value: '4',
    }
    ,{
        title: 'SUCURSAL SAN DIEGO',
        value: '3',
    }
    ,{
        title: 'SUCURSAL BOLEITA',
        value: '6',
    }
    ,{
        title: 'SUCURSAL BELLO MONTE',
        value: '5',
    }
    ,{
        title: 'SUCURSAL SAN DIEGO',
        value: '12',
    }
]);

const pagos = ref([
    {
        title: 'PAGO MOVIL',
        value: '2',
    },
    {
        title: 'ZELLE',
        value: '3',
    }
    ,{
        title: 'TRANSFERENCIA BANCARIA',
        value: '1',
    }
]);

const delivery = ref([
    {
        title: 'ZOOM',
        value: '2',
    },
    {
        title: 'MRW',
        value: '3',
    }
    ,{
        title: 'PICK-UP',
        value: '1',
    }
]);

// Localstorage
const jsonFromLocalStorage = sessionStorage.getItem('user');
if (jsonFromLocalStorage !== null) {
  const parsedData = JSON.parse(jsonFromLocalStorage);
  user_crea.value = parsedData.data.Nombre;
} 

// validaciones
const origenRules = ref([
  (v: string) => !!v || 'El origen del cliente es requerido'
]);
const tipoRules = ref([
  (v: string) => !!v || 'El tipo de cliente es requerido',
]);
const emailRules = ref([
  (v: string) => !!v || 'El email es requerido', 
  (v: string) => /.+@.+\..+/.test(v) || 'El email debe ser válido'
]);
const CedulaUnoRules = ref([
    (v: string) => !!v || 'La cedula/rif del cliente es requerido', 
]);
const nombreCompletoRules = ref([
    (v: string) => !!v || 'El nombre del cliente es requerido'
]);
const estadosRules = ref([
    (v: any) => !!v || 'El estado es requerido', 
]);
const municipioRules = ref([
    (v: any) => !!v || 'El municipio es requerido', 
]);
const ciudadRules = ref([
    (v: any) => !!v || 'El ciudad es requerido', 
]);
const direccionRules = ref([
    (v: string) => !!v || 'La direccion completa es requerido'
]);
const referenciaRules = ref([
    (v: string) => !!v || 'La referencia del delivery es requerido'
]);
const autorizadoRules = ref([
    (v: string) => !!v || 'La persona autorizada es requerida'
]);
const cedulaDosRules = ref([
    (v: string) => !!v || 'La cedula de la persona autorizada es requerida',
]);
const telefonoRules = ref([
    (v: string) => !!v || 'El telefono de la persona autorizada es requerida',
]);
const metodoRules = ref([
    (v: string) => !!v || 'El metodo de pago es requerida',
]);
const fileRules = ref([
    (v: any) => !!v || 'El archivo es requerido', 
]);

// api post
async function Created(json: any){
    try{
        await axios.post(`${baseUrl}/createOrder`, json)
    } catch(error){
        console.log(error)
    } 
}

// BUSCADOR DE CLIENTES
async function searchModel() {
    try {
        const {data} = await axios.get(`${baseUrlClients}/searchClient/${cedulaUno.value}`)
        
        if(data){
            tipo.value =  data.Tipo_cliente
            email.value =  data.Email
            nombreCompleto.value =  data.Nombre
            estado.value =  data.ID_state
            ciudad.value =  data.ID_city
            municipio.value =  data.ID_municipio
        }

    } catch (error) {
        Swal.fire({
            title: "El cliente no existe!",
            text: "Crea el cliente para continuar",
            icon: "error"
        }); 
    }
}

interface Estado {
    Nombre: string;
    ID_states: string;
}

interface Muni {
    Nombre: string;
    ID_municipio: number;
}

interface Ciudad {
  Nombre: string;
  ID_city: number;

}

// api get
async function getEstados(){
    try{
        const {data} = await axios.get(`${baseUrlEstado}/masterStores`)
        info_estado.value = data.map((estados: Estado) => ({
            title: estados.Nombre,
            value: estados.ID_states
        }));

    } catch(error){
        console.log(error)
    }
}                                                           

// api get
async function getMunicipio(){
    try{
        const {data} = await axios.get(`${baseUrlMunicipio}/masterMunicipality`)
        info_muni.value = data.map((muni: Muni) => ({
            title: muni.Nombre,
            value: muni.ID_municipio
        }));
    } catch(error){
        console.log(error)
    }
}

async function getCiudad(){
    try{
        const {data} = await axios.get(`${baseUrlCiudad}/masterCities`)
        info_ciudad.value = data.map((ciudad: Ciudad) =>({
            title: ciudad.Nombre,
            value: ciudad.ID_city
        }));
    } catch(error){
        console.log(error)
    }
}

// Capturar la imagen
const File = (event: any) => {
  doc_file.value = event.target.files[0];
};


// Function para enviar form
/* eslint-disable @typescript-eslint/no-explicit-any */
async function validate(values: any) {
    let formData = new FormData();
    let porcentajeValue = porcentaje.value ? porcentaje.value : 0;
    formData.append('Id_Comanda', idComandaRandom.value);
    formData.append('origen', origen.value);
    formData.append('tipo', tipo.value);
    formData.append('cedulaUno', cedulaUno.value);
    formData.append('email', email.value);
    formData.append('nombreCompleto', nombreCompleto.value);
    formData.append('estado', estado.value);
    formData.append('ciudad', ciudad.value);
    formData.append('doc_file', doc_file.value );
    formData.append('municipio', municipio.value);
    formData.append('direccion', direccion.value);
    formData.append('autorizado', autorizado.value);
    formData.append('cedulaDos', cedulaDos.value);
    formData.append('telefonoUno', telefonoUno.value);
    formData.append('ID_pago', ID_pago.value);
    formData.append('ID_status', ID_status.value);
    formData.append('retencion', retencion.value.toString());
    formData.append('ID_delivery', ID_delivery.value);
    formData.append('porcentaje', porcentajeValue);
    formData.append('user_crea', user_crea.value);

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
        if (result.isConfirmed){
            const respuesta = Created(formData);
            Swal.fire({
            title: "Guardado!",
            text: "Datos guardados con exito!",
            icon: "success"
            }).then((result) => {
            if (result.isConfirmed) {
                    router.push(`/addArticulos/${idComandaRandom.value}`); 
                }
            }); 
    
        }
    });
}

function generarCadenaAleatoria(longitud: number) {
  let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let resultado = '';
  for (let i = 0; i < longitud; i++) {
    let indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    resultado += caracteres[indiceAleatorio];
  }
  return resultado;
}

onMounted( async () => {
    await getEstados();
    await getMunicipio();
    await getCiudad();
    let cadenaAleatoria = generarCadenaAleatoria(20);

    idComandaRandom.value = cadenaAleatoria
});


</script>

<template>
    <Form @submit="validate" enctype="multipart/form-data" class="mt-3" v-slot="{ isSubmitting }">

<!-- /////////////////////////////////////// CLIENTE ///////////////////////////////////////////////////// -->
        <v-row>
            <v-col cols="12" md="11">
                <h4>id comanda: {{ idComandaRandom }} </h4>
            </v-col>
            <v-col cols="12" md="1">
                <v-btn :disabled="!cedulaUno" color="primary" @click="searchModel">Buscar</v-btn>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="6">
                <v-label for="cedulaUno">Cedula/Rif</v-label>
                <v-text-field
                    id="cedulaUno"
                    type="number"
                    placeholder="Cedula/Rif"
                    variant="outlined"
                    aria-label="Name Documents"
                    class="mt-2"
                    v-model="cedulaUno"
                    :rules="CedulaUnoRules"
                    color="primary"
                ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
                <v-label for="tipo">Tipo</v-label>
                <v-autocomplete
                    id="tipo"
                    placeholder="Tipo de Proceso"
                    class="mt-2"
                    clearable
                    chips
                    :items="['NATURAL', 'JURIDICO']"
                    variant="outlined"
                    :rules="tipoRules"
                    aria-label="Name Documents"
                    color="primary"
                    v-model="tipo"
                ></v-autocomplete>
            </v-col>
        </v-row>

        <v-row v-if="tipo === 'JURIDICO'">
            <v-col cols="12" md="1">
                <v-label for="roles">Retención</v-label>
                <v-switch
                    class="mt-3" 
                    v-model="retencion"
                    color="warning"
                ></v-switch>
            </v-col>
        
            <v-col cols="12" md="2">
                <v-label for="porcentaje"></v-label>
                <v-autocomplete
                    clearable
                    chips
                    prepend-icon="mdi-percent-outline"
                    id="porcentaje"
                    placeholder="%"
                    :items="['75', '100']"
                    variant="outlined"
                    v-model="porcentaje"
                    required
                    color="primary"
                    class="mt-2"
                ></v-autocomplete>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="6">
                <v-label for="email">Email</v-label>
                <v-text-field
                    id="email"
                    type="email"
                    placeholder="ejmeplo@tiendasdaka.com"
                    variant="outlined"
                    aria-label="Name Documents"
                    class="mt-2"
                    :rules="emailRules"
                    v-model="email"
                    color="primary"
                ></v-text-field>
            </v-col>
        
            <v-col cols="12" md="6">
                <v-label for="name">Nombre Completo</v-label>
                <v-text-field
                    id="name"
                    type="text"
                    placeholder="Nombre Completo"
                    variant="outlined"
                    aria-label="Name Documents"
                    class="mt-2 my-input"
                    :rules="nombreCompletoRules"
                    v-model="nombreCompleto"
                    color="primary"
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="4">
                <v-label for="estado">Estado</v-label>
                <v-autocomplete
                    id="estado"
                    placeholder="Seleccione el estado"
                    class="mt-2"
                    clearable
                    chips
                    :items="info_estado"
                    variant="outlined"
                    :rules="estadosRules"
                    aria-label="Name Documents"
                    color="primary"
                    v-model="estado"
                ></v-autocomplete>
            </v-col>

            <v-col cols="12" md="4">
                <v-label for="ciudad">Ciudad</v-label>
                <v-autocomplete
                    id="ciudad"
                    placeholder="Seleccione la ciudad"
                    class="mt-2"
                    clearable
                    chips
                    :items="info_ciudad"
                    variant="outlined"
                    :rules="ciudadRules"
                    aria-label="Name Documents"
                    color="primary"
                    v-model="ciudad"
                ></v-autocomplete>
            </v-col>

            <v-col cols="12" md="4">
                <v-label for="municipio">Municipio</v-label>
                <v-autocomplete
                    id="municipio"
                    placeholder="Seleccione el municipio"
                    class="mt-2"
                    clearable
                    chips
                    :items="info_muni"
                    variant="outlined"
                    :rules="municipioRules"
                    aria-label="Name Documents"
                    color="primary"
                    v-model="municipio"
                ></v-autocomplete>
            </v-col>
        </v-row>
        <br>
<!-- /////////////////////////////////////// COMANDA ///////////////////////////////////////////////////// -->

        <v-divider></v-divider>
        <br>
        <h4>Paso 2</h4>
        <v-row>
            <v-col cols="12" md="6">
                <v-label for="origen">Origen</v-label>
                <v-autocomplete
                    id="origen"
                    placeholder="Origen de la comanda"
                    class="mt-2"
                    clearable
                    chips
                    :items="tiendas"
                    variant="outlined"
                    :rules="origenRules"
                    aria-label="Name Documents"
                    color="primary"
                    v-model="origen"
                ></v-autocomplete>
            </v-col>

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

        </v-row>
        <v-row>
            <v-col cols="12" md="8">
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

            <v-col cols="12" md="4">
                <v-label for="delivery">Delivery</v-label>
                <v-autocomplete
                    id="delivery"
                    placeholder="Seleccione el tipo de delivery"
                    class="mt-2"
                    clearable
                    chips
                    :items="delivery"
                    variant="outlined"
                    :rules="metodoRules"
                    aria-label="delivery"
                    color="primary"
                    v-model="ID_delivery"
                ></v-autocomplete>
            </v-col>
        </v-row>
        <v-row>
    
            <v-col cols="12" md="6">
                <v-label for="autorizado">Autorizado para recibir el envio</v-label>
                <v-text-field
                    id="autorizado"
                    type="text"
                    placeholder="Direccion Completa"
                    variant="outlined"
                    aria-label="Name Documents"
                    class="mt-2 my-input"
                    :rules="autorizadoRules"
                    v-model="autorizado"
                    color="primary"
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
                <v-label for="cedulaDos">Cedula/Rif</v-label>
                <v-text-field
                    id="cedulaDos"
                    type="number"
                    placeholder="Referencia del delivery"
                    variant="outlined"
                    aria-label="Name Documents"
                    class="mt-2"
                    v-model="cedulaDos"
                    :rules="cedulaDosRules"
                    color="primary"
                ></v-text-field>
            </v-col>
    
        </v-row>
        <v-row>
            <v-col cols="12" md="5">
                <v-label for="telefono">Telefono 1</v-label>
                <v-text-field
                    id="telefono"
                    type="number"
                    placeholder="Direccion Completa"
                    variant="outlined"
                    aria-label="Name Documents"
                    class="mt-2"
                    :rules="telefonoRules"
                    v-model="telefonoUno"
                    color="primary"
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
                <v-label for="medioPago">Medio de Pago</v-label>
                <v-autocomplete
                    id="medioPago"
                    placeholder="Seleccione el tipo de pago"
                    class="mt-2"
                    clearable
                    chips
                    :items="pagos"
                    variant="outlined"
                    :rules="metodoRules"
                    aria-label="pago"
                    color="primary"
                    v-model="ID_pago"
                ></v-autocomplete>
            </v-col>

            <v-col cols="12" md="3">
                <v-label for="creado">Creado Por</v-label>
                <v-text-field
                    disabled
                    id="creado"
                    placeholder="Creado por"
                    variant="outlined"
                    required
                    aria-label="Name Documents"
                    class="mt-2"
                    v-model="user_crea"
                    color="primary"
                ></v-text-field>    
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <br>
                <v-file-input
                multiple
                clearable 
                label="Coloque el archivo aqui"
                variant="outlined"
                color="primary"
                required
                @change="File"
                ></v-file-input>
            </v-col>
        </v-row>

        <v-btn 
            color="primary" 
            :loading="isSubmitting" 
            append-icon="mdi-arrow-right"
            class="mt-6" 
            variant="flat"
            size="large" 
            :disabled="!origen || !tipo  || !cedulaUno || !estado || !ciudad || !municipio || !direccion || !referencia 
            || !email || !nombreCompleto || !autorizado || !cedulaDos || !telefonoUno || !ID_pago"
            type="submit">
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

.logoDakaLogin{
  margin-left: 95px;
}

.my-input input {
  text-transform: uppercase;
}

</style>