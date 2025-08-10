<template>
  <base-template :loading="loading">

    <!-- Search Input -->
    <div class="mb-4">
      <input type="text" class="form-control" placeholder="Search by Category..." v-model="searchQuery" v-focus>

      <!-- Search Results Message -->
      <div v-if="searchQuery" class="alert alert-info mt-3">
        <p class="mb-0">
          Try searching in specific categories using the category cards below!
        </p>
      </div>
    </div>

    <!-- Search Results -->
    <div v-if="searchQuery" class="mb-4">
      <h2 class="mb-3">Search Results</h2>
      <div class="row">
        <template v-if="filteredCategories.length > 0">
          <div class="col-md-4 mb-3" v-for="category in filteredCategories" :key="category.name">
            <div class="card category-card" @click="navigateToCategory(category.path)">
              <div class="card-body text-center">
                <i :class="category.icon + ' category-icon'"></i>
                <h5 class="card-title mt-2">{{ category.name }}</h5>
              </div>
            </div>
          </div>
        </template>
        <div v-else class="col-12 text-center">
          <h3>No categories found matching your search.</h3>
        </div>
      </div>
    </div>

    <!-- Hot Deals Carousel  && categories also-->
     <!--only show when not searching-->
    <div v-else>
      <div class="hot-deals mb-4">
      <h2 class="mb-3">Today's Hot Deals</h2>
      <div id="hotDealsCarousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div v-for="(group, index) in hotDealsGroups" :key="index" class="carousel-item"
            :class="{ active: index === 0 }">
            <div class="row">
              <div v-for="product in group" :key="product.id" class="col-md-4">
                <product-card :product="product" @add-to-cart="handleAddToCart" />
              </div>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#hotDealsCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#hotDealsCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>

    <!-- Category Cards -->
    <div class="categories mb-4">
      <h2 class="mb-3">Shop by Category</h2>
      <div class="row">
          <div class="col-md-4 mb-3" v-for="category in filteredCategories" :key="category.name">
            <div class="card category-card" @click="navigateToCategory(category.path)">
              <div class="card-body text-center">
                <i :class="category.icon + ' category-icon'"></i>
                <h5 class="card-title mt-2">{{ category.name }}</h5>
              </div>
            </div>
          </div>
      </div>
    </div>
    </div>

    <!-- Grid Layout -->
    <!-- <div class="row">
      <div v-if="loading" class="col-12 text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <template v-else>
        //Show products only when we have them
        //Wrap the v-if in a template with v-for
        <template v-if="filteredProducts.length > 0">
          <div class="col-md-4 mb-4" v-for="product in filteredProducts" :key="product.id">
            <product-card :product="product" @add-to-cart="handleAddToCart" />
          </div>
        </template>

        //Show "no products" message only when not loading and no products found
        <div v-else class="col-12 text-center">
          <h3>{{ searchQuery ? 'No products found matching your search.' : 'No products available.' }}</h3>
        </div>
      </template>
    </div> -->
  </base-template>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseTemplate from '../components/BaseTemplate.vue'
import ProductCard from '../components/ProductCard.vue' // Import the new component
import store from '../store.js'

const router = useRouter()
const loading = ref(true) // Change to false when we're not loading products
const products = ref([])
const searchQuery = ref('') //FOR v-model
const hotDeals = ref([])

// Categories data
const categories = [
  { name: 'Electronics', path: 'Electronics', icon: 'bi bi-laptop' },
  { name: 'Essentials', path: 'Essentials', icon: 'bi bi-house-heart' },
  { name: 'Clothes', path: 'Clothes', icon: 'bi bi-bag' },
  { name: 'Books', path: 'Books', icon: 'bi bi-book' },
  { name: 'Sports', path: 'Sports', icon: 'bi bi-trophy' },
  { name: 'Home & Garden', path: 'Home-Garden', icon: 'bi bi-flower1' }
]

const hotDealsGroups = computed(() => {
  const groups = []
  for (let i = 0; i < hotDeals.value.length; i += 3) {
    groups.push(hotDeals.value.slice(i, i + 3))
  }
  return groups
})

// Group products for carousel (3 products per slide)
// initially i was using when home page had all products too
// const productGroups = computed(() => {
//   const groups = []
//   for (let i = 0; i < products.value.length; i += 3) {
//     groups.push(products.value.slice(i, i + 3))
//   }
//   return groups
// })

const navigateToCategory = (category) => {
  if (searchQuery.value) {
    // If there's a search query, pass it to the category page
    router.push({
      path: `/category/${category}`,
      query: { search: searchQuery.value }
    })
  } else {
    router.push(`/category/${category}`)
  }
}

// //Watcher : Watches the 'SearchQuery' ref for changes
// watch(searchQuery,(newQuery)=>{
//   console.log(`User is searching for : ${newQuery}`)
//   // This is a great place for logic like analytics or auto-saving
// })

//Computed Property: Reactively filters products
// const filteredProducts = computed(() => {
//   if (!searchQuery.value) {
//     return products.value
//   }
//   const query = searchQuery.value.toLowerCase()
//   return products.value.filter(product => {
//     return product.name.toLowerCase().includes(query) ||
//       product.category.toLowerCase().includes(query)
//   })
// })
const filteredCategories = computed(() => {
  if (!searchQuery.value) {
    return categories
  }
  const query = searchQuery.value.toLowerCase()
  return categories.filter(category => {
    return category.name.toLowerCase().includes(query)
  })
})

// Event Handler for the custom 'addToCart' event
const handleAddToCart = (productId) => {
  const product = products.value.find(p => p.id === productId)
  if (product) {
    store.addToCart(product)
    alert(`${product.name} added to cart!`)
  }
}

// Lifecycle Hook: onMounted
// This code runs after the component has been mounted to the DOM.
// It's the perfect place to fetch initial data.
onMounted(async () => {
  loading.value = true
  try {
    // Fetch all products
    const productsResponse = await fetch('http://localhost:3000/products')
    if (!productsResponse.ok) {
      throw new Error('Failed to fetch products')
    }
    const allProducts = await productsResponse.json()
    products.value = allProducts

    // Filter hot deals
    hotDeals.value = allProducts.filter(product => product.hotDeal)
  } catch (error) {
    console.error('Failed to fetch products:', error)
  } finally {
    loading.value = false
  }
})

// Remove the products fetching since we're not showing them on homepage
// onMounted(() => {
//   loading.value = false
// })

</script>

<style scoped>
.hot-deals .carousel-control-prev,
.hot-deals .carousel-control-next {
  margin-top: 15%;
  width: 50px;
  height: 50px;
  background: rgba(159, 160, 152, 0.943);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.hot-deals .carousel-control-prev:hover,
.hot-deals .carousel-control-next:hover {
  background: rgba(82, 82, 82, 0.628);
  transform: scale(1.1);
}

.hot-deals .carousel-control-prev-icon,
.hot-deals .carousel-control-next-icon {
  background-size: 60% 60%;
  filter: invert(1);
}



.category-card {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(15, 15, 15, 0.1);
}

.category-icon {
  font-size: 2.5rem;
  color: #0d6efd;
}

.carousel-item {
  padding: 1rem;
}
</style>