<template lang="html">
<div class="map-viewer">
  <img class="map-box" src="../assets/maps/map_world.png" alt="Map" :style="imgStyle"/>
</div>
</template>

<script>
export default {
    name: 'map-viewer',
    components: {},
    props: {
      placeName: String,
      imageFile: String,
      xPos: Number,
      yPos: Number
    },

    mounted() {

    },
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {
      imgStyle: function () {
        return "";//("object-position " + String(this.xPos) + " " + String(this.yPos));
      }
    }

}
</script>

<style scoped>
  img.map-box {
    object-fit: none;
    object-position: -1515px -8554px;
    width: 100%;
    max-height: 400px;
    max-width: 400px;
  }
</style>
