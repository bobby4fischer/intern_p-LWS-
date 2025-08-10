import { reactive, computed } from 'vue'

const store = reactive({
  // Authentication state
  auth: {
    isAuthenticated: false,//localStorage.getItem('isAuthenticated') === 'true',
    user: null //JSON.parse(localStorage.getItem('user')) || null
  },

  // Cart state
  cart: JSON.parse(localStorage.getItem('cart')) || [],

  // --- Actions ---

  // Authentication actions
  login(user) {
    this.auth.isAuthenticated = true
    this.auth.user = user
    // localStorage.setItem('isAuthenticated', 'true')
    // localStorage.setItem('user', JSON.stringify(user))
  },
  logout() {
    this.auth.isAuthenticated = false
    this.auth.user = null
    this.cart = [] // Clear cart on logout
    // localStorage.removeItem('isAuthenticated')
    // localStorage.removeItem('user')
    localStorage.removeItem('cart')
  },

  // Cart actions
  addToCart(product, quantity = 1) {
    const existingItem = this.cart.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      this.cart.push({ ...product, quantity })
    }
    this.saveCart()
  },
  updateQuantity(productId, quantity) {
    const item = this.cart.find(item => item.id === productId)
    if (item) {
      item.quantity = quantity
      if (item.quantity <= 0) {
        this.removeFromCart(productId)
      } else {
        this.saveCart()
      }
    }
  },
  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId)
    this.saveCart()
  },
  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart))
  }
})

// --- Getters (Computed Properties) ---
export const cartCount = computed(() => store.cart.reduce((total, item) => total + item.quantity, 0))
export const cartTotal = computed(() => store.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2))

export default store