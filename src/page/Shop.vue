<script setup>
import { ref, computed } from 'vue'
import { ShoppingCart, LayoutGrid, Columns2, Search, SlidersHorizontal } from 'lucide-vue-next'

const viewColumns = ref(4) // Default view
const searchQuery = ref('')
const selectedCategory = ref('All')
const sortBy = ref('featured')

const categories = ['All', 'Traditional', 'Indulgent', 'Seasonal', 'Gluten-Free']

const products = ref([
    { id: 1, name: "Classic Honey Oat", price: 12.00, category: "Traditional", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=600" },
    { id: 2, name: "Dark Cacao & Sea Salt", price: 14.00, category: "Indulgent", image: "https://images.unsplash.com/photo-1590080874088-eec64895b423?q=80&w=600" },
    { id: 3, name: "Lavender Lemon", price: 13.00, category: "Seasonal", image: "https://images.unsplash.com/photo-1530648672449-81f6c723e2c1?q=80&w=600" },
    { id: 4, name: "Matcha Shortbread", price: 15.00, category: "Seasonal", image: "https://images.unsplash.com/photo-1515706886582-54c73c5eaf41?q=80&w=600" },
])

// Filtered and Sorted Logic
const filteredProducts = computed(() => {
let result = products.value.filter(p => 
    (selectedCategory.value === 'All' || p.category === selectedCategory.value) &&
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
)

if (sortBy.value === 'price-low') result.sort((a, b) => a.price - b.price)
if (sortBy.value === 'price-high') result.sort((a, b) => b.price - a.price)

return result
})
</script>

<template>
    <div class="pt-32 pb-20 px-6 min-h-screen bg-[#FDFCFB]">
        <div class="max-w-7xl mx-auto">
        
            <!-- Top Bar: Search & View Toggle -->
            <div class="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                <div class="relative w-full md:w-96">
                    <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input v-model="searchQuery" type="text" placeholder="Search our bakery..." 
                            class="w-full pl-12 pr-4 py-3 rounded-full border border-stone-200 bg-white focus:ring-2 focus:ring-wabi-moss/20 outline-none transition-all" />
                </div>

                <div class="flex items-center gap-6 self-end">
                    <div class="flex items-center gap-2 bg-stone-100 p-1 rounded-xl">
                        <button @click="viewColumns = 2" :class="{'bg-white shadow-sm': viewColumns === 2}" class="p-2 rounded-lg transition-all">
                            <Columns2 class="w-5 h-5 text-stone-600" />
                        </button>
                        <button @click="viewColumns = 4" :class="{'bg-white shadow-sm': viewColumns === 4}" class="p-2 rounded-lg transition-all">
                            <LayoutGrid class="w-5 h-5 text-stone-600" />
                        </button>
                    </div>
                    <select v-model="sortBy" class="bg-transparent font-bold text-stone-700 outline-none cursor-pointer">
                        <option value="featured">Sort by: Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>
            </div>

            <div class="flex flex-col lg:flex-row gap-12">
                
                <!-- Left Sidebar: Filters -->
                <aside class="w-full lg:w-64 space-y-8">
                <div>
                    <h3 class="flex items-center gap-2 font-black text-stone-900 uppercase tracking-widest text-sm mb-6">
                    <SlidersHorizontal class="w-4 h-4" /> Categories
                    </h3>
                    <div class="space-y-3">
                    <button v-for="cat in categories" :key="cat" 
                            @click="selectedCategory = cat"
                            :class="selectedCategory === cat ? 'text-wabi-moss font-bold translate-x-2' : 'text-stone-500'"
                            class="block transition-all hover:text-wabi-moss">
                        {{ cat }}
                    </button>
                    </div>
                </div>

                <div class="p-6 bg-wabi-moss/5 rounded-[2rem] border border-wabi-moss/10">
                    <p class="text-xs font-bold text-wabi-moss uppercase mb-2">Notice</p>
                    <p class="text-sm text-stone-600 leading-relaxed">All orders placed after 2pm will be baked and shipped the next morning.</p>
                </div>
                </aside>

                <!-- Right Side: Product Grid -->
                <!-- - Always 'grid-cols-1' for mobile.
                    - If viewColumns is 2: use 'md:grid-cols-2'
                    - If viewColumns is 4: use 'md:grid-cols-2 lg:grid-cols-4' -->

                <div class="flex-1">
                    <div :class="['grid gap-8 transition-all duration-500 grid-cols-1', 
                        viewColumns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-4'
                    ]">
                        <div v-for="product in filteredProducts" :key="product.id" 
                            class="group bg-white p-4 rounded-[2.5rem] border border-stone-100 hover:shadow-xl transition-all">
                        
                        <div class="relative aspect-square overflow-hidden rounded-[2rem] mb-4">
                            <img :src="product.image" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>

                        <div class="px-2">
                            <div class="flex justify-between items-start mb-2">
                            <h3 class="font-bold text-stone-800">{{ product.name }}</h3>
                            <span class="font-black text-stone-900">${{ product.price.toFixed(2) }}</span>
                            </div>
                            <button class="w-full mt-4 bg-stone-900 text-white py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-wabi-moss transition-all">
                            <ShoppingCart class="w-4 h-4" />
                            Add
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Empty State If No Product -->
                <div v-if="filteredProducts.length === 0" class="text-center py-20">
                    <p class="text-stone-400 italic font-serif">No biscuits found in this category...</p>
                </div>
                </div>

            </div>
        </div>
    </div>
</template>