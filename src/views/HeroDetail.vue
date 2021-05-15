<template>
  <div>
    <h3 v-if="!hero">LOADING PAGE</h3>
    <div v-else>
      <div class="hero--starter">
        <video class="hero--video" :poster="hero.images.poster" autoplay="" preload="auto" loop="" playsinline="" muted>
          <source type="video/webm" :src="hero.images.video">
          <img :src="hero.images.poster">
        </video>
        <div class="hero--summary">
          <div class="hero--primary-info">
            <Icon :source="image[short_attr]" w="30px" h="30px"></Icon>
            <div class="hero--primary-stat"><span>{{primary_attr}}</span></div>
            <h1 class="hero--name">{{ hero.name }}</h1>
            <h3 class="hero--one-liner">{{ hero.hero_desc }}</h3>
            <p class="hero--short-desc" v-html="hero.bio_short"></p>
            
            <div class="hero--attk-type">
              <p class="hero--attk-type-label">Attack type</p>
              <p class="hero--attk-type-value">{{ attk_type }}</p>
              <Abilities :abilities="hero.abilities" :ability_count="hero.abilities.length" :hero_name="hero.machine_name.replace('npc_dota_hero_','')"></Abilities>
            </div>
          </div>
        </div>
      </div>
      <div class="hero--info">
        <div class="hero--attributes">
          <div class="hero--portrait">
            <img :src="hero.images.portrait"/>
            <div class="hero--health">
              <span class="health--base">{{ hero.attributes.health }}</span>
              <span class="health--regen">+ {{ Math.round(hero.attributes.health_regen * 10) / 10 }}</span>
            </div>

            <div class="hero--mana">
              <span class="mana--base">{{ hero.attributes.mana }}</span>
              <span class="mana--regen">+ {{ Math.round(hero.attributes.mana_regen * 10) / 10 }}</span>
            </div>
          </div>

          <div class="hero--attributes-container">
            <div class="attribute--single">
              <Icon :source="image.str" w="30px" h="30px"></Icon>
              <span class="base-attribute">{{ hero.attributes.str }}</span>
              <span class="gain-attribute">+ {{ Math.round(hero.attributes.str_gain* 10) / 10 }}</span>
            </div>
            <div class="attribute--single">
              <Icon :source="image.agi" w="30px" h="30px"></Icon>
              <span class="base-attribute">{{ hero.attributes.agi }}</span>
              <span class="gain-attribute">+ {{ Math.round(hero.attributes.agi_gain* 10) / 10 }}</span>
            </div>
            <div class="attribute--single">
              <Icon :source="image.int" w="30px" h="30px"></Icon>
              <span class="base-attribute">{{ hero.attributes.int }}</span>
              <span class="gain-attribute">+ {{ Math.round(hero.attributes.int_gain* 10) / 10 }}</span>
            </div>
          </div>
        </div>

        <div class="hero--roles">
          <Progress v-for="(value, name) in hero.roles" :key="name" :label="name" :value="value"></Progress>
        </div>

        <div class="hero--stats">
          <div class="stats--attack">
            <div class="stat">
              <Icon :source="image.dmg" w="24px" h="24px"></Icon>
              {{ hero.damage.min }}-{{ hero.damage.max }}
            </div>
            <div class="stat">
              <Icon :source="image.atk_time" w="24px" h="24px"></Icon>
              {{ Math.round(hero.stats.attack.rate* 10) / 10 }}
            </div>
            <div class="stat" v-if="hero.stats.attack.range > 0">
              <Icon :source="image.range" w="24px" h="24px"></Icon>
              {{ hero.stats.attack.range }}
            </div>
            <div class="stat">
              <Icon :source="image.projectile_speed" w="24px" h="24px"></Icon>
              {{ hero.stats.attack.projectile_speed }}
            </div>
          </div>
          <div class="stats--defense">
            <div class="stat">
              <Icon :source="image.armor" w="24px" h="24px"></Icon>
              {{ Math.round(hero.stats.defense.armor* 10) / 10 }}
            </div>
            <div class="stat">
              <Icon :source="image.magic_resist" w="24px" h="24px"></Icon>
              {{ Math.round(hero.stats.defense.magic_resistance* 10) / 10 }}
            </div>
          </div>
          <div class="stats--mobilty">
            <div class="stat">
              <Icon :source="image.move_speed" w="24px" h="24px"></Icon>
              {{ hero.stats.mobility.movement_speed }}
            </div>
            <div class="stat">
              <Icon :source="image.turn_rate" w="24px" h="24px"></Icon>
              {{ Math.round(hero.stats.mobility.turn_rate* 10) / 10 }}
            </div>
            <div class="stat">
              <Icon :source="image.vision" w="24px" h="24px"></Icon>
              {{ hero.stats.mobility.sight_range.day }}/{{ hero.stats.mobility.sight_range.night }}
            </div>
          </div>
        </div>
      </div>

      <div class="abilities--container">
        <AbilitiesDetail :abilities="hero.abilities" :ability_count="hero.abilities.length" :hero_name="hero.machine_name.replace('npc_dota_hero_','')"></AbilitiesDetail>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../firebaseDatabase'

