<template lang="html">
<div class="map-viewer">
  <img class="map-box"
    v-bind:alt="place.name"
    v-bind:src="require('../assets/maps/map_world.png')"
    v-bind:style="{ 'object-position': mapObjectPosition() }"/>
    <p>Height {{devH}}</p>
    <p>Width {{devW}}</p>
    <p>POS {{mapObjectPosition()}}</p>
</div>
</template>

<script>
export default {
  name: "map-viewer",
  components: {},
  props: {
    place: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      mapObjectPosition: () => {
        let xPosWithOffset = this.place.xPos;
        let yPosWithOffset = this.place.yPos;
        return `${xPosWithOffset}px ${yPosWithOffset}px`;
      },
      devH: 5,
      devW: 10,
      //windowWidth
    };
  },

  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getMapHeight);
      window.addEventListener('resize', this.getMapWidth);

      //Init
      this.getMapHeight()
      this.getMapWidth()
    })

  },

  methods: {
    getWindowWidth() {
        //this.windowWidth = $ref;
      },

      getWindowHeight() {
        this.windowHeight = document.documentElement.clientHeight;
      }
  },
  computed: {},

  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);
    window.removeEventListener('resize', this.getWindowHeight);
  },

};
</script>

<style scoped>
.map-box {
  object-fit: none;
  width: 100%;
  max-height: 400px;
  max-width: 1000px;
}
</style>
