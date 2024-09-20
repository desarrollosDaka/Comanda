<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios'
import Swal from 'sweetalert2'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import imgUrl from '@/assets/images/pdf.png'
import { useRoute } from 'vue-router'

const baseUrl = `${import.meta.env.VITE_URL}/api/orders`;
const INSERT_METHOD = 'insert'
const UPDATE_METHOD = 'update'
const DOCUMENT_PDF = 'pdf'
const URLIMAGEPDF = imgUrl
const route = useRoute()
const url = ref()

let route_upload = ref()
const sort = route?.name;

const props = defineProps({
  ID_detalle: {
    type: String as () => string,
    required: false,
  }, //Id de la Comanda

  deleteImageUpdate: {
    type: Boolean as () => boolean,
    required: false,
  },
  tipoDelivery: {
    type: String as () => string,
    required: false,
  }
})

const delivery = ref()
delivery.value = props.tipoDelivery

let USER_ROL = ref<number>(0); //Variable donde se almacena el ROL DEL USUARIO que vendria del localstorage
// Localstorage
const jsonFromLocalStorage = localStorage.getItem("user");
if (jsonFromLocalStorage !== null) {
  const parsedData = JSON.parse(jsonFromLocalStorage);
  USER_ROL.value = +parsedData.data.ID_rol;
}

const document = ref<Documento[]>([]);

onMounted(async () => {
  
  if(props.ID_detalle != undefined){

    route_upload.value=`${import.meta.env.VITE_URL}/public/`
    try {

      // if(USER_ROL.value === 10){

      //   const tipoArchivo = 'DETALLE DE ENVIO'
      //   url.value = `${baseUrl}/filterOrderDetailsfilesEnvio/${props.ID_detalle}/${tipoArchivo}`

      // } else {
        url.value = `${baseUrl}/filterOrderDetailsFiles/${props.ID_detalle}`
        
      // }
      const { data } = await axios.get(url.value);

      data[0].forEach((data: DocumentData) => {
        const extension = data.File.split('.').pop();
        document.value.push({ imagen: data.File, file: null, type: data.Type_File, mode: UPDATE_METHOD, disabled: true, Id: data.ID_File, typefile: extension });
      });
    } catch (error) {
      console.log(error)
    }
    emits('isSelectImages', document.value); //INDICAMOS AL COMPONENTE PADRE QUE YA EXISTEN ARCHIVOS SELECCIONADOS
  }
});

interface Documento {
  imagen: any;
  file: any | null;
  type: string | null;
  mode: string;
  disabled: boolean;
  Id: number;
  typefile: string | undefined;
}

interface DocumentData {
  File: string,
  Type_File: string,
  ID_File: number,
  Type_File_Document: string
}

const emits = defineEmits(['isSelectImages']);

const tipoRules = ref([
  (v: string) => !!v || 'El tipo de documento es requerido',
]);

async function viewImages(event: Event) {
  const target = event.target as HTMLInputElement;

  if (!target.files) return;

  for (const file of target.files) {

    if (!validadPropertyImage(file)) {

      break;
    }

    const base64URL = await encodeFileAsBase64URL(file);
    const extension = file.name.split('.').pop();
    document.value.push({ imagen: base64URL, file, type: null, mode: INSERT_METHOD, disabled: false, Id: 0, typefile: extension });
  }


  emits('isSelectImages', document.value);
}


async function encodeFileAsBase64URL(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}

function typeValue(index: number, valor: string): void {
  document.value[index].type = valor;
  emits('isSelectImages', document.value);
}

async function deldata(data: any, index: number) {

  if (!props?.deleteImageUpdate && data.mode === UPDATE_METHOD && sort === 'viewProcessComandas') return

  if (data.Id > 0) { // SI LA DATA VIENE DEL FORMULARIO DE ACTUALIZAR

    Swal.fire({
      title: `Eliminar Archivo`,
      text: "¿Estas seguro de eliminar el archivo?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, Eliminar!",

    }).then(async (result) => {
      if (result.isConfirmed) {
        document.value.splice(index, 1);
        try {
          await axios.put(`${baseUrl}/deleteOrderDocument/${data.Id}`, data)

        } catch (error) {
          console.log(error)
        }
      }
    });
  } else {

    document.value.splice(index, 1);
  }
}


function validadPropertyImage(file: File) {

  const allowedTypes = ["application/pdf", "application/docx", "application/txt", "image/jpg", "image/jpeg", "image/png"];
  const allowedSize = 52428800; //MAX 5MB

  if (file?.size > allowedSize) {

    toast.error("Error. El peso del archivo no puede superar mas de 5Mb", {
      position: toast.POSITION.TOP_CENTER,
      transition: toast.TRANSITIONS.ZOOM,
      autoClose: 4000,
      theme: 'colored',
      toastStyle: {
        fontSize: '16px',
        opacity: '1',
      },
    });

    return false
  }

  if (!allowedTypes.includes(file?.type)) {

    toast.error("Error. Solo se aceptan archivos con extensiones jpg - jpeg - png - pdf ", {
      position: toast.POSITION.TOP_CENTER,
      transition: toast.TRANSITIONS.ZOOM,
      autoClose: 4000,
      theme: 'colored',
      toastStyle: {
        fontSize: '16px',
        opacity: '1',
      },
    });
    return false
  }

  return true
}

