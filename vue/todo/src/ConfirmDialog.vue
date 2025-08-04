<script setup>
import {defineEmits} from 'vue'
const emit = defineEmits(['confirm', 'cancel'])
</script>
<template>
  <div class="dialog-overlay">
    <div class="dialog-box">
      <slot name="message">Are you sure?</slot>
      <div class="dialog-actions">
        <button @click="emit('confirm')">Yes</button>
        <button @click="emit('cancel')">No</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-box {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

.dialog-actions {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.dialog-box button {
  padding: 0.5rem 1rem;
  border: none;
  background: #42b983;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.dialog-box button:hover {
  background: #369f6e;
}
</style>
