<template lang="html">
<div class="event-viewer">
    <map-viewer v-if="activeEvent.place" v-bind:place="activeEvent.place" />
    <timeline-selector v-bind:events="events" v-bind:activeEventId="activeEvent.id"  v-on:set-active-event="setActiveEventByEventId" />
    <section class="event-viewer-details">
        <h1>{{ activeEvent.name }}</h1>
        <p>{{ activeEvent.description }}</p>
    </section>
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
        },
        activeEventId: {
            type: String,
            required: false
        }
    },
    data() {
        return {
            activeEvent: null
        };
    },
    methods: {
        setActiveEventByIndex: function (index) {
            this.activeEvent = this.events[index];
        },
        setActiveEventByEventId: function (id) {
            let foundEvent = this.events.find(x => x.id == id);
            if (foundEvent === null || foundEvent === undefined) {
                this.setActiveEventByIndex(0);

                // eslint-disable-next-line
                console.warn("Was asked to view event {" + id + "} but couldn't find it in events list");
            } else {
                this.activeEvent = foundEvent;
            }

        }
    },

    created() {
        if (this.activeEventId === undefined) {
            this.setActiveEventByIndex(0);
        } else {
            this.setActiveEventByEventId(this.activeEventId);
        }
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
