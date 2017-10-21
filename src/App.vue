<template>
   <div id="app">
     <div style="position:absolute; z-index: -1; display: flex; align-items: center; justify-content: center; width: 100vw; height: 100vh; background: linear-gradient(to bottom, #fcf2d5 0%,#e3edfa 40%,#f0f9ff 100%)">
       <img src="loading.gif"/>
     </div>

     <div id="logo">
       <img src="ahw.svg" class="ahw-logo"/>
       
     </div>

     <div :style="blipStyle" :class="['marker', {'blip' : activateBlip ? true : false }]" ></div>
     <div class="model-container">
       <model-obj src="./gear.stl"></model-obj>
     </div>

     <div id="webgl" @mousedown="clickHandler(event)"></div>
     <!-- popup -->

     <div id="popup" style="display:none; visibility: hidden !important">
       <div id="closebtn">&times;</div>
       <div id="popupbar"></div>
       <div id="popupbody">
        <div id="popupcontent"></div>
      </div>
    </div>
  </div>

</template>

<script>
import HelloWorld from './components/HelloWorld'
import { ModelObj } from 'vue-3d-model'
// require('../Qgis2threejs.js')
// require('../OrbitControls.js');
// require('../index2.js')

var superpoint = superpoint

export default {
  name: 'app',
  components: {
    ModelObj
  },
  data() {
    return {
      activateBlip: false,
      blipStyle: {},
      superpoint: superpoint
    }
  },
  mounted(){
      var option = Q3D.Options; 
      var container = document.getElementById("webgl");
      var app = Q3D.application;
      app.init(container);
    // load the project
    app.loadProject(project);
    // document.getElementById("infobtn").onclick = app.showInfo.bind(app);
    // if ("hidebutton" in app.urlParams) document.getElementById("infobtn").style.display = "none";
    app.addEventListeners();
    app.start();
  },
  computed:{
    
  },
  methods:{
    clickHandler(event){
      // console.log(event)
      if((window.superpoint.x > 15448612 && window.superpoint.x < 15456288) && (window.superpoint.y < -4150720 && window.superpoint.y > -4154972) ){
          this.blipStyle = {'top' : event.clientY+'px', 'left' : event.clientX+'px'}
          this.activateBlip = true
          var self = this;
          this.timer = setTimeout(function() {
            self.activateBlip = false
            clearTimeout(this.timer)
          }.bind(this), 1000);
          
      } else{
          this.activateBlip = false
      }
      
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  overflow: hidden;
}

#webgl {
  /* sky-like */
  background: linear-gradient(to bottom, #fcf2d5 0%,#e3edfa 40%,#f0f9ff 100%)
}


/* label */

.label {
  padding: 2px;
  position: absolute;
  color: #34262b;
  pointer-events: none;
  cursor: default;
  font-family: "Knockout30" !important;
  font-size: 18px;
  opacity: 0.75;
}

.winery{
  opacity: 1;
  color:  #65142C !important;
  font-size: 20px;
  max-width: 200px;
  float: right;
}

.num{
   background-image: url(./assets/triangle.svg);
    background-size:100% 100%;
    -o-background-size: 100% 100%;
    -webkit-background-size: 100% 100%;
    background-size:cover;
  opacity: 1;
  color: white !important;
  font-size: 18px;
  text-align: center;
  position: relative;
  display: inline-block;
  width: 35px;
  left:0px;
  height:30px;
  float:left;

}


.city{
  color: black !important;
  font-size: 40px;
  background: transparent;
}



.marker{
  position: absolute;
  z-index: 9999;
  width: 50px;
  height: 50px;
  -webkit-transform: scale(0);
  background-color: white;
  border-radius: 50%;
  pointer-events: none;
  -webkit-user-select: none;  /* Chrome all / Safari all */  
  transform-origin: center center;
}

.blip{
    pointer-events: none;
    user-select: none; 
    position: absolute;
    left: 50%;
    top:50%;
    background-color: white;
    opacity: 0;
    transform: scale(20);
    transition: all 1040ms cubic-bezier(0,.53,.31,1);
    transform-origin: center center;
    animation-timing-function: cubic-bezier(.56,.01,0,.99);

  }



.ahw-logo{
  width: 10%;
  min-width: 100px;
  position: absolute;
  right: 5%;
  bottom: 5%;
  
}

.noselect{
    -webkit-user-select: none; /* Safari */ 
}


@font-face {
    font-family: 'Knockout30';
    src: url('./assets/Knockout30.eot');
    src: url('./assets/Knockout30.eot') format('embedded-opentype'),
         url('./assets/Knockout30.woff2') format('woff2'),
         url('./assets/Knockout30.woff') format('woff'),
         url('./assets/Knockout30.ttf') format('truetype'),
         url('./assets/Knockout30.svg#Knockout30') format('svg');
}

</style>