import Abilities from '../components/Abilities'
import AbilitiesDetail from '../components/AbilitiesDetail'
import Progress from '../components/Progress'
import Icon from '../components/Icon'

export default {
  components: { 
    Abilities,
    AbilitiesDetail,
    Progress,
    Icon,
  },
  name: 'HeroDetail',
  data() {
    return {	
      hero: null,
      image: null,
    }
  },
  created() {
    db.collection('heroes')
    .doc(this.$route.params.id)
    .get()
    .then(snapshot => {
      this.hero = snapshot.data()
      this.loading = false
    })

    db.collection('images')
    .doc('icons')
    .get()
    .then(img => {
      this.image = img.data()
    })
  },
  computed:{
    primary_attr(){return["Strength", "Agility", "Intelligence"][this.hero.attributes.primary_attr]??""},

    short_attr(){return["str","agi","int"][this.hero.attributes.primary_attr]??""},
      
    attk_type(){return["Melee", "Ranged"][this.hero.attack_type]??""},
  }
}
</script>
<style lang="scss">
  body{
    background: #191e24;
  }
  .hero--starter{
    display: flex;
    align-items: center;
    height: 85vh;
    min-height: 600px;
    padding: 40px 100px 0px 140px;
    overflow: hidden;
    position: relative;
    background-image: linear-gradient(0deg, #101415, transparent);
  }
  .hero--summary{
    max-width: 62ch;
    width: 100%;
    color: white;
    position: relative;
    display: flex;
    align-items: center;
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
    &:before, &:after{
      content: '';
      position: absolute;
      top: 0;
      height: 100%;
      width: 100vw;
      display: block;
    }
    &:before{
      left: -100vw;
    }
    &:after{
      right: -100vw;
    }
    @media(min-width: 25em){
      padding-right:10rem
    }
  }
  .hero--video{
    min-height: 600px;
    position: absolute;
    right: 0;
    z-index: -1;
  }
  .hero--primary-info{
    .hero--name{
      margin-top: 0;
      font-weight: 700;
      text-transform: uppercase;
    }
  }
  .hero--info{
    margin-top: 2rem;
    display: flex;
    justify-content: space-evenly;
  }
  .hero--attributes{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 30%;
    .hero--portrait{
      width: 150px;
      img{
        width:100%;
      }
      .hero--health{
        width: 100%;
        height: 22px;
        background: linear-gradient(to right, #286323, #7AF03C);
        display: flex;
        align-items: center;
        justify-content: center;
        .health--base{
          font-size: 0.9rem;
        }
        .health--regen{
          font-size: 0.6rem;
          margin-left: 0.5rem;
        }
      }
      .hero--mana{
        width: 100%;
        height: 22px;
        background: linear-gradient(to right, #1056DB, #73F5FE);
        display: flex;
        align-items: center;
        justify-content: center;
        .mana--base{
          font-size: 0.9rem;
        }
        .mana--regen{
          font-size: 0.6rem;
          margin-left: 0.5rem;
        }
      }
    }
    .attribute--single{
      display: flex;
      color: white;
      align-items: center;
      margin: 0.25rem 0;
      .base-attribute{
        font-size:1.25rem;
        font-weight: 600;
        margin-left:0.75rem;
      }
      .gain-attribute{
        font-size: 0.9rem;
        color: #999999;
        text-shadow: 1px 1px 2px black;
        margin-left: 8px;
      }
    }
  }
  .hero--roles{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 400px;
    padding: 0px 20px;
  }
  .hero--stats{
    display: flex;
    justify-content: space-evenly;
    width: 30%;
    .stat{
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 0.375rem;
      font-size: 1rem;
      color: white;
      img{
        margin-right: 0.5rem;
      }
    }
  }

  .abilities--container{
    width: 100%;
    max-width: 1500px;
    margin: 0 auto;
  }
</style>