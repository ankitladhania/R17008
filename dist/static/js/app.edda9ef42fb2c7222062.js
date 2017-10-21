webpackJsonp([1],[,,,,,,,function(e,t,i){function a(e){i(14)}var n=i(5)(i(8),i(30),a,null,null);e.exports=n.exports},function(e,t,i){"use strict";function a(e,t,i,a,n){return a+(n-a)*(e-t)/(i-t)}Object.defineProperty(t,"__esModule",{value:!0});var n=i(1),r=i(6),s=i.n(r),o=i(24),l=i.n(o),c=i(28),p=i.n(c);n.a.use(s.a);var d=(i(2),i(21)),h=i(23),m=i(11),u=m.db.ref("data");t.default={name:"app",components:{Mapbox:l.a,Sheet:p.a},data:function(){return{fake:!1,dataReady:!1,mapReady:!1,data:[],map:null,sparklingTrailLayer:null,sparklingTrail:!1,currentSelected:[],sparklingSwitchVisible:!1,randomNum:2,moveCircleActive:!0,circle:{x:0,y:0,o:0,r:50,off:!0}}},watch:{dataReady:function(e){console.log("dataReady?",e),e&&this.mapReady&&this.loadData()},mapReady:function(e){console.log("mapReady?",e),this.dataReady&&e&&this.loadData()}},mounted:function(){var e=this;console.log("Fetching Firebase data..."),u.once("value").then(function(t){console.log(String(t.val().length),"wineries successfully downloaded from firebase");for(var i=[],a=t.val().length-1;a>=0;a--)e.data.push(t.val()[a]),i.push(t.val()[a]);return i}).then(function(t){e.dataReady=!0})},methods:{resizedSheet:function(){window.dispatchEvent(new Event("resize"))},toggleSparklingSwitch:function(e){for(var t=[],i=this.data.length-1;i>=0;i--)this.data[i].properties.trails.includes("sparkling")&&t.push(this.data[i].properties.id);t.unshift("in","id"),this.sparklingSwitchVisible=!0,this.circle.o=0,this.sparklingTrail?(this.map.setFilter("wineries",t),this.map.setFilter("triangles",t),this.map.setFilter("triangles-appointment",t)):(this.map.setFilter("wineries",null),this.map.setFilter("triangles",null),this.map.setFilter("triangles-appointment",null))},getRandomNum:function(){var e=Math.floor(134*Math.random()+7);return this.randomNum=e,e},mapResized:function(){},mapClicked:function(e,t){var i=e.queryRenderedFeatures(t.point,{layers:["triangles","wineries","triangles-appointment"]}),a=this;console.log(i),i[0]&&(e.flyTo({center:i[0].geometry.coordinates||[138.7454,-34.9191],zoom:a.flytoZoom(a.map)}),this.randomNum=this.getRandomNum())},easeBearing:function(e){return e.getBearing()>0?-5:5},flytoZoom:function(e){return this.map.getZoom()+.5},mapMouseMoved:function(e,t){if(e.isSourceLoaded("winery-label")){var i=e.queryRenderedFeatures(t.point,{layers:["wineries","triangles","triangles-appointment"]});e.getCanvas().style.cursor=i.length?"pointer":""}},mapMoveStart:function(e,t){this.circle.o=0,this.sparklingSwitchVisible=!1},mapMoveEnd:function(e){this.circle.o=1;this.moveCircleActive=!1,this.currentSelected=this.nearest,this.randomNum=this.getRandomNum(),this.moveCircle(e),this.zoomCircle(e)},mapMoving:function(e){this.moveCircle(e),this.moveCircleActive},mapLoaded:function(e){this.map=e,this.mapReady=!0},dataLoading:function(e,t){},loadData:function(){console.log("loading data..."),this.map.addSource("winery-label",{type:"geojson",data:{type:"FeatureCollection",features:this.data}}),this.map.addSource("winery-label-triangle",{type:"geojson",data:{type:"FeatureCollection",features:h.filter(this.data,function(e){return 0==e.properties.appointment})}}),this.map.addSource("winery-label-appointment",{type:"geojson",data:{type:"FeatureCollection",features:h.filter(this.data,function(e){return 1==e.properties.appointment})}}),this.map.addLayer({id:"triangles",type:"symbol",source:"winery-label-triangle",filter:["==","$type","Point"],layout:{"text-size":{base:1,stops:[[8,14],[14,15]]},"text-font":["Knockout 29 Junior Liteweight"],visibility:"visible","icon-size":{base:.8,stops:[[8,.1],[15,1.1]]},"text-offset":[0,-.2],"icon-image":"triangle-filled","icon-allow-overlap":!0},paint:{"text-color":"hsl(0, 0%, 100%)","icon-opacity":.8}}),this.map.addLayer({id:"triangles-appointment",type:"symbol",source:"winery-label-appointment",filter:["==","$type","Point"],layout:{"text-size":{base:1,stops:[[8,14],[14,15]]},"text-font":["Knockout 29 Junior Liteweight"],visibility:"visible","icon-size":{base:.8,stops:[[8,.1],[15,1.1]]},"text-offset":[0,-.2],"icon-image":"triangle-outline","icon-allow-overlap":!0},paint:{"text-color":"hsl(39, 20%, 100%)","icon-opacity":1}}),this.map.addLayer({id:"wineries",type:"symbol",source:"winery-label",filter:["==","$type","Point"],layout:{"text-line-height":1,"text-size":{base:1.3,stops:[[4,6],[14,23]]},"text-allow-overlap":!0,"text-font":["Roboto Medium","Arial Unicode MS Regular"],"text-justify":"left",visibility:"visible","text-offset":[1,.1],"text-anchor":"left","text-field":"{label}","text-max-width":15},paint:{"text-color":"#65132C"}}),console.log("data loaded"),this.zoomCircle(this.map),this.moveCircle(this.map);this.$refs.map.$el},zoomCircle:function(e){this.map.getZoom()<9?this.circle.r=0:this.circle.r=a(this.map.getZoom(),15,9,50,15)},mapZooming:function(e){this.zoomCircle(e)},moveCircle:function(e){if(e.isSourceLoaded("winery-label")){var t=e.queryRenderedFeatures({layers:["triangles","triangles-appointment"]});if(t.length>0){this.circle.off=!1;for(var i=h.uniqBy(t,"properties.id"),a=null,n=e.getCenter().lat,r=e.getCenter().lng,s=999999999999,o=i.length-1;o>=0;o--){var l=d([n,r],[i[o].geometry.coordinates[1],i[o].geometry.coordinates[0]],{format:!1,unit:"meters"});a||(a=i[o]),l<s&&(a=i[o],s=l)}var c=e.project([a.geometry.coordinates[0],a.geometry.coordinates[1]]),p=parseInt(c.x-1.02*this.circle.r),m=parseInt(c.y-1.02*this.circle.r);this.circle.x=p,this.circle.y=m,this.moveCircleActive&&(console.log("moving circle"),this.circle.o=1),a!==this.currentSelected&&(this.nearest=a)}else this.circle.o=0,this.currentSelected=null,this.circle.off=!0}else this.circle.off=!0}}}},function(e,t,i){"use strict";function a(e,t,i){return Math.min(i,Math.max(t,e))}function n(e,t,i,a,n){return a+(n-a)*(e-t)/(i-t)}Object.defineProperty(t,"__esModule",{value:!0});var r=i(1),s=i(6),o=i.n(s),l=i(33);r.a.use(o.a);var c=i(2);r.a.use(l.a),t.default={name:"sheet",props:["startingWidth"],created:function(){var e=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;this.maxSheetWidth-=this.minSheetWidth,this.dim.w=parseInt(.666*e)},methods:{pan:function(e,t){var i=this;if("panstart"==e&&(this.original_width=this.dim.w,this.resizing=!0),"panend"==e){this.resizing=!1;var r=parseInt(this.dim.w+t.distance*(.7*t.velocityX));this.maxSheetResize=Math.max(this.dim.w,this.original_width),c.animate(this.dim,{w:a(r,this.minSheetWidth,this.$refs.fullwidth.offsetWidth-100)},{type:c.spring,duration:n(Math.abs(t.velocityX),0,6,1e3,100),frequency:274,friction:516,complete:function(){t.deltaX>0?(i.$emit("resized"),this.panDirection="panright"):(i.$emit("resized"),this.panDirection="panleft")}})}this.dim.w=this.original_width+t.deltaX,this.panDirection=e}},data:function(){return{dim:{w:600},original_width:200,minSheetWidth:100,resizing:!1,maxSheetResize:0,panDirection:null,maxSheetWidth:1920}}}},function(e,t){e.exports={apiKey:"AIzaSyArNJMh8OxNdVEN52aU516OPzQezyay-_w",authDomain:"ahwr-e58a9.firebaseapp.com",databaseURL:"https://ahwr-e58a9.firebaseio.com",projectId:"ahwr-e58a9",storageBucket:"ahwr-e58a9.appspot.com",messagingSenderId:"702518506285"}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),i.d(t,"db",function(){return s});var a=i(3);i(19);var n=i(10),r=a.initializeApp(n),s=r.database()},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i(1),n=i(7),r=i.n(n);a.a.config.productionTip=!1,new a.a({el:"#app",template:"<App/>",components:{App:r.a}})},function(e,t){},function(e,t){},,,,,,,,,,,,,,function(e,t,i){function a(e){i(13)}var n=i(5)(i(9),i(29),a,"data-v-1a545eb0",null);e.exports=n.exports},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{class:["elevation-5",{"elevation-20":!!e.resizing}],style:{width:e.dim.w+"px",minWidth:e.dim.w+"px"},attrs:{id:"sheet-container"}},[i("div",{directives:[{name:"touch",rawName:"v-touch:pan",value:e.pan,expression:"pan",arg:"pan"}],staticClass:"resize-handler"}),e._v(" "),i("div",{ref:"fullwidth",attrs:{id:"fullwidth"}}),e._v(" "),i("div",{staticClass:"arrow noselect"}),e._v(" "),i("div",{class:["icon","noselect",{panleft:"panleft"==e.panDirection}]},[e._v("keyboard_arrow_right")]),e._v(" "),e._t("default")],2)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container",attrs:{id:"app"}},[e.data?i("transition-group",{attrs:{name:"slide"}},e._l(e.data,function(t,a,n){return t.properties.id==e.currentSelected.properties.id?i("div",{key:a,staticClass:"information winery",attrs:{id:"info-container"}},[i("div",{staticClass:"winery-container"},[i("div",{staticClass:"winery-name"},[e._v(e._s(t.properties.name)),i("span",{staticClass:"winery-region"},[e._v(e._s(t.properties.region))])]),e._v(" "),i("div",{staticClass:"winery-desc"},[e._v(e._s(t.properties.desc))]),e._v(" "),i("div",{staticClass:"winery-where"},[i("span",{staticClass:"label"},[e._v("Where")]),e._v(e._s(t.properties.where)),i("div",{staticClass:"winery-tel"},[i("span",{staticClass:"label"},[e._v("T")]),e._v(e._s(t.properties.tel))])]),e._v(" "),i("div",{staticClass:"winery-open"},[i("span",{staticClass:"label"},[e._v("Open")]),e._v(e._s(t.properties.open))]),e._v(" "),i("a",{staticClass:"winery-website",attrs:{target:"_blank",href:"http://"+t.properties.website}},[e._v(e._s(t.properties.website))])])]):e._e()})):e._e(),e._v(" "),i("v-container",{class:["controls","container",{active:e.sparklingSwitchVisible}]},[i("v-row",[i("v-col",{attrs:{xs12:"",md12:""}},[i("v-card",{staticClass:"white elevation-7",staticStyle:{"border-radius":"30px"}},[i("v-card-text",{staticStyle:{"padding-top":"0px !important"}},[i("v-switch",{class:["switch",{active:e.sparklingTrail}],attrs:{label:"Sparkling Trail",primary:""},nativeOn:{click:function(t){e.toggleSparklingSwitch()}},model:{value:e.sparklingTrail,callback:function(t){e.sparklingTrail=t},expression:"sparklingTrail"}})],1)],1)],1)],1)],1),e._v(" "),i("sheet",{ref:"sheet",staticClass:"sheet",attrs:{startingWidth:"800"},on:{resized:e.resizedSheet}},[i("mapbox",{ref:"map",attrs:{"access-token":"pk.eyJ1IjoiZWRhbndlaXMiLCJhIjoiY2lmMTVtdWQ0MDRsOHNkbTV2OXd3cDNwNiJ9.MxWj73wGNEvrPSjsh6TJjw","map-options":{style:"mapbox://styles/edanweis/cj2iddj93001k2rph61u9lw6f",maxBounds:[[138.1381,-35.54],[139.705,-34.4558]],center:[138.7333,-34.9141],zoom:10,hash:!0},navControl:{show:!0},"geolocate-control":{show:!1,position:"top-left"}},on:{"map-resize":e.mapResized,"map-movestart":e.mapMoveStart,"map-move":e.mapMoving,"map-click":e.mapClicked,"map-mousemove":e.mapMouseMoved,"map-load":e.mapLoaded,"map-zoom":e.mapZooming,"map-moveend":e.mapMoveEnd,"map-dataloading":e.dataLoading}}),e._v(" "),i("div",{class:["circle",{off:1==e.circle.off},{active:1==e.circle.o},{inactive:0==e.circle.o}],style:{transform:"translateX("+e.circle.x+"px) translateY("+e.circle.y+"px)",width:2*e.circle.r+"px",height:2*e.circle.r+"px"}}),e._v(" "),i("div",{class:["multiply","circle",{off:1==e.circle.off},{active:1==e.circle.o},{inactive:0==e.circle.o}],style:{transform:"translateX("+e.circle.x+"px) translateY("+e.circle.y+"px)",width:2*e.circle.r+"px",height:2*e.circle.r+"px"}})],1)],1)},staticRenderFns:[]}}],[12]);
//# sourceMappingURL=app.edda9ef42fb2c7222062.js.map