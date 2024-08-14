<script setup lang="ts">
import { router } from '@/router';
import axios from 'axios';


const props = defineProps({
    notifyData: {
        type: Object,
        required: true
    }
});

const deletee = async (ID_Notifications: string) => {
    const res = await axios.put(`http://localhost:3002/api/update/notify/${ID_Notifications}`);
    return res;
}

const confirmDelete = async (ID_Notifications: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta notificación?')) {
        const res = await deletee(ID_Notifications);
        console.log(res);
    }
}

const redirectToCommnd = () => {
    router.push('/')
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

            <button class="delete" @click="confirmDelete(props.notifyData.ID_Notifications)">x</button>
            <!-- 
        <p class="text-caption text-medium-emphasis my-0">Hace 2 min</p> -->
        </div>

    </v-list-item>
</template>

<style scoped>
.delete {
    background-color: #e4605e;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.5rem;
    font-weight: bold;
    color: #b489ac;

}

.delete:hover {
    scale: 110%;
    transition: 0.4s;
    background-color: #df0000;
    color: #000000;
}
</style>