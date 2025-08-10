<template>
  <base-template>
    <h1>Shopping Cart</h1>
    <div v-if="store.cart.length === 0" class="text-center">
      <p>Your cart is empty.</p>
      <router-link to="/" class="btn btn-primary">Continue Shopping</router-link>
    </div>
    <div v-else>
      <ul class="list-group mb-3">
        <li v-for="item in store.cart" :key="item.id" class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <h5>{{ item.name }}</h5>
            <p class="mb-1">${{ (item.price || 0).toFixed(2) }}</p>
            <div class="d-flex align-items-center">
              <button class="btn btn-sm btn-secondary" @click="store.updateQuantity(item.id, item.quantity - 1)">-</button>
              <span class="mx-2">{{ item.quantity }}</span>
              <button class="btn btn-sm btn-secondary" @click="store.updateQuantity(item.id, item.quantity + 1)">+</button>
            </div>
          </div>
          <button class="btn btn-danger btn-sm" @click="store.removeFromCart(item.id)">Remove</button>
        </li>
      </ul>
      <div class="d-flex justify-content-end">
        <h4>Total: ${{ total.toFixed(2) }}</h4>
      </div>
    </div>
  </base-template>
</template>

<script setup>
import { computed } from 'vue'
import BaseTemplate from '../components/BaseTemplate.vue'
import store from '../store'

const total = computed(() => {
return store.cart.reduce((sum, item) => {
  return sum + (item.price * item.quantity)
}, 0)
})
</script>