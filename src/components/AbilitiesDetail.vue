<template>
  <div class="ability--container">
    <div class="ability--container-left">
      <video :key="current_ability.name" :poster="'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/abilities/'+hero_name+'/' + video_source + '.jpg'"  autoplay="" preload="auto" loop="" playsinline="" muted>
        <source type="video/webm" :src="'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/abilities/'+hero_name+'/' + video_source + '.webm'">
        <source type="video/mp4" :src="'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/abilities/'+hero_name+'/' + video_source + '.mp4'">
      </video>
      <div class="ability--icon-container">
        <div v-for="(ability, ind) in abilities" :key="ability.name_loc" class="ability">
          <Icon @click.native="current = ind" :class="{current:ind == current}" :key="ability.name" class="ability--icon" w="80" h="80" :source="'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/' + ability.name + '.png'"></Icon>
        </div>
      </div>
    </div>



    <div class="ability--container-right">
      <div class="ability--description">
        <Icon w="96" h="96" :source="'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/' + current_ability.name + '.png'"></Icon>
        <div class="description--text-contianer">
          <h3>{{ current_ability.name_loc }}</h3>
          <p v-html="ability_desc"></p>
        </div>
      </div>
      <div class="ability--stats">

      </div>
    </div>
  </div>
</template>

<script>
  import Icon from '../components/Icon'
  export default {
    components: { 
      Icon,
    },
    data(){
      return {
        current:0,
      }
    },
    props:{
      abilities: Array,
      ability_count: Number,
      hero_name: String
    },
    computed:{
      current_ability(){
        return this.abilities[this.current]
      },
      video_source(){
        const shard = this.current_ability.ability_is_granted_by_shard
        const scepter = this.current_ability.ability_is_granted_by_scepter
        const ability_name = this.current_ability.name
        switch(true) {
          case shard:
            return this.hero_name+'_aghanims_shard'
          case scepter:
            return this.hero_name+'_aghanims_scepter'
          case ability_name === 'invoker_sun_strike':
            return 'invoker_sunstrike'
          default:
            return this.current_ability.name
        }
      },
      ability_desc(){
        let description = this.current_ability.desc_loc
        const special_values = this.current_ability.special_values
        special_values.forEach(value => {
          description = description.replace(`%${value.name}%`, value.values_float.length > 0 ? value.values_float : value.values_int)
        })
        description = description.replace('%%', '%')
        return description
      }
    },
  }
</script>

<style scoped lang="scss">
  .ability--container{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    @media(min-width: 720px){
      flex-direction: row;
      flex-wrap: nowrap;
    }
  }
  .ability--container-left{
    width: 100%;
    @media(min-width: 900px){
      width: 55%;
      margin-right: 20px;
    }
    video{
      width: 100%;
      box-shadow: 3px 3px 8px black;
    }
  }
  .ability--container-right{
    width: calc(45% - 60px);
    min-height: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    color: white;
  }
  .ability--icon-container{
    width: 100%;
    margin-top: -15px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
    z-index: 3;
    .ability{
      .ability--icon{
        margin: 0px 4px;
        margin-bottom: 8px;
        cursor: pointer;
        transition-property: transform;
        transition-timing-function: ease-in-out;
        transition-duration: 0.1s;
        box-shadow: 0px 0px 10px black;
        position: relative;
        height: 80px;
        filter: saturate(0) brightness(0.6);
        &.current{
          filter: none;
        }
      }
    }
  }
  .ability--description{
    width: 100%;
    padding: 20px;
    background-color: #121212;
    display: flex;
    flex-direction: row;
    .description--text-contianer{
      margin-left: 1rem;
      h3{
        margin-top: 0;
      }
      p{
        white-space: pre-wrap;
      }
    }
  }
  .ability--stats{
    width: 100%;
    background: #000000;
    padding: 20px;
  }
</style>