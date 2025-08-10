<template>
  <base-template :loading="loading">
    <!-- Conditional Rendering: v-if/v-else -->
    <div v-if="product" class="row">
      <div class="col-md-6">
        <!-- Attribute Binding -->
        <img :src="product.image" class="img-fluid" :alt="product.name">
    </div>
      <div class="col-md-6">
        <!-- Text Interpolation -->
        <h2>{{ product.name }}</h2>
        <p class="text-muted">${{ product.price }}</p>
        <p>{{ product.description }}</p>
        <button @click="handleAddToCart"  class="btn btn-primary">Add to Cart</button>
      </div>
    </div>
    <div v-else-if="!loading" class="text-center">
      <h2>Product not found</h2>
      <router-link to="/">Go back to Home</router-link>
    </div>
  </base-template>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BaseTemplate from '../components/BaseTemplate.vue'
import store from '../store.js'

// Props: Receiving the 'id' from the router
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const loading = ref(true)
const product = ref(null)

function handleAddToCart() {
  if (product.value) {
    store.addToCart(product.value)
    alert(`Product ${product.value.name} added to cart!`)
  }
}

onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:3000/products/?id=${props.id}`)
    if (response.status === 404) {
      product.value = null
    } else if (response.ok) {
      const data = await response.json()
      product.value = data[0]
    } else {
      throw new Error('Failed to fetch product details')
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.img-fluid {
  max-width: 100%;
height: auto;
border-radius: 8px;
object-fit: contain;
max-height: 500px; 
width: 100%;
background: #f8f9fa;
padding: 15px;
}

</style>