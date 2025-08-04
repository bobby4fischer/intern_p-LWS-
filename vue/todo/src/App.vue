<script setup>
import { ref, computed } from 'vue'
import ConfirmDialog from './ConfirmDialog.vue'

let id1 = 0
const newTodo = ref('')
const hideCompleted = ref(false)
const todos = ref([
  { id: id1++, text: 'Learn HTML', done: false },
])

const filteredTodos = computed(() => {
  return hideCompleted.value
    ? todos.value.filter((t) => !t.done)
    : todos.value
})

const showDialog = ref(false)
const todoToDelete = ref(null)

function addTodo()
{
  todos.value.push({id1 : id1++ , text : newTodo.value, done : false })
  newTodo.value=''
}
function confirmDelete(todo) {
  todoToDelete.value = todo
  showDialog.value = true
}

function deleteTodoConfirmed() {
  todos.value = todos.value.filter(t => t !== todoToDelete.value)
  showDialog.value = false
}
</script>

<template>
  <form @submit.prevent="addTodo">
    <input v-model="newTodo" required placeholder="new todo" />
    <button>Add Todo</button>
  </form>

  <ul>
    <li v-for="(todo, index) in filteredTodos" :key="todo.id">
      <input type="checkbox" v-model="todo.done" />
      {{ index + 1 }}:
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <button @click="confirmDelete(todo)">X</button>
    </li>
  </ul>

  <button class="toggle-btn" @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? 'Show all' : 'Hide completed' }}
  </button>

  <!-- confirmation dialog component -->
  <ConfirmDialog v-if="showDialog" @confirm="deleteTodoConfirmed" @cancel="showDialog = false">
    <template #message>
      Are you sure you want to delete <strong>{{ todoToDelete ?.text }}</strong>?
    </template>
  </ConfirmDialog>
</template>


<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.4rem 0.6rem;
  background-color: #f9f9f9;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

li:hover {
  background-color: #eef2f3;
}

.done {
  text-decoration: line-through;
  color: #888;
  transition: color 0.3s, text-decoration 0.3s;
}

form {
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
}


button {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #369f6e;
}

.toggle-btn {
  margin-top: 1rem;
  background-color: #35495e;
}

.toggle-btn:hover {
  background-color: #2c3e50;
}
</style>
