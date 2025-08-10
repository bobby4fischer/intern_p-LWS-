<template>
  <base-template>
    <div v-if="store.auth.user" class="profile-container">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h1 class="mb-0">Profile</h1>
        </div>
        <div class="card-body">
          <div class="profile-info">
            <div class="profile-avatar">
              <i class="bi bi-person-circle display-1"></i>
            </div>
            <div class="profile-details">
              <div class="info-group">
                <label>Name:</label>
                <p>{{ store.auth.user.name }}</p>
              </div>
              <div class="info-group">
                <label>Email:</label>
                <p>{{ store.auth.user.email }}</p>
              </div>
              <div class="info-group">
                <label>Member Since:</label>
                <p>{{ formatDate(store.auth.user.createdAt || new Date()) }}</p>
              </div>
            </div>
          </div>
          <div class="profile-actions mt-4">
            <button class="btn btn-secondary me-2">
              <i class="bi bi-pencil me-2"></i>Edit Profile
            </button>
            <button class="btn btn-danger" @click="handleLogout">
              <i class="bi bi-box-arrow-right me-2"></i>Logout
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <h2>Please login to view your profile</h2>
      <router-link to="/login" class="btn btn-primary mt-3">Login</router-link>
    </div>
  </base-template>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BaseTemplate from '../components/BaseTemplate.vue'
import store from '../store'

const router = useRouter()

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const handleLogout = () => {
  store.logout()
  router.push('/login')
}
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
}

.profile-info {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
}

.profile-avatar {
  text-align: center;
  color: #6c757d;
}

.profile-details {
  flex: 1;
}

.info-group {
  margin-bottom: 1rem;
}

.info-group label {
  font-weight: bold;
  color: #6c757d;
  margin-bottom: 0.25rem;
  display: block;
}

.info-group p {
  font-size: 1.1rem;
  margin: 0;
}

/* @media (max-width: 576px) {
  .profile-info {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .profile-avatar {
    margin-bottom: 1rem;
  }
} */
</style>