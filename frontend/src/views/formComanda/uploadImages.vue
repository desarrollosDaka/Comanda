<script setup lang="ts">
import { ref, onMounted, defineEmits, defineProps } from 'vue';
import axios from 'axios'
import Swal from 'sweetalert2'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import imgUrl from '@/assets/images/archivoPdf.png'

const baseUrl = `${import.meta.env.VITE_URL}/api/orders`;

const INSERT_METHOD = 'insert'
const UPDATE_METHOD = 'update'
const DOCUMENT_PDF = 'pdf'
const URLIMAGEPDF = imgUrl

let route_upload = ref()
const props = defineProps({
  ID_detalle: {
    type: String as () => string,
    required: false,
  }, //Id de la Comanda
})


const document = ref<Documento[]>([]);

onMounted(async () => {


  if (props.ID_detalle != undefined) {

    route_upload.value = 'http://localhost:3002/public/'

    try {
      const url = `${baseUrl}/filterOrderDetailsFiles/${props.ID_detalle}`
      const { data } = await axios.get(url);

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
  typefile:string | undefined;
}

interface DocumentData {
  File: string,
  Type_File: string,
  ID_File: number,
  Type_File_Document:string
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
    const extension =file.name.split('.').pop();
    document.value.push({ imagen: base64URL, file, type: null, mode: INSERT_METHOD, disabled: false, Id: 0 , typefile:extension});
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
  }else{

    document.value.splice(index, 1);
  }

}


function validadPropertyImage(file:File) {

    const allowedTypes=["application/pdf","application/docx","application/txt","image/jpg","image/jpeg","image/png"];
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

</script>

<template>

  <v-row>
    <v-col cols="12">
      <br>
      <v-file-input multiple clearable label="Haga click para seleccionar todos los archivos necesarios"
        variant="outlined" color="primary" required @change="viewImages" accept="image/* application/pdf"
        prepend-icon="mdi-camera"></v-file-input>
    </v-col>
  </v-row>


  <v-row>
    <v-col cols="12" md="12">

    </v-col>


    <v-col v-for="(data, index) in document" :key="index" class="d-flex child-flex" cols="4">

      <v-sheet class="mx-auto" width="300">

        <v-img 
          :lazy-src="data.typefile !== DOCUMENT_PDF ? data.mode === UPDATE_METHOD ? `${route_upload}${document[index].imagen}${index * 5 + 10}` : `${document[index].imagen}${index * 5 + 10}` : `${URLIMAGEPDF}${index * 5 + 10}`"
          :src=" data.typefile !== DOCUMENT_PDF ? data.mode === UPDATE_METHOD ? `${route_upload}${document[index].imagen}` : `${document[index].imagen}` : URLIMAGEPDF "
          aspect-ratio="1" class="bg-grey-lighten-2 pl-2 " cover>
       
          <!-- ICONO DE ELIMINAR -->
          <v-btn density="compact" @click="deldata(data, index)" icon="mdi-delete-forever-outline"
            color="error"></v-btn>

          <template v-slot:placeholder>
            <v-row align="center" class="fill-height ma-0" justify="center">
              <v-progress-circular color="grey-lighten-5" indeterminate></v-progress-circular>
            </v-row>
          </template>
        </v-img>

        <v-col cols="12" md="12">

          <v-select :id="'tipo' + index" placeholder="Tipo de archivo" :disabled="data.disabled" class="mt-2" clearable
            chips :items="['CEDULA', 'PAGO', 'RETENCIÓN', 'FACTURA', 'DESPACHO', 'ORDEN DE VENTA']" density="compact"
            label="Indique el tipo de documento" variant="outlined" :rules="tipoRules"
            :aria-label="'TipoDocuments' + index" color="primary" theme="dark" with-background :key="index"
            v-model="document[index].type" :item-value="document[index].type"
            @update:modelValue="typeValue(index, $event)">
          </v-select>

        </v-col>
      </v-sheet>
    </v-col>
    <div>
    </div>
  </v-row>
</template>

<style scoped></style>