function validateDocuments(): boolean {
  let isvalidate = true

  if (document.value.length <= 0) {

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

    document.value.forEach(element => {
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

async function downLoadArchive(param: Documento) {

  //VERIFICAMOS QUE EL ARCHIVO QUE SE ESTA CONSULTADO ESTE GUARDADO EN EL SERVIDOR
  if (param.mode === UPDATE_METHOD) {

    try {
      Swal.fire({
        title: "<strong>DESCARGAR ARCHIVO</strong>",
        icon: "info",
        html: `Haga clic aqui para, <a href="${baseUrl}/download/${param.imagen}" target="_blank">descargar archivo</a>`,
        showCloseButton: false,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: `<i class="fa fa-thumbs-up"></i> Listo!`,
        cancelButtonText: `<i class="fa fa-thumbs-down"></i>`,
        cancelButtonAriaLabel: "Thumbs down"
      });

    } catch (error) {
      toast.warn(`Error: No se pudo descargar el archivo`,{
        delay: 1000,
        position: toast.POSITION.BOTTOM_CENTER,
        transition: toast.TRANSITIONS.ZOOM,
        theme: 'dark',
        autoClose: 3000
      });

    }
  }

}
</script>

<template>

  <v-row>
    <v-col cols="12">
      <br>
      <v-file-input 
        multiple
        clearable 
        label="Haga click para seleccionar todos los archivos necesarios"
        variant="outlined" 
        color="primary"
        required
        @change="viewImages" 
        accept="image/* application/pdf"
        prepend-icon="mdi-camera">
      </v-file-input>

    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" md="12">

    </v-col>


    <v-col v-for="(data, index) in document" :key="index" class="d-flex child-flex" cols="4">

      <v-sheet class="mx-auto" width="300">

        <v-img
          :lazy-src="data.typefile !== DOCUMENT_PDF ? data.mode === UPDATE_METHOD ? `${route_upload}${document[index].imagen}` : `${document[index].imagen}` : `${URLIMAGEPDF}`"
          :src="data.typefile !== DOCUMENT_PDF ? data.mode === UPDATE_METHOD ? `${route_upload}${document[index].imagen}` : `${document[index].imagen}` : URLIMAGEPDF"
          aspect-ratio="1" 
          class="bg-grey-lighten-2 pl-2" 
          contain
        >

          <!-- ICONO DE ELIMINAR -->
          <v-btn 
            density="compact" 
            @click="deldata(data, index)" 
            icon="mdi-delete-forever-outline" 
            disabled
            color="error">
          </v-btn>

          <!-- circulo de cargar -->
          <template v-slot:placeholder>
            <v-row align="center" class="fill-height ma-0" justify="center">
              <v-progress-circular color="grey-lighten-5" indeterminate></v-progress-circular>
            </v-row>
          </template>

        </v-img>

        <v-col cols="12" md="12" @click="downLoadArchive(data)" style="cursor:pointer;">

          <div class="tooltip">

            <div 
              class="tooltiptext" 
              v-if="data.mode === UPDATE_METHOD">
              Clic para descargar!
            </div>

            <v-select 
              :id="'tipo' + index" 
              placeholder="Tipo de archivo" 
              :disabled="data.disabled" 
              class="mt-2"
              clearable 
              chips
              :items="['CEDULA O RIF', 'PAGO', 'RETENCIÓN', 'FACTURA', 'GUIA DESPACHO', 'ORDEN DE VENTA', 'DETALLE DE ENVIO', 'GUIA ZOOM']"
              density="compact"
              label="Indique el tipo de documento"
              variant="outlined"
              :rules="tipoRules"
              :aria-label="'TipoDocuments' + index" 
              color="primary" 
              theme="dark" 
              with-background 
              :key="index"
              v-model="document[index].type" 
              :item-value="document[index].type"
              @update:modelValue="typeValue(index, $event)">
            </v-select>

          </div>
        </v-col>
      </v-sheet>
    </v-col>
    <div>
    </div>
  </v-row>
</template>

<style scoped>

.tooltip {
  position: relative;
  cursor: pointer;
  
}

.tooltip:hover .tooltiptext {
 
  opacity: 1;
}

.tooltiptext {
  width: 160px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 8px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -80px;
}

.tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #333 transparent transparent transparent;
}


</style>