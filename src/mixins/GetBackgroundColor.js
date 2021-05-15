import ColorThief from 'colorthief'
import Color from 'color'
import consola from "consola"
const getBackgroundColor = {
  methods:{
    getImageColor(){
      this.$nextTick(() => {
        let imageUrl = this.teamLogo;
        const image = new Image(360, 360)
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
          return this.background_color = Color(this.background_color).darken(0.5).hex()
        };
        let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
        image.crossOrigin = 'Anonymous';
        image.src = googleProxyURL + encodeURIComponent(imageUrl);
        this.loading = false
        consola.success('App is loaded')
      })
    }
  }
}
export default getBackgroundColor