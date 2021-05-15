<template>
  <div>
    <img
      :src="source"
      :width="w ? w : 'auto'"
      :height="h ? h : 'auto'"
    />
  </div>
</template>
<script>

  export default {
    data(){
      return{
        
      }
    },
    props:{
      source: String,
      w: String,
      h: String,
      palette: Boolean,
    },
  }
</script>
<style lang="scss">

</style>