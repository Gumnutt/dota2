<template>
  <div>
    <h3 v-if="loading">LOADING PAGE</h3>
    <h1>Dota 2</h1>  
    <div class="hero-grid">
      <div v-for="hero in heroes" :key="hero.name">
        <router-link :to="{ name: 'HeroDetail', params: {id: hero.id}}">
          <img :src="hero.images.portrait" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../firebaseDatabase'
export default {
  name: 'Home',
  data() {
    return {	
      heroes: [],
      loading: false,
    }
  },
  created: function() {
    db.collection('heroes').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let item = doc.data()
        item.id = doc.id
        this.heroes.push(item)
      })
    })
  }
}
</script>
<style lang="scss" scoped>
  .hero-grid{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
    grid-gap: 1rem;
    width: 750px;
    margin:0 auto;
    @media (min-width: 1000px){
      width: 950px;
    }
    @media(min-width: 1300px){
      width: 100%;
      max-width: 1200px;
    }
  }
  img{
    width: 100%;
  }
</style>