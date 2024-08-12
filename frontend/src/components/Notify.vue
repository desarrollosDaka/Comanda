<script setup lang="ts">
const props = defineProps({
    notifyData: {
        type: Object,
        required: true
    }
});
</script>


<template>
    <v-list-item value="1" color="secondary" class="no-spacer py-1">
        <!-- <template v-slot:prepend>
            <v-avatar size="36" variant="flat" color="lightsuccess" class="mr-3 py-2 text-success">
<<<<<<< HEAD
                <GiftOutlined /> 

                 <GiftOutlined />
>>>>>>> 7d76023387e033bc932823f9dd837df91765c43f
            </v-avatar>

        </template>  -->
        <div class="d-inline-flex justify-space-between w-100">
            <h6 class="text-subtitle-1 font-weight-regular mb-0">
                <span style="font-weight: 600">{{ props.notifyData.User_crea }}</span> Ha creado un nuevo documento.
            </h6>
            <span class="text-caption">3:00 PM</span>
        </div>
        <!-- <p class="text-caption text-medium-emphasis my-0">Hace 2 min</p> -->
    </v-list-item>
</template>