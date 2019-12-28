<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <IletiComponent/>
  </div>
</template>

<script>
import IletiComponent from './components/IletiComponent.vue'

export default {
  name: 'app',
  components: {
    IletiComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
