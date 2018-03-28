<template>
  <mapbox :id="container" :class="container" :access-token="token" 
    :map-options='{
      style: mapStyle,
      center: this.LngLat,
      zoom: 12,
      container: this.container
    }'
    :navControl='{show: false}'
    @map-init='mapInit'
    @map-click='mapClick'
    @map-zoom='mapZoom'
    @map-move='mapMove      '
    @map-moveend='mapMoveend'
    @map-movestart='mapMovestart'
    @map-load='mapLoad'
    @map-styledataloading='mapStyleloading'
    @map-touchend='mapTouchend'
    @map-touchstart='mapTouchstart'
    @map-dblclick='mapDblclick'
    >
  </mapbox>
</template>

<script>
import Vue from 'vue'
import Mapbox from 'mapbox-gl-vue';
import store from '../store.js' 
import Vuex from 'vuex'
Vue.use(Vuex)

export default {
  name: 'Mappy',
  props: ['LngLat', 'container', 'mapStyle', 'token'],
  components:{
    Mapbox
  },
  data () {
    return {
      center: null
    }
  },
  watch: {
    features: function(val){
      if(val && !this.areFeaturesLoaded){
        this.addMarkers(val)
      }
    } 
  },
  computed:{
    ...Vuex.mapGetters(['_map']),

  },
  methods: {

    ...Vuex.mapMutations(['setMap', 'setMapbox']),
    
    mapInit(map){
      // save map to component's data
    

      //map.transform.altitude = 1.5 
      //https://github.com/mapbox/mapbox-gl-js/issues/1137


    },
    mapLoad(map){
      // console.log('loaded')
      this.$emit('loaded', map)
      // console.log(map)
      map.setPaintProperty('lenswood2-5r0h4n', 'fill-color', 'rgba(255,255,255,0)');
      this.setMap(map)
      // map.addLayer({
      //     'id': '3d-buildings',
      //     'source': 'composite',
      //     'source-layer': 'building',
      //     'filter': ['==', 'extrude', 'true'],
      //     'type': 'fill-extrusion',
      //     'minzoom': 15,
      //     'paint': {
      //         'fill-extrusion-color': '#aaa',

      //         // use an 'interpolate' expression to add a smooth transition effect to the
      //         // buildings as the user zooms in
      //         'fill-extrusion-height': [
      //             "interpolate", ["linear"], ["zoom"],
      //             15, 0,
      //             15.05, ["get", "height"]
      //         ],
      //         'fill-extrusion-base': [
      //             "interpolate", ["linear"], ["zoom"],
      //             15, 0,
      //             15.05, ["get", "min_height"]
      //         ],
      //         'fill-extrusion-opacity': .6
      //     }
      // }, 'labelLayerId');


      this.center = this._map.getCenter()
      console.log('set mapbox origin to ', this._map.project(this.center))
      this.setMapbox({cameraOrigin: this._map.project(this.center) })
         

      
    },
    mapClick(){

    },
    mapZoom(){
      
    },
    mapMove(){
      // console.log(this.center)
      this.$emit('cameraPosition', this._map.project(this.center) )

    },
    mapMoveend(){

    },
    mapMovestart(){

    },
    mapStyleloading(){

    },
    mapTouchend(){

    },
    mapTouchstart(){

    },
    mapDblclick(){

    }
  }
}
</script>

<style scoped>

/*Map style should have same name as container*/
#map{
  position: absolute;
  left:0;
  top: 0;
  width: 100vw;
  height: 100vh;
  /*z-index: 0 !important;*/
}
</style>
