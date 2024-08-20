<script setup lang="ts">
import { router } from '@/router';
import axios from 'axios';
// import { mdiAccount } from '@mdi/js';
import Swal from 'sweetalert2';

const url = `${import.meta.env.VITE_URL}`;


const props = defineProps({
    notifyData: {
        type: Object,
        required: true
    }
});

const deletee = async (ID_Notifications: string) => {
    const res = await axios.put(`${url}/api/update/notify/${ID_Notifications}`);
    return res;
}

// const confirmDelete = async (ID_Notifications: string) => {
//     if (confirm('¿Estás seguro de que deseas eliminar esta notificación?')) {
//         const res = await deletee(ID_Notifications);
//         console.log(res);
//     }
// }


const confirmDelete = async (ID_Notifications: string) => {
    const result = await Swal.fire({
        position: "top-start",
        title: '¿Estás seguro de que deseas eliminar esta notificación?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
        const res = await deletee(ID_Notifications);
        console.log(res);
    }
};

const redirectToCommnd = async () => {
    console.log("props.notifyData.ID_detalle", props.notifyData.ID_detalle);
    const res = await axios.get(`${url}/api/id-comanda/${props.notifyData.ID_detalle}`);
    router.push(`/viewProcessComandas/${props.notifyData.ID_detalle}/${res.data[0].ID}`)
}
</script>

<template>
    <v-list-item value="1" color="secondary" class="no-spacer py-1">

        <div class="d-inline-flex justify-space-between w-100">
            <div @click="redirectToCommnd()">
                <h6 class="text-subtitle-1 font-weight-regular mb-0">
                    <span style="font-weight: 600">{{ props.notifyData.User_crea }}</span> Ha creado un nuevo documento.
                </h6>
                <!-- <span class="text-caption">3:00 PM</span> -->
            </div>

            <button class="delete" @click="confirmDelete(props.notifyData.ID_Notifications)"> <v-icon
                    icon="$delete"></v-icon></button>
            <!-- 
        <p class="text-caption text-medium-emphasis my-0">Hace 2 min</p> -->
        </div>

    </v-list-item>
</template>

<style scoped>
.delete {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.5rem;
    font-weight: bold;
}

.delete:hover {
    scale: 110%;
    transition: 0.4s;
}

</style>