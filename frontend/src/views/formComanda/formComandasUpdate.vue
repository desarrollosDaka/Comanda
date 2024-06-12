<script setup lang="ts">
import { Form } from 'vee-validate';
import { ref, reactive, computed, onMounted } from 'vue';
import Swal from 'sweetalert2'
import axios from 'axios'
// import { router } from '../../../router';
import { useRoute } from 'vue-router'
import { router } from '@/router';
import UploadImages from './uploadImages.vue'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const route = useRoute()

// CAPTURAMOS EL ID DE COMANDA
const id = ref() // id de la COMANDA
id.value = route.params.id

// variables
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
const porcentaje = ref();
const retencion = ref(false);
const ID_delivery = ref();
const user_mod = ref();

const itemDocument = ref<Document[]>([]);

const baseUrl = `${import.meta.env.VITE_URL}/api/orders`;
const baseUrlEstado = `${import.meta.env.VITE_URL}/api/states`;
const baseUrlCiudad = `${import.meta.env.VITE_URL}/api/cities`;
const baseUrlMunicipio = `${import.meta.env.VITE_URL}/api/municipalities`;
const baseUrlClients = `${import.meta.env.VITE_URL}/api/clients`;

// Localstorage
const jsonFromLocalStorage = sessionStorage.getItem('user');
if (jsonFromLocalStorage !== null) {
    const parsedData = JSON.parse(jsonFromLocalStorage);
    user_mod.value = parsedData.data.username;
}

onMounted(async () => {
    await getOrder();
    await getEstados();
    await getMunicipio();
    await getCiudad();


});


const tiendas = ref([
    {
        title: 'CDD',
        value: 1,
    },
    {
        title: 'AGENCIA VALENCIA',
        value: 4,
    }
    , {
        title: 'SUCURSAL SAN DIEGO',
        value: 3,
    }
    , {
        title: 'SUCURSAL BOLEITA',
        value: 6,
    }
    , {
        title: 'SUCURSAL BELLO MONTE',
        value: 5,
    }
    , {
        title: 'SUCURSAL SAN DIEGO',
        value: 12,
    }
]);

