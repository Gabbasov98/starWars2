<script setup>
  import Header from "@/components/Header.vue";
</script>

<template>
  <Header/>
  <!-- <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/hero">Go to hero</RouterLink>
  </nav> -->
  <RouterView />
</template>

<style lang="scss">
@use "./assets/styles/style.scss";
</style>
