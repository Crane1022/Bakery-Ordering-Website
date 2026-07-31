import { reactive, computed } from 'vue'

// Single shared reactive state so every component (Navbar, Shop, Product List,
// Checkout) reads/writes the SAME cart instead of local mock data.
const state = reactive({
  items: [],           // { id, name, price, image, qty }
  toast: {
    show: false,
    message: ''
  }
})

let toastTimer = null

function showToast(message) {
  state.toast.message = message
  state.toast.show = true

  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    state.toast.show = false
  }, 2200)
}

function addToCart(product) {
  const existing = state.items.find((i) => i.id === product.id)

  if (existing) {
    existing.qty += 1
  } else {
    state.items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1
    })
  }

  showToast(`${product.name} added to cart!`)
}

function updateQty(id, delta) {
  const item = state.items.find((i) => i.id === id)
  if (item) {
    item.qty = Math.max(1, item.qty + delta)
  }
}

function removeItem(id) {
  state.items = state.items.filter((i) => i.id !== id)
}

function clearCart() {
  state.items = []
}

const cartCount = computed(() =>
  state.items.reduce((sum, i) => sum + i.qty, 0)
)

const subtotal = computed(() =>
  state.items.reduce((sum, i) => sum + i.price * i.qty, 0)
)

// Composable-style export so any component can just do:
// const { items, cartCount, addToCart } = useCart()
export function useCart() {
  return {
    items: computed(() => state.items),
    toast: computed(() => state.toast),
    cartCount,
    subtotal,
    addToCart,
    updateQty,
    removeItem,
    clearCart
  }
}
