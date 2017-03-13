<script>
/* eslint-disable */
/* global requestAnimationFrame */
import * as THREE from 'three'
import Object3D from '../components/Object3D'

// import sphere from './sphere.stl';

// import "imports?THREE=three!loaders/OBJLoader";



// http://threejs.org/examples/#webgl_geometry_dynamic
export default {
  name: 'Ocean',

  mixins: [Object3D],

  created () {
    // this.animate = this.animate.bind(this)
    this.clock = new THREE.Clock()
    this._obj = this.createBox()
  },

  mounted () {
    // this.animate()
  },

  methods: {
    createBox(){
      // var STLLoader = require('three-stl-loader')(THREE)
      // var OBJLoader = require('three-obj-loader');
      // OBJLoader(THREE);
      // var loader = new THREE.OBJLoader()
      var loader = new THREE.JSONLoader();

      loader.load('/static/monster.json', function ( geometry ) {
                // console.log(geometry)
                // var meshMaterial = material;
                // if (geometry.hasColors) {
                //   meshMaterial = new THREE.MeshPhongMaterial({ opacity: geometry.alpha, vertexColors: THREE.VertexColors });
                // }
                console.log(geometry.parse)

                var meshMaterial =  new THREE.MeshBasicMaterial( { color: 0xffffff } );
                var mesh = new THREE.Mesh( geometry, meshMaterial );
                mesh.position.set( 0.5, 0.2, 0 );
                mesh.rotation.set( - Math.PI / 2, Math.PI / 2, 0 );
                mesh.scale.set( 0.3, 0.3, 0.3 );
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                mesh.name = 'Ocean'
                return mesh
              });

      // const material =  new THREE.MeshBasicMaterial( { color: 0xffffff } );
      // const material2 =  new THREE.MeshBasicMaterial( { color: 0xff22ff } );
      // const geometry = new THREE.CubeGeometry(500, 500, 500);
      // const geometry2 = new THREE.CubeGeometry(500, 500, 500);
      // const mesh = new THREE.Mesh( geometry2, material2 );
      // const edges = new THREE.EdgesGeometry( geometry );
      // const line = new THREE.LineSegments( edges, material );

      // var group = new THREE.Group();
      // group.add(line)
      // group.add(mesh)
      // group.name = 'Ocean'
      // return group
    },
    animate () {
      requestAnimationFrame(this.animate)
      const time = this.clock.getElapsedTime() * 5
      // this._obj.rotation.x += 0.01
      // this._obj.rotation.y += 0.01
      // for (let i = 0, l = this._obj.geometry.vertices.length; i < l; i++) {
      //   this._obj.geometry.vertices[i].y = 10 * Math.sin(i / 5 + (time + i) / 7)
      // }
      // this._obj.geometry.verticesNeedUpdate = true
    }
  }
}
</script>