const pagos = ref([
    {
        title: 'PAGO MOVIL',
        value: 2,
    },
    {
        title: 'ZELLE',
        value: 3,
    }
    , {
        title: 'TRANSFERENCIA BANCARIA',
        value: 1,
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
    , {
        title: 'PICK-UP',
        value: '1',
    }
]);

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


const getOrder = async () => {
    try {
        const url = `${baseUrl}/filterOrder/${id.value}`
        const { data } = await axios.get(url);

        if (data) {
            cedulaUno.value = data[0][0]["Cedula"]
            tipo.value = data[0][0]["Tipo_cliente"]
            retencion.value = data[0][0]["Retencion"]
            porcentaje.value = data[0][0]["Porc_retencion"]
            email.value = data[0][0]["Email"]
            nombreCompleto.value = data[0][0]["Cliente"]
            estado.value = data[0][0]["ID_states"]
            ciudad.value = data[0][0]["ID_city"]
            municipio.value = data[0][0]["ID_municipio"]
            origen.value = data[0][0]["ID_sucursal"]
            direccion.value = data[0][0]["Direccion"]
            referencia.value = '*******NO SE QUE CAMPO ES********'//NO SE CUAL CAMPO ES 
            ID_delivery.value = data[0][0]["Tipo_delivery"]
            autorizado.value = data[0][0]["Personal_autoriza"] //ARREGLAR EN BACKEND
            cedulaDos.value = data[0][0]["Cedula_autoriza"]
            telefonoUno.value = data[0][0]["Telefono"]  //AGREGAR EN EL BACKEND
            ID_pago.value = data[0][0]["ID_pago"]
            user_crea.value = data[0][0]["User_crea"]
        }
    } catch (error) {
        console.log(error)
    }
}




// BUSCADOR DE CLIENTES
async function searchModel() {

    try {
        const { data } = await axios.get(`${baseUrlClients}/searchClient/${cedulaUno.value}`)

        if (data) {
            tipo.value = data.Tipo_cliente
            email.value = data.Email
            nombreCompleto.value = data.Nombre
            estado.value = data.ID_state
            ciudad.value = data.ID_city
            municipio.value = data.ID_municipio
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

interface Document {
    file: File;
    type: string;
    mode: string;
}

// api get
async function getEstados() {
    try {
        const { data } = await axios.get(`${baseUrlEstado}/masterStores`)
        info_estado.value = data.map((estados: Estado) => ({
            title: estados.Nombre,
            value: estados.ID_states
        }));

    } catch (error) {
        console.log(error)
    }
}

// api get
async function getMunicipio() {
    try {
        const { data } = await axios.get(`${baseUrlMunicipio}/masterMunicipality`)
        info_muni.value = data.map((muni: Muni) => ({
            title: muni.Nombre,
            value: muni.ID_municipio
        }));
    } catch (error) {
        console.log(error)
    }
}

async function getCiudad() {
    try {
        const { data } = await axios.get(`${baseUrlCiudad}/masterCities`)
        info_ciudad.value = data.map((ciudad: Ciudad) => ({
            title: ciudad.Nombre,
            value: ciudad.ID_city
        }));
    } catch (error) {
        console.log(error)
    }
}


// api post
async function handleFormComanda() {


    let porcentajeValue = porcentaje.value ? porcentaje.value : 0;
    const jsonData = {
        "Id_Comanda": id.value,
        "origen": origen.value,
        "tipo": tipo.value,
        "cedulaUno": cedulaUno.value,
        "email": email.value,
        "nombreCompleto": nombreCompleto.value,
        "estado": estado.value,
        "ciudad": ciudad.value,
        "municipio": municipio.value,
        "direccion": direccion.value,
        "autorizado": autorizado.value,
        "P_autorizado": 0,
        "cedulaDos": cedulaDos.value,
        "telefonoUno": telefonoUno.value,
        "ID_pago": ID_pago.value,
        "ID_status": ID_status.value,
        "retencion": retencion.value.toString(),
        "ID_delivery": ID_delivery.value,
        "porcentaje": porcentajeValue,
        "user_crea": user_crea.value
    }

    // formData.append('origen', origen.value);
    // formData.append('tipo', tipo.value);
    // formData.append('cedulaUno', cedulaUno.value);
    // formData.append('email', email.value);
    // formData.append('nombreCompleto', nombreCompleto.value);
    // formData.append('estado', estado.value);
    // formData.append('ciudad', ciudad.value);
    // formData.append('municipio', municipio.value);
    // formData.append('direccion', direccion.value);
    // formData.append('autorizado', autorizado.value);
    // formData.append('cedulaDos', cedulaDos.value);
    // formData.append('telefonoUno', telefonoUno.value);
    // formData.append('ID_pago', ID_pago.value);
    // formData.append('ID_status', ID_status.value);
    // formData.append('retencion', retencion.value.toString());
    // formData.append('ID_delivery', ID_delivery.value);
    // formData.append('porcentaje', porcentajeValue);
    // formData.append('user_crea', user_crea.value);


    // ACTUALIZAMOS PRIMERO LA DATA DEL FORMULARIO
    try {
        //       await axios.put(`${baseUrl}/updateOrder/${id.value}`, jsonData)
    } catch (error) {
        console.log(error)
    }


    const formDataDocuments = new FormData();
    
    // filtramos solos los item tipo insert
    itemDocument.value = itemDocument.value.filter(item => item.mode ==='insert')

    for (let i = 0; i < itemDocument.value.length; i++) {

        const file = itemDocument.value[i].file;
        const type = itemDocument.value[i].type;
        const mode = itemDocument.value[i].mode

        formDataDocuments.append('doc_file', file)
        formDataDocuments.append(`typeDoc_${i}`, type);
        formDataDocuments.append(`user_${i}`, user_crea.value);

    }
    try {
        await axios.post(`${baseUrl}/createOrderDocument/${id.value}`, formDataDocuments)
    } catch (error) {
        console.log(error)
    }
}

// Function para enviar form
async function validate() {

    // VALIDAMOS PRIMERO QUE EXISTAN LOS DOCUMENTOS CON SUS RESPECTIVOS TIPO DE DOCUMENTOS
    const isvalidateDocuments = validateDocuments()

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
                const respuesta = handleFormComanda();
                Swal.fire({
                    title: "Guardado!",
                    text: "Datos actualizados con exito!",
                    icon: "success"
                }).then((result) => {

                    if (result.isConfirmed) {

                        //      handleProductUpdate()

                    }
                });

            }
        });
}


const handleProductUpdate = () => {

    router.push(`/addArticulos/${id.value}/${true}`);

}

function handleSelectImages(items: any) {

    itemDocument.value = items

}

function validateDocuments(): boolean {

    let isvalidate = true

    if (itemDocument.value.length <= 0) {

        toast.error("Error: Debes seleccionar al menos un archivo", {
            position: toast.POSITION.TOP_CENTER,
            transition: toast.TRANSITIONS.ZOOM,
            autoClose: 4000,
            theme: 'colored',
            toastStyle: {
                fontSize: '16px',
                opacity: '1',
            },
        });

        isvalidate = false

    } else {

        itemDocument.value.forEach(element => {

            if (element.type === null) {

                isvalidate = false
            }

        });

        if (!isvalidate)
            toast.warn(`Error: Seleccione el tipo de documento`, {
                delay: 1000,
                position: toast.POSITION.BOTTOM_CENTER,
                transition: toast.TRANSITIONS.ZOOM,
                theme: 'dark',
                autoClose: 3000
            });
    }

    return isvalidate
}

onMounted(async () => {
    await getEstados();
    await getMunicipio();
    await getCiudad();
});

</script>

<template>
    <Form @submit="validate" enctype="multipart/form-data" class="mt-3" v-slot="{ isSubmitting }">

        <!-- /////////////////////////////////////// CLIENTE ///////////////////////////////////////////////////// -->
        <v-row>
            <v-col cols="12" md="11">
                <h4>Paso 1</h4>
            </v-col>

        </v-row>

        <v-row>
            <v-col cols="12" md="6">
                <v-label for="cedulaUno">Cedula/Rif</v-label>
                <v-text-field id="cedulaUno" type="number" placeholder="Cedula/Rif" variant="outlined"
                    aria-label="Name Documents" class="mt-2" v-model="cedulaUno" @change="searchModel"
                    :rules="CedulaUnoRules" color="primary"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
                <v-label for="tipo">Tipo</v-label>
                <v-autocomplete id="tipo" placeholder="Tipo de Proceso" class="mt-2" clearable chips
                    :items="['NATURAL', 'JURIDICO']" variant="outlined" :rules="tipoRules" aria-label="Name Documents"
                    color="primary" v-model="tipo"></v-autocomplete>
            </v-col>
        </v-row>

        <v-row v-if="tipo === 'JURIDICO'">
            <v-col cols="12" md="1">
                <v-label for="roles">Retención</v-label>
                <v-switch class="mt-3" v-model="retencion" color="warning"></v-switch>
            </v-col>

            <v-col cols="12" md="3">
                <v-label for="porcentaje"></v-label>
                <v-autocomplete clearable chips prepend-icon="mdi-percent-outline" id="porcentaje" placeholder="%"
                    :items="[75, 100]" variant="outlined" v-model="porcentaje" required color="primary"
                    class="mt-2"></v-autocomplete>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="6">
                <v-label for="email">Email</v-label>
                <v-text-field id="email" type="email" placeholder="ejmeplo@tiendasdaka.com" variant="outlined"
                    aria-label="Name Documents" class="mt-2" :rules="emailRules" v-model="email"
                    color="primary"></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
                <v-label for="name">Nombre Completo</v-label>
                <v-text-field id="name" type="text" placeholder="Nombre Completo" variant="outlined"
                    aria-label="Name Documents" class="mt-2 my-input" :rules="nombreCompletoRules"
                    v-model="nombreCompleto" color="primary"></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" md="4">
                <v-label for="estado">Estado</v-label>
                <v-autocomplete id="estado" placeholder="Seleccione el estado" class="mt-2" clearable chips
                    :items="info_estado" variant="outlined" :rules="estadosRules" aria-label="Name Documents"
                    color="primary" v-model="estado"></v-autocomplete>
            </v-col>

            <v-col cols="12" md="4">
                <v-label for="ciudad">Ciudad</v-label>
                <v-autocomplete id="ciudad" placeholder="Seleccione la ciudad" class="mt-2" clearable chips
                    :items="info_ciudad" variant="outlined" :rules="ciudadRules" aria-label="Name Documents"
                    color="primary" v-model="ciudad"></v-autocomplete>
            </v-col>

            <v-col cols="12" md="4">
                <v-label for="municipio">Municipio</v-label>
                <v-autocomplete id="municipio" placeholder="Seleccione el municipio" class="mt-2" clearable chips
                    :items="info_muni" variant="outlined" :rules="municipioRules" aria-label="Name Documents"
                    color="primary" v-model="municipio"></v-autocomplete>
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
                <v-autocomplete id="origen" placeholder="Origen de la comanda" class="mt-2" clearable chips
                    :items="tiendas" variant="outlined" :rules="origenRules" aria-label="Name Documents" color="primary"
                    v-model="origen"></v-autocomplete>
            </v-col>

            <v-col cols="12" md="6">
                <v-label for="direccion">Direccion completa</v-label>
                <v-text-field id="direccion" type="text" placeholder="Direccion Completa" variant="outlined"
                    aria-label="Name Documents" class="mt-2 my-input" v-model="direccion" :rules="direccionRules"
                    color="primary"></v-text-field>
            </v-col>

        </v-row>
        <v-row>
            <v-col cols="12" md="8">
                <v-label for="referencia">Referencia</v-label>
                <v-text-field id="referencia" type="text" placeholder="Referencia del delivery" variant="outlined"
                    aria-label="Name Documents" class="mt-2 my-input" :rules="referenciaRules" v-model="referencia"
                    color="primary"></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
                <v-label for="delivery">Delivery</v-label>
                <v-autocomplete id="delivery" placeholder="Seleccione el tipo de delivery" class="mt-2" clearable chips
                    :items="delivery" variant="outlined" :rules="metodoRules" aria-label="delivery" color="primary"
                    v-model="ID_delivery"></v-autocomplete>
            </v-col>
        </v-row>
        <v-row>

            <v-col cols="12" md="6">
                <v-label for="autorizado">Autorizado para recibir el envio</v-label>
                <v-text-field id="autorizado" type="text" placeholder="Direccion Completa" variant="outlined"
                    aria-label="Name Documents" class="mt-2 my-input" :rules="autorizadoRules" v-model="autorizado"
                    color="primary"></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
                <v-label for="cedulaDos">Cedula/Rif</v-label>
                <v-text-field id="cedulaDos" type="number" placeholder="Referencia del delivery" variant="outlined"
                    aria-label="Name Documents" class="mt-2" v-model="cedulaDos" :rules="cedulaDosRules"
                    color="primary"></v-text-field>
            </v-col>

        </v-row>
        <v-row>
            <v-col cols="12" md="5">
                <v-label for="telefono">Telefono 1</v-label>
                <v-text-field id="telefono" type="number" placeholder="Telefono" variant="outlined"
                    aria-label="Name Documents" class="mt-2" :rules="telefonoRules" v-model="telefonoUno"
                    color="primary"></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
                <v-label for="medioPago">Medio de Pago</v-label>
                <v-autocomplete id="medioPago" placeholder="Seleccione el tipo de pago" class="mt-2" clearable chips
                    :items="pagos" variant="outlined" :rules="metodoRules" aria-label="pago" color="primary"
                    v-model="ID_pago"></v-autocomplete>
            </v-col>

            <v-col cols="12" md="3">
                <v-label for="creado">Creado Por</v-label>
                <v-text-field disabled id="creado" placeholder="Creado por" variant="outlined" required
                    aria-label="Name Documents" class="mt-2" v-model="user_crea" color="primary"></v-text-field>
            </v-col>
        </v-row>

        <!-- COMPONENTE QUE PERMITE AGREGAR LOS ARCHIVOS DE IMAGENES -->
        <UploadImages @isSelectImages=handleSelectImages :ID_detalle=id />

        <v-btn color="primary" :loading="isSubmitting" append-icon="mdi-arrow-right" class="mt-6" variant="flat"
            size="large" :disabled="!origen || !tipo || !cedulaUno || !estado || !ciudad || !municipio || !direccion || !referencia
                || !email || !nombreCompleto || !autorizado || !cedulaDos || !telefonoUno || !ID_pago" type="submit">
            Actualizar
        </v-btn>

        <v-btn class="mt-6 mx-1" variant="flat" append-icon="mdi-arrow-right" size="large" color="warning"
            @click="handleProductUpdate">Detalle Articulos</v-btn>

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
