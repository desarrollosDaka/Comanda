<script setup lang="ts">
import { onMounted, ref } from "vue";
import WidgetFive from './components/WidgetFive.vue';
import IncomeOverview from './components/IncomeOverview.vue';
import AnalyticsReport from './components/AnalyticsReport.vue';
import HelpSupport from './components/HelpSupport.vue';
import SalesReport from './components/SalesReport.vue';
import Banner from './components/Banners.vue';

const usuario = ref();
const jsonFromLocalStorage = localStorage.getItem('user');
if (jsonFromLocalStorage !== null) {
  const parsedData = JSON.parse(jsonFromLocalStorage);
  usuario.value = parsedData.data.Nombre;
}

const PUBLIC_VAPID_KEY: string = "BChYwJmtdx1DnCyWvAImpEzQXmNnLQavrl1CtZxwwRlxhiq5F3Uj_AmqQUKH87H7QUd-dGfMAsMwR61vUhHwAOo";
const route: string = `${import.meta.env.VITE_URL}/api`

const subscription = async (): Promise<void> => {
  // Service Worker
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/"
  });

  // Listen Push Notifications
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
  });

  // Send Notification
  console.log(route)
  await fetch(route + "/subscription", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json"
    }
  });
};

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

onMounted(async () => {
   try {
    const response = await subscription();
    console.log(response)
   } catch (error) {
    console.error(error)
   }
})

</script>
<template>

  <!-- Banner -->
  <Banner />
  <!-- BALDOSAS -->
  <WidgetFive />

  <!-- CHART1 -->
  <!-- <v-row class="mb-0">
  
    <v-col cols="12" md="8">
      <UniqueVisitor />
    </v-col>

    <v-col cols="12" md="4">
      <IncomeOverview />
    </v-col>
  </v-row> -->

  <!-- REPORTES y OPCIONES -->
  <v-row>
    <!-- Chart3 -->
    <!-- <v-col cols="12" md="7">
      <SalesReport />
    </v-col> -->

    <v-col cols="12" md="5">
      <v-row>
        <!-- NUEVA PLANTILLAS -->
        <!-- <v-col cols="12">
          <TransactionHistory />
        </v-col> -->


        <v-col cols="12">
          <HelpSupport />
        </v-col>
      </v-row>
    </v-col>

  </v-row>
</template>
