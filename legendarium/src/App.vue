<template>
  <div id="app">
    <event-viewer eventName="The Fall of Tippa"/>
  </div>
</template>

<script>
import EventViewer from './components/EventViewer.vue'

export default {
  name: 'app',
  components: {
    EventViewer
  }
}


</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
