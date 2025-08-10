<template>
    <div class="main-container">
      <!-- Navigation Bar -->
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          
          <!-- Hamburger Menu Button -->
          <div class="d-flex align-items-center">
            <button class="btn btn-dark d-flex align-items-center p-2" @click="toggleSidebar">
              <i class="bi bi-list fs-4"></i>
            </button>
            <router-link class="navbar-brand ms-2" to="/">ShopMart</router-link>
          </div>

          <!-- Cart Icon with Badge -->
          <div class="ms-auto d-flex align-items-center">
          <router-link to="/cart" class="text-white text-decoration-none position-relative me-3">
            <i class="bi bi-cart3 fs-5"></i>
            <span v-if="cartCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {{ cartCount }}
            </span>
          </router-link>
        </div>
      </div>
      </nav>

      <!-- Sidebar Menu-->
      <div class="sidebar-overlay" v-if="isSidebarOpen" @click="toggleSidebar"></div>
    <div class="sidebar" :class="{ 'show': isSidebarOpen }">
      <div class="sidebar-header">
        <h5 class="mb-0">Menu</h5>
        <button type="button" class="btn-close" @click="toggleSidebar"></button>
      </div>
      <div class="sidebar-body">
        <div class="list-group list-group-flush">
          <router-link to="/" class="list-group-item list-group-item-action" @click="toggleSidebar">
            <i class="bi bi-house-door me-2"></i> Home
          </router-link>
          <template v-if="!isAuthenticated">
            <router-link to="/login" class="list-group-item list-group-item-action" @click="toggleSidebar">
              <i class="bi bi-box-arrow-in-right me-2"></i> Login
            </router-link>
            <router-link to="/signup" class="list-group-item list-group-item-action" @click="toggleSidebar">
              <i class="bi bi-person-plus me-2"></i> Sign Up
            </router-link>
          </template>
          <template v-else>
            <router-link to="/profile" class="list-group-item list-group-item-action" @click="toggleSidebar">
              <i class="bi bi-person me-2"></i> Profile
            </router-link>
            <router-link to="/cart" class="list-group-item list-group-item-action" @click="toggleSidebar">
              <i class="bi bi-cart3 me-2"></i> Cart
            </router-link>
            <a href="#" class="list-group-item list-group-item-action" @click="handleLogout">
              <i class="bi bi-box-arrow-right me-2"></i> Logout
            </a>
          </template>
        </div>
      </div>
    </div>

      <!-- Main Content Area -->
      <div class="container mt-4">
        <div class="loading-overlay" v-if="props.loading">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <slot></slot>
      </div>
  
      <!-- Footer -->
      <footer class="bg-dark text-light mt-auto py-3">
        <div class="container text-center">
          <p>&copy; 2024 ShopMart. All rights reserved.</p>
        </div> 
      </footer>
    </div>
</template>
  
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import store, { cartCount } from '../store.js'

  const props = defineProps({
    loading: {
      type: Boolean,
      default: false
    }
  })

  const router = useRouter()
  const isSidebarOpen = ref(false)
  const isAuthenticated = computed(() => store.auth.isAuthenticated)
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }
  const handleLogout = () => {
    store.logout()
    toggleSidebar()
    router.push('/login')
  }
</script>
<style scoped>
  .main-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  /* Sidebar Styles */
  .sidebar {
    position: fixed;
    top: 0;
    left: -280px;
    height: 100vh;
    width: 280px;
    background-color: white;
    z-index: 1050;
    transition: left 0.3s ease;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }

  .sidebar.show {
    left: 0;
  }

  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1040;
  }

  .sidebar-header {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dee2e6;
  }

  .sidebar-body {
    padding: 1rem 0;
  }

  /* Cart Badge Styles */
  .badge {
    font-size: 0.6rem;
  }
</style>