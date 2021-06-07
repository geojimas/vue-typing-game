<template>
  <div id="main">
    <Navbar />
    <Runner />
  </div>
</template>

<script>
import Runner from './components/Runner.vue'
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Runner,
    Navbar
  }
}
</script>
