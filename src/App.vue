<template>
  <div id="main">
    <Navbar />
    <Runner />
    <Footer />
  </div>
</template>

<script>
import Runner from './components/Runner.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Runner,
    Navbar,
    Footer
  }
}
</script>
