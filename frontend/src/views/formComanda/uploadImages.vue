<script setup lang="ts">
import { ref, onMounted, defineEmits, defineProps } from 'vue';
import axios from 'axios'
import Swal from 'sweetalert2'

const baseUrl = `${import.meta.env.VITE_URL}/api/orders`;

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

        document.value.push({ imagen: data.File, file: null, type: data.Type_File, mode: 'update', disabled: true, Id: data.ID_File });

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
}

interface DocumentData {
  File: string,
  Type_File: string,
  ID_File: number,


}



const emits = defineEmits(['isSelectImages']);

const tipoRules = ref([
  (v: string) => !!v || 'El tipo de documento es requerido',
]);

async function viewImages(event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target.files) return;

  for (const file of target.files) {
    const base64URL = await encodeFileAsBase64URL(file);
    document.value.push({ imagen: base64URL, file, type: null, mode: 'insert', disabled: false, Id: 0 });
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


// function validadPropertyImage(file) {

//     const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "image/JPG", "image/JPEG", "image/PNG"]
//     const allowedSize = 52428800;

//     if (file?.size > allowedSize) {
//         messageError.value = 'El peso del archivo no puede superar mas de 5Mb'
//         return false
//     }

//     if (!allowedTypes.includes(file?.type)) {
//         messageError.value = 'Solo se aceptan archivos con extensiones jpg - jpeg - png - pdf'
//         return false
//     }

//     return true
// }

// function typeValue(index:number, valor:any):void {

//     document.value[index].type = valor
//     emits("isSelectImages", document.value)
// }

// function deldata(index: number): void{

//     document.value.splice(index, 1)

// }



</script>

<template>

  <v-row>
    <v-col cols="12">
      <br>
      <v-file-input multiple clearable label="Haga click para seleccionar todos los archivos necesarios"
        variant="outlined" color="primary" required @change="viewImages" accept="image/png, image/jpeg, image/bmp"
        prepend-icon="mdi-camera"></v-file-input>
    </v-col>
  </v-row>


  <v-row>
    <v-col cols="12" md="12">

    </v-col>


    <v-col v-for="(data, index) in document" :key="index" class="d-flex child-flex" cols="4">

      <v-sheet class="mx-auto" width="300">
        <v-img
          :lazy-src="data.mode === 'update' ? `${route_upload}${document[index].imagen}${index * 5 + 10}` : `${document[index].imagen}${index * 5 + 10}`"
          :src="data.mode === 'update' ? `${route_upload}${document[index].imagen}` : `${document[index].imagen}`"
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