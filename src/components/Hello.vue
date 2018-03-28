<template>
  <div>
  <mappy container="map" :LngLat="[138.8190914,-34.9201098]" mapStyle="mapbox://styles/edanweis/cjdwmisu978ll2snqvwibzhk5" @cameraPosition="cameraPosition" @loaded="loaded" :token="token"></mappy> 
  <sketchfab style="" :camera="camera"   urlid="6d24cec1439841ae8b8231ae973995ae"
  autospin='0'
  autostart='1'
  preload='1'
  ui_controls='0'
  ui_infos='0'
  ui_related='0'
  transparent='1'
  ></sketchfab>
  <div v-if="mapbox.cameraOrigin" class="origin" :style="{'left': mapbox.cameraOrigin.x +'px', 'top': mapbox.cameraOrigin.y+'px' }"></div>
</div>
</template>

<script>
import Vue from 'vue'
import Mappy from './Mappy'
import Sketchfab from './Sketchfab'
const credentials = require('../credentials.js')
import Vuex from 'vuex'
Vue.use(Vuex)

export default {
  name: 'hello',
  components:{
    Mappy,
    Sketchfab
  },
  data () {
    return {
      token: credentials.mapbox.token,
      camera: null
    }
  },
  created() {
    var self = this
      this.$nextTick(function() {
        self.setWindow(window.innerHeight, window.innerWidth)
        console.log(window)
        window.addEventListener('resize', function(e) {
          console.log('resize', e)
          self.setWindow(window.innerHeight, window.innerWidth)
          self.setMapbox({cameraOrigin: self._map.project(self._map.getCenter()) })
        })
      })
  },
  computed: {
    ...Vuex.mapGetters(['_map', 'mapbox', 'sketchfab']),
  },
  methods:{
    ...Vuex.mapMutations(['setMap', 'setWindow', 'setMapbox']), 
    ...Vuex.mapActions([]), 

    cameraPosition(position){
      // console.log(position)
      this.camera = {
        'position': position,
        // 'rotation': rotation
      }
    },

    loaded: function(map){
    this.setMap(map)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.origin{
  position: absolute;
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: blue;
}
</style>
