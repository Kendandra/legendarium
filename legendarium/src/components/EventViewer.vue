<template lang="html">
<div class="event-viewer">
    <map-viewer v-if="activeEvent.place" v-bind:place="activeEvent.place" />
    <timeline-selector v-bind:timelines="events" />
    <div class="event-viewer-details">
        <h1>{{ activeEvent.name }}</h1>
        <p>{{ activeEvent.description }}</p>
    </div>
</div>
</template>

<script>
import MapViewer from "./MapViewer.vue";
import TimelineSelector from './TimelineSelector.vue'

export default {
    name: "event-viewer",
    components: {
        MapViewer,
        TimelineSelector
    },
    props: {
        events: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            activeEvent: null
        };
    },
    methods: {
        setActiveEvent: function (index) {
            this.activeEvent = this.events[index];
        }
    },

    created() {
        this.setActiveEvent(0);
    }
};
</script>

<style scoped>
.event-viewer {
    display: flex;
    flex-direction: column;
}

.event-viewer-details h1 {
    margin: 40px 0 0;
}
</style>
