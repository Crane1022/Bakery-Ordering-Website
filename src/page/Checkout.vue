<script setup>
import { ref, computed } from 'vue'
import { Plus, Minus, Trash2, CreditCard } from 'lucide-vue-next'

// Mock Data - In a real app, this might come from a store or API
const cart = ref([
  { id: 1, name: "Classic Honey Oat", price: 12.00, qty: 1, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=200" },
  { id: 2, name: "Dark Cacao & Sea Salt", price: 14.00, qty: 2, image: "https://images.unsplash.com/photo-1590080874088-eec64895b423?q=80&w=200" }
])

const updateQty = (id, delta) => {
  const item = cart.value.find(i => i.id === id)
  if (item) {
    item.qty = Math.max(1, item.qty + delta)
  }
}

const removeItem = (id) => {
  cart.value = cart.value.filter(i => i.id !== id)
}

const subtotal = computed(() => cart.value.reduce((acc, item) => acc + (item.price * item.qty), 0))
const shipping = ref(5.00)
const total = computed(() => subtotal.value + shipping.value)
</script>

<template>
  <section class="py-20 px-6 bg-[#FDFCFB]">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-black text-stone-900 mb-10 tracking-tight">
        Your <span class="text-wabi-moss italic font-serif font-medium">Order</span>
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <!-- Left Side: Item List -->
        <div class="lg:col-span-2 space-y-6">
          <div v-if="cart.length === 0" class="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-300">
            <p class="text-stone-500 italic">Your basket is empty.</p>
            <a href="#products" class="text-wabi-moss font-bold underline mt-4 inline-block">Back to Shop</a>
          </div>

          <div v-for="item in cart" :key="item.id" 
              class="flex items-center justify-between bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
            <div class="flex items-center gap-6">
              <img :src="item.image" class="w-20 h-20 object-cover rounded-2xl" />
              <div>
                <h3 class="font-bold text-stone-800">{{ item.name }}</h3>
                <p class="text-wabi-moss font-semibold">${{ item.price.toFixed(2) }}</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="flex items-center border border-stone-200 rounded-full px-3 py-1">
                <button @click="updateQty(item.id, -1)" class="p-1 hover:text-wabi-moss"><Minus class="w-4 h-4"/></button>
                <span class="mx-4 font-bold text-stone-700 w-4 text-center">{{ item.qty }}</span>
                <button @click="updateQty(item.id, 1)" class="p-1 hover:text-wabi-moss"><Plus class="w-4 h-4"/></button>
              </div>
              <button @click="removeItem(item.id)" class="text-stone-300 hover:text-red-400 transition-colors">
                <Trash2 class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <!-- Right Side: Summary & Checkout -->
        <div class="lg:col-span-1">
          <div class="bg-stone-900 text-white p-8 rounded-[2.5rem] sticky top-32 shadow-2xl">
            <h2 class="text-2xl font-bold mb-6">Summary</h2>
            
            <div class="space-y-4 border-b border-stone-700 pb-6">
              <div class="flex justify-between">
                <span class="text-stone-400">Subtotal</span>
                <span>${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-stone-400">Shipping</span>
                <span>${{ shipping.toFixed(2) }}</span>
              </div>
            </div>

            <div class="flex justify-between items-center py-6">
              <span class="text-xl font-medium">Total</span>
              <span class="text-3xl font-black text-wabi-moss">${{ total.toFixed(2) }}</span>
            </div>

            <button class="w-full bg-wabi-moss hover:bg-stone-100 hover:text-stone-900 text-white py-4 rounded-full font-bold transition-all flex items-center justify-center gap-3">
              <CreditCard class="w-5 h-5" />
              Proceed to Payment
            </button>
            
            <p class="text-[10px] text-stone-500 text-center mt-6 uppercase tracking-widest font-bold">
              Secure Checkout • 100% Organic
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>