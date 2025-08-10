<template>
    <base-template :loading="loading">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">Login</h3>
            </div>
            <div class="card-body">
              <form @submit.prevent="handleLogin">
                <div class="mb-3">
                  <label for="email" class="form-label">Email address</label>
                  <input type="email" class="form-control" id="email" v-model="email" required>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password" v-model="password" required>
                </div>
                <div v-if="error" class="alert alert-danger">{{ error }}</div>
                <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                {{ loading ? 'Logging in...' : 'Login' }}
              </button>
                <div class="text-center mt-3">
                  <p>Don't have an account? <router-link to="/signup">Sign Up</router-link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </base-template>
</template>
  
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseTemplate from '../components/BaseTemplate.vue'
import store from '../store.js'

const loading = ref(false)
const email = ref('')
const password = ref('')
const error = ref(null)
const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  error.value = null

  // login logic here(putting a fake)
  // setTimeout(() => {
  //     loading.value = false
  // }, 1500)

  try {
    // In a real app, you'd fetch from your /users endpoint
    const response = await fetch(`http://localhost:3000/users?email=${email.value}&password=${password.value}`)
    const users = await response.json()
    if (users.length > 0) {
      store.login(users[0]) // Log the user in
      router.push('/') // Redirect to home
    } else {
      error.value = 'Invalid email or password.'
    }
  } catch (e) {
    error.value = 'Failed to connect to the server.'
  } finally {
    loading.value = false
  }
}
</script>