<script setup>
defineProps({
  ingredient: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="group bg-white p-4 rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500">
    <div class="relative aspect-square overflow-hidden rounded-[1.5rem] mb-6">
      <span class="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-wabi-moss">
        {{ ingredient.origin }}
      </span>
      <img :src="ingredient.image" :alt="ingredient.name"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
    </div>

    <div class="space-y-2 px-2 pb-2">
      <h3 class="text-xl font-bold text-stone-800">{{ ingredient.name }}</h3>
      <p class="text-sm text-stone-500 leading-relaxed">
        {{ ingredient.description }}
      </p>
      <div class="flex flex-wrap gap-2 pt-2">
        <span
          v-for="tag in ingredient.tags"
          :key="tag"
          class="text-[10px] font-bold uppercase tracking-widest bg-wabi-moss/10 text-wabi-moss px-3 py-1 rounded-full">
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>
