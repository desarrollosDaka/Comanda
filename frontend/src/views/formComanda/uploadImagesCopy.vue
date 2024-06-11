<script setup lang="ts">
import { ref, onMounted, defineEmits } from 'vue';

interface Documento {
  imagen: any;
  file: File;
  type: string | null;
}

const document = ref<Documento[]>([]);

const imagebase64URL = ref("")
const tipo = ref([])

const emits = defineEmits(['isSelectImages']);

const tipoRules = ref([
    (v: string) => !!v || 'El tipo de documento es requerido',
]);

async function viewImages(event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target.files) return;

  for (const file of target.files) {
    const base64URL = await encodeFileAsBase64URL(file);
    document.value.push({ imagen: base64URL, file, type: null });
  }

  emits('isSelectImages', document.value);
}

// async function viewImages(event: any) {

//     const file = event.target.files

//     // console.log(file)

//     for (let i = 0; i < file.length; i++) {

//         const base64URL = await encodeFileAsBase64URL(file[i]);

//         document.value.push(
//             {
//                 imagen: base64URL,
//                 file: file[i],
//                 type: null

//             }
//         )

//     }

//     emits("isSelectImages", document.value)
// }

// async function encodeFileAsBase64URL(file) {
//     return new Promise((resolve) => {
//         const reader = new FileReader();
//         reader.addEventListener('loadend', () => {
//             resolve(reader.result);
//         });
//         reader.readAsDataURL(file);
//     });
// };

async function encodeFileAsBase64URL(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
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

// function delItem(index: number): void{

//     document.value.splice(index, 1)

// }

function typeValue(index: number, valor: string): void {
  document.value[index].type = valor;
  emits('isSelectImages', document.value);
}

function delItem(index: number): void {
  document.value.splice(index, 1);
}

</script>

<template>

    <v-row>
        <v-col cols="12">
            <br>
            <v-file-input multiple clearable label="Haga click para seleccionar todos los archivos necesarios"
                variant="outlined" color="primary" required @change="viewImages"
                accept="image/png, image/jpeg, image/bmp" prepend-icon="mdi-camera"></v-file-input>
        </v-col>
    </v-row>


    <v-row>

        <v-col v-for="(item, index) in document" :key="index" class="d-flex child-flex" cols="4">
 
                <v-sheet class="mx-auto" width="300">
                    <v-img :lazy-src="`${document[index].imagen}${index * 5 + 10}`" :src="`${document[index].imagen}`"
                        aspect-ratio="1" class="bg-grey-lighten-2 pl-2 " cover>

                        <!-- ICONO DE ELIMINAR -->
                        <v-btn density="compact" @click="delItem(index)" icon="mdi-delete-forever-outline" color="error"></v-btn>

                        <template v-slot:placeholder>
                            <v-row align="center" class="fill-height ma-0" justify="center">
                                <v-progress-circular color="grey-lighten-5" indeterminate></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>

                    <v-col cols="12" md="12">

                        <v-select :id="'tipo' + index" placeholder="Tipo de archivo" class="mt-2" clearable chips
                            :items="['CEDULA', 'PAGO', 'RETENCIÓN', 'FACTURA', 'DESPACHO', 'ORDEN DE VENTA']"
                            density="compact" label="Indique el tipo de documento" variant="outlined" :rules="tipoRules"
                            :aria-label="'TipoDocuments' + index" color="primary" theme="dark" with-background
                            :key="index" v-model="document[index].type" :item-value="document[index].type"
                            @update:modelValue="typeValue(index, $event)">
                        </v-select>

                    </v-col>
                </v-sheet>
    

        </v-col>

    </v-row>
</template>

<style scoped></style>