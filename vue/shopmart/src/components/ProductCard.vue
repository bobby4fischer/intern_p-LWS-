<template>
    <div class="card h-100">
      <!-- Attribute Binding for src and alt -->
      <img :src="product.image" class="card-img-top product-image" :alt="product.name">
       <div class="card-body d-flex flex-column">
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-text">${{ product.price }}</p>
        <div class="mt-auto">
          <router-link :to="'/product/' + product.id" class="btn btn-secondary me-2">
            Details
          </router-link>
          <!-- Event Handling: @click -->
          <button @click="onAddToCart" class="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Props: Defining the data this component expects from its parent
  const props = defineProps({
    product: {
      type: Object,
      required: true
    }
  })
  
  // Emits: Defining the custom events this component can send to its parent
  const emit = defineEmits(['addToCart'])
  
  // Event Handler Method
  function onAddToCart() {
    // Emitting the 'addToCart' event with the product's ID as the payload
    emit('addToCart', props.product.id)
  }
</script>

<style scoped>
.product-image {
  height: 225px;
  width: 100%;
  object-fit: contain; 
  background: #f8f9fa; 
  padding: 10px;
}
</style>