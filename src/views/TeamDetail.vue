<template>
  <h3 v-if="loading">loading team data</h3>
  <div v-else class="page page--team-detail" :class="colorIsDark ? 'page-dark':'page-light'" :style="`background-color:${background_color}`">
    <!-- <pre style="color: white">{{ team }}</pre> -->
    <h1 style="color: white">{{ team.name }}</h1>
    <Icon :source="team.logo_url"></Icon>
    <div class="player-grid">
      <template v-for="player in players" :value="player">
        <Card v-for="player in computedPlayerData(player.name)" :key="player.account_id" :title="player.profile.name" :source="player.profile.avatarfull" linkedComponent="Home" link="/">
        </Card>
      </template>
    </div>
    <div v-for="hero in heroData" :key="hero.id">
      <h3 style="color: white">{{hero.localized_name}}</h3>
      <Icon :source="imgBaseUrl+hero.img"></Icon>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import ColorThief from 'colorthief'
import Color from 'color'
import consola from "consola"
import Icon from '../components/Icon'
import Card from '../components/Card'
export default {
  name: 'TeamDetail',
  components:{
    Icon,
    Card,
  },
  data() {
    return {	
      team: [],
      players: [],
      teamHeroes: [],
      heroData: [],
      playerData: [],
      playerHeroData: [],
      teamId: this.$route.params.id,
      loading: true,
      imgBaseUrl: 'https://cdn.cloudflare.steamstatic.com/',
      teamLogo: null,
      background_color: null,
      colorIsDark: null,
    }
  },
  async mounted(){
      this.getTeam()
      await this.getPlayers()
      await this.getTeamHeroes()
      await this.getHeroData()
      this.getPlayerData()
      this.getImageColor()
      this.teamLogo = this.team.logo_url
  },
  computed:{
    computedPlayerData(){
      return playername => this.playerData.filter(r => r.profile.name === playername)
    }
    
  },
  methods:{
    async getTeam(){
      const response = await axios.get(`https://api.opendota.com/api/teams/${this.teamId}`)
      this.team = response.data
    },
    async getPlayers(){
      const response = await axios.get(`https://api.opendota.com/api/teams/${this.teamId}/players`)
      this.players = response.data.filter(r => r.is_current_team_member)
    },
    async getTeamHeroes(){
      const response = await axios.get(`https://api.opendota.com/api/teams/${this.teamId}/heroes`)
      this.teamHeroes = response.data.slice(0, 10)
    },
    getPlayerData(){
      this.players.forEach(player => {
        if(player.name){
          const playerID = player.account_id
          axios
            .get(`https://api.opendota.com/api/players/${playerID}`)
            .then(r => {
              this.playerData.push(r.data)
            })
        }
      })
    },
    async getHeroData(){
      const response = await axios.get(`https://api.opendota.com/api/heroStats`)
      this.teamHeroes.forEach(hero => {
        const heroID = hero.hero_id
        this.heroData.push(response.data.filter(r => r.id === heroID)[0])
      })
    },
    getImageColor(){
      this.$nextTick(() => {
        let imageUrl = this.teamLogo;
        let image = new Image(360, 360)
        //let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
        image.crossOrigin = 'Anonymous';
        image.src = 'http://alloworigin.com/get?url='+imageUrl;
        consola.info(image)
        image.onload = () => {
          var colorThief = new ColorThief();          
          var color = colorThief.getColor(image);
          const sc = color
          const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
            const hex = x.toString(16)
            return hex.length === 1 ? '0' + hex : hex
          }).join('')
          this.background_color = rgbToHex(sc[0], sc[1], sc[2])
          consola.info(this.background_color)
          consola.info(Color(this.background_color).darken(0.9).hex())
          return this.background_color = Color(this.background_color).darken(0.5).hex(), this.colorIsDark = Color(this.background_color).isDark()
        };
        
        this.loading = false
        consola.success('App is loaded')
      })
    }
  }
}
</script>
<style lang="scss">
  .page{
    padding: 0 40px;
  }
  h1{
    margin-top: 0;
    font-weight: 700;
    text-transform: uppercase;
  }
  .player-grid{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 1rem;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 100%;
    max-width: 93.75rem;
    margin: 0 auto;
  }
</style>