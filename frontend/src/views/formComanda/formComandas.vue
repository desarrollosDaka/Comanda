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
const baseUrl = `http://localhost:3002/api/documents`;
const baseUrlEstado = `http://localhost:3002/api/states`;
const baseUrlCiudad = `http://localhost:3002/api/cities`;
const baseUrlMunicipio = `http://localhost:3002/api/municipalities`;

// let ProccesAndType = computed(() => `${doc_process.value}-${doc_type.value}`);

interface Proccess {
    proccessAll: string;
    letters: string;
}

interface Types {
    typesAll: string;
    letters: string;
}

interface DocItem {
  doc_cod: string;
}

const tiendas = ref([
    {
        title: 'CDD',
        value: '1',
    },
    {
        title: 'AGENCIA VALENCIA',
        value: '2',
    }
    ,{
        title: 'SUCURSAL SAN DIEGO',
        value: '3',
    }
    ,{
        title: 'SUCURSAL BOLEITA',
        value: '4',
    }
    ,{
        title: 'SUCURSAL BELLO MONTE',
        value: '5',
    }
    ,{
        title: 'SUCURSAL SAN DIEGO',
        value: '6',
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

const ciudades = ref([
    {
        title: 'TRIJILLO',
        value: '1',
    },
    {
        title: 'VALENCIA',
        value: '2',
    }
]);

const municipios = ref([
    {
        title: 'NAGUANAGUA',
        value: '1',
    },
    {
        title: 'GUACARA',
        value: '2',
    }
    ,{
        title: 'SAN DIEGO',
        value: '3',
    }
    ,{
        title: 'LOS GUAYOS',
        value: '4',
    }
    ,{
        title: 'MORRON',
        value: '5',
    }
    ,{
        title: 'MARIARA',
        value: '6',
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
    (v: string) => !!v || 'El nombre del cliente es requerido',
    (v: string) => /^[A-Z0-9\s]+$/.test(v) || 'El nombre del cliente debe ser en mayúsculas'
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
    (v: string) => !!v || 'La direccion completa es requerido',
    (v: string) => /^[A-Z0-9\s]+$/.test(v) || 'La direccion debe ser en mayúsculas'
]);

const referenciaRules = ref([
    (v: string) => !!v || 'La referencia del delivery es requerido',
    (v: string) => /^[A-Z0-9\s]+$/.test(v) || 'La referencia debe ser en mayúsculas'
]);

const autorizadoRules = ref([
    (v: string) => !!v || 'La persona autorizada es requerida',
    (v: string) => /^[A-Z0-9\s]+$/.test(v) || 'La persona autorizada debe ser en mayúsculas'
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

// Capturar la imagen
const onFileSelected = (event: any) => {
  doc_file.value = event.target.files[0];
};

// api post
async function Created(json: any){
    try{
        await axios.post(`${baseUrl}/registerDocuments`, json)
    } catch(error){
        console.log(error)
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
        info_ciudad.value = data.map((ciudad: Ciudad) => ({
            title: ciudad.Nombre,
            value: ciudad.ID_city
        }));
    } catch(error){
        console.log(error)
    }
}

// Function para enviar form
/* eslint-disable @typescript-eslint/no-explicit-any */
async function validate(values: any) {

    const jsonComanda = {
        Id_Comanda:idComandaRandom.value, 
        origen:origen.value, 
        tipo:tipo.value,
        cedulaUno:cedulaUno.value,
        email:email.value ,
        nombreCompleto:nombreCompleto.value ,
        estado:estado.value,
        ciudad:ciudad.value,
        municipio:municipio.value,
        direccion:direccion.value,
        referencia:referencia.value,
        autorizado:autorizado.value,
        cedulaDos:cedulaDos.value,
        telefonoUno:telefonoUno.value,
        ID_pago:ID_pago.value,
        ID_status:ID_status.value,
        user_crea:user_crea.value
    }

    // Alerta
    Swal.fire({
        title: `Codigo Generado`,
        text: "¿Desea guardar estos datos?",
        icon: "question",
        showCancelButton: true, 
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar", 
        confirmButtonText: "Si, Guardar!",

    }).then((result) => {
        if (result.isConfirmed){
            const respuesta = Created(jsonComanda);
            Swal.fire({
            title: "Guardado!",
            text: "Datos guardados con exito!",
            icon: "success"
            }).then((result) => {
            if (result.isConfirmed) {
                    router.push('/maestroCodificacion'); 
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
                <v-btn color="primary">Buscar</v-btn>
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
            <v-col cols="12" md="4">
                <v-label for="email">Retencion</v-label>
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
        
            <v-col cols="12" md="3">
                <v-label for="name">Porcentaje</v-label>
                <v-text-field
                    id="name"
                    type="text"
                    placeholder="Nombre Completo"
                    variant="outlined"
                    aria-label="Name Documents"
                    class="mt-2"
                    :rules="nombreCompletoRules"
                    v-model="nombreCompleto"
                    color="primary"
                ></v-text-field>
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
                    class="mt-2"
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
                    class="mt-2"
                    v-model="direccion"
                    :rules="direccionRules"
                    color="primary"
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="12">
                <v-label for="referencia">Referencia</v-label>
                <v-text-field
                    id="referencia"
                    type="text"
                    placeholder="Referencia del delivery"
                    variant="outlined"
                    aria-label="Name Documents"
                    class="mt-2"
                    :rules="referenciaRules"
                    v-model="referencia"
                    color="primary"
                ></v-text-field>
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
                    class="mt-2"
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
                    placeholder="Seleccione el municipio"
                    class="mt-2"
                    clearable
                    chips
                    :items="['PAGO MOVIL', 'TRANSFERENCIA', 'PUNTO']"
                    variant="outlined"
                    :rules="metodoRules"
                    aria-label="Name Documents"
                    color="primary"
                    v-model="medioPago"
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
                @change="onFileSelected"
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
            || !email || !nombreCompleto || !autorizado || !cedulaDos || !telefonoUno || !medioPago"
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

</style>
