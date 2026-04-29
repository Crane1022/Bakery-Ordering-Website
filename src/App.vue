<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Navbar />
  
  <!-- Fixed all page show Navbar and Footer -->
  <main>
    <router-view v-slot="{ Component }">
      <transition 
        name="fade" 
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </main>

  <Footer />
</template>

<style>
/* Smooth transition between pages */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Global scroll behavior for anchor links */
html {
  scroll-behavior: smooth;
}
</style>