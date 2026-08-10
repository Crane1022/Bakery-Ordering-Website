import { reactive, computed } from 'vue'
import { apiFetch, setToken, clearToken, getToken } from '../api/client'

const SESSION_KEY = 'wabisabi_current_user'

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null
  } catch {
    return null
  }
}

const state = reactive({
  currentUser: loadSession(),
  error: ''
})

function setSession(user, token) {
  state.currentUser = user
  setToken(token)
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

async function register({ Bakery-Ordering-Website, email, password, dob, gender, address, city, postcode, state: regionState }) {
  state.error = ''

  try {
    const data = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ Bakery-Ordering-Website, email, password, dob, gender, address, city, postcode, state: regionState })
    })

    setSession(data.user, data.token)
    return true
  } catch (err) {
    state.error = err.message
    return false
  }
}

async function login({ email, password }) {
  state.error = ''

  try {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })

    setSession(data.user, data.token)
    return true
  } catch (err) {
    state.error = err.message
    return false
  }
}

function logout() {
  state.currentUser = null
  clearToken()
  localStorage.removeItem(SESSION_KEY)
}

const isLoggedIn = computed(() => !!state.currentUser && !!getToken())

export function useAuth() {
  return {
    currentUser: computed(() => state.currentUser),
    isLoggedIn,
    error: computed(() => state.error),
    register,
    login,
    logout
  }
}
