<template>
  <div class="abilities--list">
    <p class="abilities--title">Abilities</p>
    <div class="abilities--container">
      <div v-for="ability in basicAbilities" :key="ability.name_loc" :v-if="!ability.ability_is_granted_by_shard" class="ability">
          <img class="ability--icon" :src="'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/' + ability.name + '.png'"/>
          <div class="ability--tooltip">
            <div class="tooltip--body">
              <video class="tooltip--video" :poster="'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/abilities/'+hero_name+'/' + ability.name + '.jpg'" autoplay="" preload="auto" loop="" playsinline="" muted>
                <source type="video/webm" :src="'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/abilities/'+hero_name+'/' + ability.name + '.webm'">
                <source type="video/mp4" :src="'https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/abilities/'+hero_name+'/' + ability.name + '.mp4'">
              </video>
              <div class="tooltip--text">
                <h3 class="tooltip--title">{{ ability.name_loc }}</h3>
                <p class="tooltip--title">{{ ability.desc_loc }}</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        hero_abilities: this.abilities
      }
    },
    props:{
      abilities: Array,
      ability_count: Number,
      hero_name: String
    },
    computed:{
      basicAbilities() {
        return this.hero_abilities.filter(hero_ability => !hero_ability.ability_is_granted_by_shard && !hero_ability.ability_is_granted_by_scepter)
      }
    }
  }
</script>

<style scoped lang="scss">
  .abilities--list{
    width: fit-content;
  }
  .abilities--title{
    font-size: 1.125rem;
    text-transform: uppercase;
    text-align: center;
    font-weight: 700;
  }
  .abilities--container{
    display: flex;
    flex-wrap: wrap;
    @media(min-width: 720px){
      flex-wrap: nowrap;
    }
    .ability{
      margin: 0 0.5rem;
      position: relative;
      &:first-of-type{
        margin-left: 0;
      }
      &:last-of-type{
        margin-right: 0;
      }
      &:hover{
        transform: scale(1.1);
        .ability--tooltip{
          display: block;
        }
      }
    }
    .ability--icon{
      width: 5rem;
    }
  }
  .ability--tooltip{
    width: 18.75rem;
    position: absolute;
    left: 50%;
    transform: translateY(-100%) translateY(-5.5rem) translateX(-50%);
    display: none;
    filter: drop-shadow(2px 2px 8px black);
    .tooltip--body{
      clip-path: polygon(0px 0px, 0px calc( 100% - 20px), calc( 50% - 20px) calc( 100% - 20px), 50% 100%, calc( 50% + 20px) calc( 100% - 20px), 100% calc( 100% - 20px), 100% 0px);
    }
    video{
      width: 100%;
    }
    .tooltip--text{
      background: linear-gradient(150deg, #68727C, #14171A);
      padding: 10px 15px;
      padding-bottom: 35px;
      .tooltip--title{
        margin: 0;
      }
    }
  }
</style>