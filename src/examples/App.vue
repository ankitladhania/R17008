<style>
  body { margin: 0; }
</style>

<template>
  <renderer :size="size">
    <scene>
      <camera :position="{ z: 0, y: 0, x: 0 }"></camera>
      <ocean></ocean>
    </scene>
  </renderer>
</template>

<script>
  import Ocean from './Ocean'

  export default {
    name: 'App',

    components: { Ocean },

    data () {
      return {
        size: {
          w: window.innerWidth,
          h: window.innerHeight
        }
      }
    }
  }
</script>
