<template>
  <base-template :loading="loading">
    <h1>{{ category }}</h1>

    <!-- Search Input -->
    <div class="mb-4">
      <input type="text" class="form-control" placeholder="Search for products..." v-model="searchQuery" v-focus>
    </div>

    <div class="row">
      <div v-if="loading" class="col-12 text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <template v-else>
        <!--Show products only when we have them -->
          <!-- Wrap the v-if in a template with v-for -->
          <template v-if="filteredProducts.length > 0">
            <div class="col-md-4 mb-4" v-for="product in filteredProducts" :key="product.id">
              <product-card :product="product" @add-to-cart="handleAddToCart" />
            </div>
          </template>

          <!-- Show "no products" message only when not loading and no products found -->
          <div v-else class="col-12 text-center">
            <h3>{{ searchQuery ? 'No products found matching your search.' : 'No products available.' }}</h3>
          </div>
      </template>
    </div>
  </base-template>
</template>

  <script setup>
import { ref, onMounted, watch, computed } from 'vue'
import BaseTemplate from '../components/BaseTemplate.vue'
import ProductCard from '../components/ProductCard.vue'
import store from '../store.js'

const props = defineProps({
  category: String
})

const loading = ref(true)//true as we are loading products
const products = ref([])
const searchQuery = ref('') //FOR v-model

const fetchProducts = async (category) => {
  loading.value = true
  try {
    const response = await fetch(`http://localhost:3000/products?category=${category}`)
    products.value = await response.json()
  } catch (error) {
    console.error('Failed to fetch products:', error)
  } finally {
    loading.value = false
  }
}

//Computed Property: Reactively filters products
const filteredProducts = computed(() => {
  if (!searchQuery.value) {
    return products.value
  }
  return products.value.filter(product => {
    return product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})

const handleAddToCart = (productId) => {
  const product = products.value.find(p => p.id === productId)
  if (product) store.addToCart(product)
  alert(`Product ${product.name} added to cart!`)
}

onMounted(() => fetchProducts(props.category))

watch(() => props.category, (newCategory) => {
  fetchProducts(newCategory)
})
</script>
