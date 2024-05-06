<script setup lang="ts">
// import { ref } from 'vue';
import { RouterLink } from 'vue-router';
// const primary = ref('rgb(var(--v-theme-primary))');
// const darkprimary = ref('rgb(var(--v-theme-darkprimary))');
</script>

<template>
  <!-- LOGO -->
  <div class="logo">
    <RouterLink to="/dashboard" aria-label="logo">
      <div>
        <img class="logoDaka" src="../../../assets/images/logos/comandaDaka.png" alt="logo" width="120" />
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.logoDaka{
  border-radius: 5px;
  margin-left: 27px;
}
</style>
