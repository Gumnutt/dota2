<template>
  <header>
    <Icon source="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/global/dota2_logo_horiz.png" h="50"></Icon>
    <Menu></Menu>
  </header>
</template>

<script>
import Icon from '../components/Icon'
import Menu from '../components/Menu'
export default {
  components:{
    Icon,
    Menu,
  }
}
</script>

<style lang="scss">
  header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 90%;
    width: 100%;
    margin: 0 auto;
    padding: 2rem 0;
    color: white;
    position: absolute;
      left: 0;
      right: 0;
    @media(min-width: 720px){
      
    }
    @media(min-width:1500px){
      max-width: 1500px;
    }
  }
</style>