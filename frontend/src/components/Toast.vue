<script setup>
import { CheckCircle2 } from 'lucide-vue-next'
import { useCart } from '../store/cart'

const { toast } = useCart()
</script>

<template>
  <transition name="toast">
    <div
      v-if="toast.show"
      class="fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-stone-900 text-white px-6 py-4 rounded-2xl shadow-2xl max-w-[90%] sm:max-w-sm"
    >
      <CheckCircle2 class="w-5 h-5 text-wabi-moss shrink-0" />
      <span class="font-semibold text-sm">{{ toast.message }}</span>
    </div>
  </transition>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
