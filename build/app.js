const app = new WHS.App([
  new WHS.app.ElementModule(),
  new WHS.app.SceneModule(),
  new WHS.app.CameraModule({
    position: new THREE.Vector3(0, 210, 800),
    useControls: true,
     fov: 20,
  }),
  new WHS.controls.OrbitModule({target: new THREE.Vector3(0, 0, 0)}),
  new WHS.app.RenderingModule({
  	bgColor: '#EDEAD2',
  	bgOpacity: 0,
  	renderer: {
  			alpha: true,
            antialias: true
        }
  }),
  new WHS.app.ResizeModule()
]);



const controlsModule = new WHS.controls.OrbitModule();


const winery_contours = new WHS.Model({
  geometry: {
    path: "deviation_all.js"
  },

  useCustomMaterial: false, // Required if you want to force the use of material you provide

  pos: {
    x: 0,
    y: 0,
    z: 0
  },
  rotation: {
    x: -1.59,
    y: 0,
    z: 0.6
  },
  scale: {
    x: 0.1,
    y: 0.1,
    z: 0.1
  }
});

winery_contours.addTo(app);


new WHS.AmbientLight( {
  light: {
    color: 0xffffff,
    intensity: 1
  }
}).addTo(app);



new WHS.Loop(() => {
	  // winery.rotation.z += 0.0015;
	  winery_contours.rotation.z -= 0.002;
	}).start(app);	


app.start(); // Start animations and physics simulation.

