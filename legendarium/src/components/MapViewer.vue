<template lang="html">
<div class="map-viewer">
  <img ref="mapbox"
    class="map-box"
    v-bind:alt="place.name"
    v-bind:src="require('../assets/maps/map_world.png')"
    v-bind:style="{ 'object-position': mapObjectPosition() }"
    v-bind:key="mapboxHeight" />
    <p>Height {{mapboxHeight}}</p>
    <p>Width {{mapboxWidth}}</p>
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
        let xPosWithOffset = this.place.xPos - (this.mapboxWidth/2);
        let yPosWithOffset = this.place.yPos - (this.mapboxHeight/2);
        return `${-xPosWithOffset}px ${-yPosWithOffset}px`;
      },
      mapboxHeight: 0,
      mapboxWidth: 0,
    };
  },

  mounted() {
    // HACK: Seems that even with $nextTick clientHeight isn't populated yet (though clientWidth is)
    // This re-evaluate give us time for this to populate.  Timeout 0 (or even 10) doesn't work, so
    // no clue if this will work on all clients all the time.
    setTimeout(() => { this.setMapDimensions(); }, 100);


    this.$nextTick(function() {
      window.addEventListener("resize", this.setMapDimensions);
      //Init
      this.setMapDimensions();
    });
  },

  methods: {
    setMapDimensions() {
      this.mapboxWidth = this.$refs.mapbox.clientWidth;
      this.mapboxHeight = this.$refs.mapbox.clientHeight;
    },
  },
  computed: {},

  beforeDestroy() {
    window.removeEventListener("resize", this.setMapDimensions);
  }
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
