<template>
  <div>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import router from './router/index.js'
import Header from './components/Header'

export default {
  name: 'App',
  router,
  components: {
    Header
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
    width: 100%;
    font-weight: 400;
    margin: 0;
    overflow-x: hidden;
  }
  *{
    box-sizing: border-box;
  }
</style>
