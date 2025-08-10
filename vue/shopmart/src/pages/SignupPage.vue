<template>
    <base-template :loading="loading">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3 class="text-center">Sign Up</h3>
            </div>
            <div class="card-body">
              <form @submit.prevent="handleSignup">
                <div class="mb-3">
                  <label for="name" class="form-label">Full Name</label>
                  <input type="text" class="form-control" id="name" v-model="name" required>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email address</label>
                  <input type="email" class="form-control" id="email" v-model="email" required>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password" v-model="password" required>
                </div>
                <button type="submit" class="btn btn-primary w-100">Sign Up</button>
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

const loading = ref(false)
const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const handleSignup = async () => {
loading.value = true

// Add signup logic here
// setTimeout(() => {
//       loading.value = false
//   }, 1500)

// In a real app, you would POST to your /users endpoint(backend)
// For now, we'll just simulate it and redirect.
setTimeout(() => {
  loading.value = false
  alert('Signup successful! Please log in.')
  router.push('/login')
}, 1500)
}
</script>