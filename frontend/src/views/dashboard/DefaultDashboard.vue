<script setup lang="ts">
import WidgetFive from './components/WidgetFive.vue';
import UniqueVisitor from './components/UniqueVisitor.vue';
import IncomeOverview from './components/IncomeOverview.vue';
import RecentOrder from './components/RecentOrder.vue';
import AnalyticsReport from './components/AnalyticsReport.vue';
import HelpSupport from './components/HelpSupport.vue';
import TransactionHistory from './components/TransactionHistory.vue';
import SalesReport from './components/SalesReport.vue';
import Banner from './components/Banners.vue';

const PUBLIC_VAPID_KEY: string = "BChYwJmtdx1DnCyWvAImpEzQXmNnLQavrl1CtZxwwRlxhiq5F3Uj_AmqQUKH87H7QUd-dGfMAsMwR61vUhHwAOo";
const route: string = "http://localhost:3002/api"

const subscription = async (): Promise<void> => {
  // Service Worker
  console.log("Registering a Service worker");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/"
  });
  console.log("New Service Worker");

  // Listen Push Notifications
  console.log("Listening Push Notifications");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
  });

  console.log(subscription);

  // Send Notification
  await fetch(route + "/subscription", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json"
    }
  });
  console.log("Subscribed!");
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

fetch(route + '/notification', {
  method: 'POST',
  body: JSON.stringify({ message: "BIENVENIDO" }),
  headers: {
    'Content-Type': 'application/json'
  }
});

// Service Worker Support
if ("serviceWorker" in navigator) {
  subscription().catch((err: any) => console.log(err));
}
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


  <!-- TABLA y GRAFICO -->
  <v-row class="mb-0">

    <!-- TABLA -->
    <v-col cols="12" md="8">
      <RecentOrder />
    </v-col>

    <!-- ANALITICA -->
    <v-col cols="12" md="4">
      <AnalyticsReport />
    </v-col>


  </v-row>

  <!-- REPORTES y OPCIONES -->
  <v-row>
    <!-- Chart3 -->
    <v-col cols="12" md="7">
      <SalesReport />
    </v-col>

    <v-col cols="12" md="5">
      <v-row>
        <!-- NUEVA PLANTILLAS -->
        <v-col cols="12">
          <TransactionHistory />
        </v-col>

        <!-- HISTORIAL -->
        <v-col cols="12">
          <HelpSupport />
        </v-col>
      </v-row>
    </v-col>
    
  </v-row>
</template>

<style>
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #838282;
  color: #777;
}

::-webkit-scrollbar-track {
  background-color: #f2f2f2;
}

::-webkit-scrollbar-thumb {
    background-color: rgb(122, 122, 122);
    border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
    background-color: rgb(87, 85, 85);
    border-radius: 4px; 
}
</style>


