<template>
  <div>
    <h3 v-if="loading">LOADING PAGE</h3>
    <h1 v-else>Dota 2 Teams</h1>  
    <div class="team-grid">
      <!-- {{ teams }} -->
      <Card v-for="team in teams" :key="team.id" :source="team.logo_url" w="150" :title="team.name" linkedComponent="TeamDetail" :link="team.team_id" :isActive="currentYear - 1" :colorthief="true">
        {{team.rating}}<br>
      </Card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Card from '../components/Card'
import { orderBy } from 'lodash'
export default {
  components: { 
    Card,
  },
  name: 'Teams',
  data() {
    return {	
      teams: null,
      loading: true,
      currentYear: new Date().getFullYear(),
    }
  },
  mounted(){
    axios
      .get('https://api.opendota.com/api/teams')
      .then(response => {
        this.teams = orderBy(response.data.filter(team => new Date(team.last_match_time*1000).getFullYear() >= this.currentYear - 1 && team.logo_url), 'rating', 'desc')
        this.loading = false
      })
  },
}
</script>
<style lang="scss">
  .team-grid{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 100%;
    max-width: 93.75rem;
    margin: 0 auto;
    // .card{
    //   max-width: 20rem;
    //   width: 100%;
    //   background: #121212;
    //   margin-bottom:15px;
    //   padding:20px;
    //   border-radius: 0.2rem;
    //   img{
    //     filter: drop-shadow(0px 0px 10px black);
    //   }
    // }
  }
</style>