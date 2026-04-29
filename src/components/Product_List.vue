<script setup>
const products = [
  {
    id: 1,
    name: "Classic Honey Oat",
    description: "Slow-baked with organic wild honey and rolled oats.",
    price: "$12.00",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=500&auto=format&fit=crop",
    tag: "Best Seller"
  },
  {
    id: 2,
    name: "Dark Cacao & Sea Salt",
    description: "Rich 70% dark chocolate with a pinch of hand-harvested salt.",
    price: "$14.00",
    image: "https://images.unsplash.com/photo-1590080874088-eec64895b423?q=80&w=500&auto=format&fit=crop",
    tag: "New"
  },
  {
    id: 3,
    name: "Lavender Lemon Shortbread",
    description: "Delicate floral notes paired with fresh zesty citrus.",
    price: "$13.00",
    image: "https://images.unsplash.com/photo-1530648672449-81f6c723e2c1?q=80&w=500&auto=format&fit=crop",
    tag: "Seasonal"
  }
]
</script>

<template>
  <section id="products" class="py-24 px-6 bg-stone-50/30">
    <div class="max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16 space-y-4">
        <h2 class="text-4xl md:text-5xl font-black text-stone-900 tracking-tight">
          Our Seasonal <span class="text-wabi-moss italic font-serif font-medium">Flavors</span>
        </h2>
        <p class="text-stone-500 max-w-xl mx-auto">
          Every batch is unique, handcrafted with seasonal ingredients sourced from local artisans.
        </p>
      </div>

      <!-- Product Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div v-for="product in products" :key="product.id" 
            class="group cursor-pointer bg-white p-4 rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500">
          
          <!-- Image Container -->
          <div class="relative aspect-square overflow-hidden rounded-[1.5rem] mb-6">
            <span v-if="product.tag" class="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-wabi-moss">
              {{ product.tag }}
            </span>
            <img :src="product.image" :alt="product.name" 
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>

          <!-- Product Info -->
          <div class="space-y-2 px-2">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-bold text-stone-800">{{ product.name }}</h3>
              <span class="text-wabi-moss font-bold">{{ product.price }}</span>
            </div>
            <p class="text-sm text-stone-500 leading-relaxed">
              {{ product.description }}
            </p>
            
            <button class="w-full mt-4 py-3 rounded-full border border-stone-200 text-stone-700 font-bold text-sm hover:bg-wabi-moss hover:text-white hover:border-wabi-moss transition-all">
              Add to Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>