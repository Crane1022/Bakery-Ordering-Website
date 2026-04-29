import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import Home from './page/HelloWorld.vue'
import Shop from './page/Shop.vue'
import Checkout from './page/Checkout.vue'

// Define the routes path
const routes = [
  { path: '/', component: Home },
  { path: '/shop', component: Shop },
  { path: '/checkout', component: Checkout },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// createApp(App).mount('#app')
// Create the app instance
const app = createApp(App)

// THIS IS THE MISSING LINK:
app.use(router) 

app.mount('#app')
