<template>
  <renderer :size="size">
    <scene>
      <camera :position="{ z: 1000, y: 1000, x: 0 }"></camera>
      <object3d v-if="mesh" :obj="mesh"></object3d>
    </scene>
  </renderer>
</template>

<script>
  import * as THREE from 'three'
  import Object3D from '../components/Object3D'

  export default {
    name: 'App',
    mixins: [Object3D],
    data () {
      return {
        size: {
          w: window.innerWidth,
          h: window.innerHeight
        },
        mesh: null
      }
    },
    created () {
      this.clock = new THREE.Clock()
      this._obj = this.createBox()
    },

    mounted () {
      // this.animate()
    },

    methods: {
      createBox(){
        var loader = new THREE.JSONLoader();

        loader.load('/static/deviation_all.js', function ( geometry ) {
          var meshMaterial =  new THREE.MeshBasicMaterial( { color: 0xffffff } );
          var mesh = new THREE.Mesh( geometry, meshMaterial );
          mesh.position.set( 0.5, 0.2, 0 );
          mesh.rotation.set( - Math.PI / 2, Math.PI / 2, 0 );
          mesh.scale.set( 0.03, 0.03, 0.03 );
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.name = 'mesh'
          return mesh
        });
      },
      animate () {
        requestAnimationFrame(this.animate)
        const time = this.clock.getElapsedTime() * 5
      }
  }
}
</script>