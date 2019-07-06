<template lang="html">
  <div class="event-viewer">
    <map-viewer
      placeName="Tippa"
      v-bind:place="place"/>
    <h1>{{ eventName }}</h1>
  </div>
</template>

<script>
import MapViewer from "./MapViewer.vue";
export default {
  name: "event-viewer",
  components: {
    MapViewer
  },
  props: {
    eventName: String
  },
  data() {
    return {
      place: {
        name: "Tippa",
        xPos: -1515,
        yPos: -8493
      }
    };
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
