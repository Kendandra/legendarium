<template lang="html">
<div class="timeline-selector">
    <ul>
        <li v-for="event in events" v-bind:key="event.id" v-bind:class="{ 'active': event.id == activeEventId }" v-on:click="$emit('set-active-event', event.id)">
            {{event.epoch.age}}:{{event.epoch.year}} -- {{ event.name }}
        </li>
    </ul>

    <svg width="100%" height="100px" viewBox="0 0 100 100">
        <g v-for="(event, index) in events"
          v-bind:key="event.id"
          v-bind:class="{ 'active': event.id == activeEventId }"
          v-on:click="$emit('set-active-event', event.id)">
          <line x1="50" v-bind:x2="getEventDotX(index)" y1="50" y2="50"/>
          <circle v-bind:cx="getEventDotX(index)"
            cy="50"
            r="10"
            fill="inherit"/>

        </g>
    </svg>
</div>
</template>

<script lang="js">
export default {
    name: 'timeline-selector',
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
    mounted() {

    },
    data() {
        return {

        }
    },
    methods: {
        isActiveEvent(event) {
            console.log(event.id + " :: " + this.activeEventId);
            return event.id == this.activeEventId;
        },
        getEventDotX(eventIndex) {
            return eventIndex * 30;
        }
    },
    computed: {
        drawableEvents() {
            let drawableEvents = this.events.map((event) => {
                return {
                    id: event.id

                };
            })
            return drawableEvents;
        }
    }
}
</script>

<style scoped>
.timeline-selector li.active {
    color: #0055ff;
    fill: #0055ff;
    font-weight: bold;
}

.timeline-selector svg {
  stroke: black;
  stroke-width: 3;
  fill: white;
}

.timeline-selector svg .active {
  color: #0055ff;
  stroke-width: 4;
  stroke: blue;
  fill: blue;
}


</style>
