import { reactive, computed } from 'vue'

// ---------------------------------------------------------------------------
// WHERE THE "TEXT FILE" LIVES:
// A browser app can't write to an arbitrary .txt file on your computer, so
// this uses localStorage instead — it's the closest browser equivalent to a
// text file: a small JSON blob saved on the visitor's own device.
//
// Open DevTools > Application tab > Local Storage > your site, and you'll see:
//   wabisabi_users         -> every registered account (JSON array)
//   wabisabi_current_user  -> whoever is currently logged in (JSON object)
// ---------------------------------------------------------------------------

const USERS_KEY = 'wabisabi_users'
const SESSION_KEY = 'wabisabi_current_user'

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || []
  } catch {
    return []
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null
  } catch {
    return null
  }
}

const state = reactive({
  users: loadUsers(),
  currentUser: loadSession(),
  error: ''
})

function setSession(user) {
  // never keep the password in the active session object
  const { password, ...safeUser } = user
  state.currentUser = safeUser
  localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser))
}

function register({ name, email, password, dob, gender, address, city, postcode, state: regionState }) {
  state.error = ''

  const emailTaken = state.users.some(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  )
  if (emailTaken) {
    state.error = 'An account with this email already exists.'
    return false
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password, // NOTE: demo only — never store plain-text passwords in a real backend
    dob,
    gender,
    address,
    city,
    postcode,
    state: regionState
  }

  state.users.push(newUser)
  saveUsers(state.users)
  setSession(newUser)
  return true
}

function login({ email, password }) {
  state.error = ''

  const user = state.users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
  )

  if (!user) {
    state.error = 'Incorrect email or password.'
    return false
  }

  setSession(user)
  return true
}

function logout() {
  state.currentUser = null
  localStorage.removeItem(SESSION_KEY)
}

const isLoggedIn = computed(() => !!state.currentUser)

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