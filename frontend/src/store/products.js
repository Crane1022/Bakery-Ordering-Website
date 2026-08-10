import { reactive } from 'vue'
import { apiFetch } from '../api/client'

// ---------------------------------------------------------------------------
// `products` is still exported the same way as before (a plain array
// Product_List.vue and Shop.vue can loop over directly) -- but now it's a
// reactive array populated from GET /api/products instead of hardcoded data.
//
// Using reactive([]) + .splice() (rather than reassigning `products = data`)
// keeps the SAME array reference alive, so components that already grabbed
// a reference to `products` still see updates once the fetch resolves.
// ---------------------------------------------------------------------------

export const categories = ['All', 'Traditional', 'Indulgent', 'Seasonal', 'Gluten-Free']

export const products = reactive([])

export const productsState = reactive({
  loading: false,
  error: '',
  loaded: false // prevents re-fetching every time a component mounts
})

export async function fetchProducts() {
  if (productsState.loaded || productsState.loading) return

  productsState.loading = true
  productsState.error = ''

  try {
    const data = await apiFetch('/products')

    // MySQL returns DECIMAL columns (price) as strings, e.g. "12.00" --
    // convert to a real number here, once, so every component downstream
    // can safely call product.price.toFixed(2) without crashing.
    const normalized = data.map((p) => ({ ...p, price: Number(p.price) }))

    products.splice(0, products.length, ...normalized)
    productsState.loaded = true
  } catch (err) {
    productsState.error = err.message || 'Failed to load products'
  } finally {
    productsState.loading = false
  }
}
