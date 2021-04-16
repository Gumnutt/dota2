<template>
  <router-view></router-view>
</template>

<script>
import router from './router/index.js'

export default {
  name: 'App',
  router,
  components: {
    
  }
}
</script>

<style>
@font-face {
    font-family: "Reaver";
    src: url(./fonts/Reaver-Regular.woff) format("woff");
    font-style: normal;
    font-weight: 400;
  }
  @font-face {
    font-family: "Reaver";
    src: url(./fonts/Reaver-Bold.woff) format("woff");
    font-style: normal;
    font-weight: 700;
  }
  body {
    font-family: Reaver, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    margin: 0;
  }
</style>
