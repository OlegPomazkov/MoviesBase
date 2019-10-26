<template>
  <div id="app">
    <header-component/>

    <router-view/>
    
    <footer-component/>
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header'
import FooterComponent from '@/components/Footer'

export default {
  components: {
    HeaderComponent,
    FooterComponent
  },
}
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";

body {
  width: 100%;
  margin: 0;
}

#app {
  width: 100%;
  margin-top: 40px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background: $back_prim;
}
</style>
