// ---------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH FOR TALKING TO THE BACKEND
// Every store (auth, orders, reviews) imports apiFetch() from here instead of
// writing its own fetch() calls. This keeps the base URL, JSON headers, and
// auth token attachment consistent everywhere -- change it once, it's fixed
// everywhere.
// ---------------------------------------------------------------------------

// const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const TOKEN_KEY = 'wabisabi_token'

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

// path example: '/auth/login', '/products', '/orders'
export async function apiFetch(path, options = {}) {
  const token = getToken()

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    // Backend always sends { error: "message" } on failure
    throw new Error(data?.error || 'Something went wrong. Please try again.')
  }

  return data
}
