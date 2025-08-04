<template>
  <div id="app">
    <CalculatorPro/>
  </div>
</template>

<script>
import CalculatorPro from './components/CalculatorProj.vue'

export default {
  name: 'App',
  components: {
    CalculatorPro
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: violet;
}
</style>
