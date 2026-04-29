<script setup>
import { ref } from 'vue'
import { ShoppingBag, Menu, X } from 'lucide-vue-next'

// Track menu is Open
const isMenuOpen = ref(false)

// Function to close menu when a link is clicked
const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <nav class="sticky top-6 z-50 flex items-center justify-between px-8 py-3 mx-auto w-[90%] max-w-5xl bg-white/60 backdrop-blur-md rounded-full border border-stone-200/50 shadow-[0_20px_40px_-15px_rgba(93,112,82,0.12)]">
    <div class="font-serif text-2xl font-bold text-wabi-moss">WabiSabi Home</div>

    <div class="hidden md:flex items-center gap-8 font-medium text-stone-600">
        <router-link to="/" class="hover:text-wabi-moss transition-colors">
            Home
        </router-link>
        <router-link to="/shop" class="hover:text-wabi-moss transition-colors">
            Order Now
        </router-link>
        <a href="#" class="hover:text-wabi-moss transition-colors">Our Ingredients</a>
        <a href="#" class="hover:text-wabi-moss transition-colors">Reviews</a>
    </div>
    <div class="flex items-center gap-4">
      <div class="relative cursor-pointer text-stone-600 hover:text-wabi-moss transition-colors mr-2">
        <ShoppingBag class="w-6 h-6" />
        <span class="absolute -top-2 -right-2 bg-wabi-moss text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">0</span>
      </div>

        <router-link to="/checkout" class="hover:text-wabi-moss transition-colors">
            <button class="hidden md:flex bg-wabi-moss text-white px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all active:scale-95 shadow-md">
                Check Out
            </button>
        </router-link>

      <button @click="isMenuOpen = !isMenuOpen" class="flex md:hidden items-center p-2 text-wabi-moss">
        <Menu v-if="!isMenuOpen" class="w-6 h-6" />
        <X v-else class="w-6 h-6" />
      </button>
    </div>

    <!-- Mobile Dropdown List -->
    <transition name="slide">
      <div v-if="isMenuOpen" class="absolute top-20 left-0 w-full bg-white/95 backdrop-blur-lg rounded-3xl border border-stone-200 shadow-xl p-8 flex flex-col gap-6 md:hidden z-40">
        <router-link @click="closeMenu" to="/" class="text-xl font-bold text-stone-800 px-6 py-4 rounded-2xl transition-all hover:bg-wabi-moss/10 hover:text-wabi-moss active:scale-95">Home</router-link>
        <router-link @click="closeMenu" to="/shop" class="text-xl font-bold text-stone-800 px-6 py-4 rounded-2xl transition-all hover:bg-wabi-moss/10 hover:text-wabi-moss active:scale-95">Order Now</router-link>
        <a @click="closeMenu" href="#" class="text-xl font-bold text-stone-800 px-6 py-4 rounded-2xl transition-all hover:bg-wabi-moss/10 hover:text-wabi-moss active:scale-95">Our Ingredients</a>
        <a @click="closeMenu" href="#" class="text-xl font-bold text-stone-800 px-6 py-4 rounded-2xl transition-all hover:bg-wabi-moss/10 hover:text-wabi-moss active:scale-95">Reviews</a>
        <hr class="border-stone-100" />
        <router-link @click="closeMenu" to="/checkout">
          <button class="w-full bg-wabi-moss text-white py-4 rounded-full font-bold">Check Out</button>
        </router-link>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
/* Animation for the dropdown */
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease-out;
}
.slide-enter-from, .slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>