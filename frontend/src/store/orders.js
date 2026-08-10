import { reactive, computed } from 'vue'
import { apiFetch } from '../api/client'
import { useAuth } from './auth'

// ---------------------------------------------------------------------------
// placeOrder() now sends { items: [{ product_id, quantity }] } to the backend.
// The backend looks up real prices and calculates the total itself -- it does
// NOT trust a total sent from the frontend, so we don't send one.
//
// myOrders is now loaded on demand via fetchOrderHistory() rather than kept
// permanently in localStorage. Call this once when Profile.vue mounts.
// ---------------------------------------------------------------------------

const state = reactive({
  orders: [],
  loading: false
})

async function placeOrder(cartItems, paymentMethod) {
  // cartItems come from useCart().items -- shape: { id, name, price, image, qty }
  // Backend only needs product id + quantity; it looks up price itself.
  const items = cartItems.map((item) => ({
    product_id: item.id,
    quantity: item.qty
  }))

  const data = await apiFetch('/orders', {
    method: 'POST',
    body: JSON.stringify({ items, payment_method: paymentMethod })
  })

  // data = { order_id, total }
  return data
}

async function fetchOrderHistory() {
  state.loading = true
  try {
    const data = await apiFetch('/orders/history')
    state.orders = data
  } finally {
    state.loading = false
  }
}

export function useOrders() {
  const { isLoggedIn } = useAuth()

  const myOrders = computed(() => (isLoggedIn.value ? state.orders : []))

  return {
    myOrders,
    loading: computed(() => state.loading),
    placeOrder,
    fetchOrderHistory
  }
}
