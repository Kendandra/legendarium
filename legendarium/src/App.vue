<template>
<div id="app">
    <event-viewer v-bind:events="events" activeEventId="evt:8"/>
</div>
</template>

<script>
import EventViewer from './components/EventViewer.vue'

export default {
    name: 'app',
    components: {
      EventViewer
      },

    data() {
        return {
            events: [{
                    id:"evt:1",
                    name: "The Fall of Tippa",
                    description: "On the Second Awakening of the Drider Prime, the small ranching village of Tippa",
                    place: {
                        id: "pla:1",
                        name: "Tippa",
                        xPos: 1515,
                        yPos: 8493
                    },
                    epoch: {
                      calendar: "attris-ages",
                      age: "golden",
                      year: "150"
                    }
                },
                {
                    id:"evt:2",
                    name: "The Eighth Kraal'Zerah Rises",
                    description: "Red Dragonqueen Salyrathuum constructs the Kraal'Zerah to anoint a successor to the red dragonflight's crown.",
                    place: {
                        id: "pla:2",
                        name: "Kraal'Zerah",
                        xPos: 4375,
                        yPos: 9090
                    },
                    epoch: {
                      calendar: "attris-ages",
                      age: "golden",
                      year: "250"
                    }
                }
            ]
        }
    },
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
