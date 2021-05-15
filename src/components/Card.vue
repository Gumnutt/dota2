<template>
  <router-link :to="{ name: linkedComponent, params: {id: link}}" class="card" :style="'background-color:'+background_color">
    <div>
      <Icon :source="source" :w="w" :h="h" ></Icon>
      <h2>{{ title }}</h2>
      <slot></slot>
    </div>
  </router-link>
</template>
<script>
import ColorThief from 'colorthief'
import Icon from '../components/Icon'
export default {
  components: { 
    Icon,
  },
  data(){
    return{
      background_color: null,
    }
  },
  props:{
    source: String,
    w: String,
    h: String,
    title: String,
    link: [Number, String],
    linkedComponent: String,
    colorthief: Boolean,
  },
  mounted() {
    if(this.colorthief){
      this.$nextTick(() => {
        let imageUrl = this.source;
        const image = new Image(360, 360)
        image.onload = () => {
          var colorThief = new ColorThief();          
          var color = colorThief.getColor(image);
          const sc = color
          const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
            const hex = x.toString(16)
            return hex.length === 1 ? '0' + hex : hex
          }).join('')
          const transformColor = (color, percent) => {
              const num = parseInt(color.replace("#",""), 16)
              const amt = Math.round(2.55 * percent)
              const R = (num >> 16) + amt
              const B = (num >> 8 & 0x00FF) + amt
              const G = (num & 0x0000FF) + amt
              return (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
          };
          this.background_color = rgbToHex(sc[0], sc[1], sc[2])
          return '#'+transformColor(this.background_color, 70)
        };
        let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
        image.crossOrigin = 'Anonymous';
        image.src = googleProxyURL + encodeURIComponent(imageUrl);
      })
    }
  },
}
</script>
<style lang="scss">
  .card{
    max-width: 20rem;
    width: 100%;
    background: #121212;
    margin-bottom:15px;
    padding:20px;
    border-radius: 0.2rem;
    color: white;
    display: block;
    img{
      filter: drop-shadow(0px 0px 10px black);
    }
  }
</style>