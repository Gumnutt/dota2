<template>
  <div>
    <img :src="source" :width="w ? w : 'auto'" :height="h ? h : 'auto'" />
  </div>
</template>
<script>
  export default {
    props:{
      source: String,
      w: String,
      h: String,
    },
  }
</script>
<style lang="scss">

</style>