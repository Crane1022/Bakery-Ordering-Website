import { reactive, computed } from 'vue'
import { useAuth } from './auth'

// Same idea as auth.js: no real backend here, so purchase history is saved
// under the key "wabisabi_orders" in localStorage (DevTools > Application >
// Local Storage).

const ORDERS_KEY = 'wabisabi_orders'

function loadOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []
  } catch {
    return []
  }
}

function saveOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
}

const state = reactive({
  orders: loadOrders()
})

function placeOrder({ userId, items, total, paymentMethod }) {
  const order = {
    id: Date.now(),
    userId,
    date: new Date().toISOString(),
    items,
    total,
    paymentMethod,
    status: 'Paid'
  }

  state.orders.unshift(order)
  saveOrders(state.orders)
  return order
}

export function useOrders() {
  const { currentUser } = useAuth()

  const myOrders = computed(() =>
    currentUser.value
      ? state.orders.filter((o) => o.userId === currentUser.value.id)
      : []
  )

  return {
    myOrders,
    placeOrder
  }
}
