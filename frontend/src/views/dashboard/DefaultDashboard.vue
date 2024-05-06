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


