<template lang="html">
<div class="timeline-selector">
    <ul>
        <li v-for="event in orderedEvents" v-bind:key="event.id" v-on:click="$emit('set-active-event', event.id)" v-bind:class="{ 'active': isActiveEvent(event) }" v-bind:style="{'color': getSagaHexColor(event.saga.shortName)}">
            {{event.id}} -- {{event.epoch.age}}:{{event.epoch.year}} -- {{ event.name }}
        </li>
    </ul>
    <ul>
        <li v-for="saga in sagas" v-bind:key="saga.saga.id" v-bind:style="{'color': getSagaHexColor(saga.saga.shortName)}">
            {{saga.saga.id}} -- {{saga.saga.name}}
        </li>
    </ul>
    <svg width="100%" height="100px" viewBox="0 0 200 200">
        <!-- Draw Saga lines -->
        <g v-for="(saga, index) in sagas"
            v-bind:key="saga.saga.id"
            v-bind:fill="getSagaHexColor(saga.saga.shortName)"
            v-bind:stroke="getSagaHexColor(saga.saga.shortName)">

            <line x1="0" x2="200" y1="100" y2="100"/>
        </g>

        <!-- Draw event dots -->
        <g v-for="(event, index) in orderedEvents"
            v-bind:key="event.id"
            v-on:click="$emit('set-active-event', event.id)"
            v-bind:class="{ 'active': isActiveEvent(event) }"
            v-bind:fill="getSagaHexColor(event.saga.shortName)"
            v-bind:stroke="getSagaHexColor(event.saga.shortName)">

            <circle
                v-bind:r="getEventDotRadius(event)"
                v-bind:cx="getEventDotX(index)"
                cy="50" >
                <title>{{event.epoch.age}}:{{event.epoch.year}} -- {{ event.name }}</title>
            </circle>
        </g>
    </svg>
</div>
</template>

<script lang="js">
import color from '../helpers/color.js'

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
            return event.id == this.activeEventId;
        },

        // Event based methods
        getEventDotX(eventIndex) {
            return eventIndex * 100;
        },
        getEventDotRadius(event) {
            if (this.isActiveEvent(event)) {
                return 20;
            } else {
                return 10;
            }
        },

        // Saga based methods
        getSagaLineStart(event) {
            console.log(event);
            return 50;
        },
        getSagaHexColor(sagaName) {
            return color.stringToHexColor(sagaName);
        }
    },
    computed: {
        orderedEvents() {
            // The .concat clones the array below.  That way we're not mutating it with the sort.
            // Since the events array is a proprety, we should avoid mutations as a best practice.
            // TODO: Handle multiple ages
            return this.events.concat().sort((a, b) => Number(a.epoch.year) - Number(b.epoch.year));
        },

        sagas() {
            let sagas = {}
            // Group all events in to saga lines, we don't need to order, because the events are already in order
            this.orderedEvents.forEach(event => {
                if (sagas[event.saga.id] === undefined) {
                    sagas[event.saga.id] = {
                        saga: event.saga,
                        events: []
                    };
                }
                sagas[event.saga.id].events.push(event);
            });
            return sagas;
        }
    }
}
</script>

<style lang="scss" scoped>
.timeline-selector li.active {
    font-weight: bold;
}

.timeline-selector svg {
    stroke-width: 5;
}

.timeline-selector svg g.active circle {
    stroke-width: 10;
    fill: white;
}
.resizeable-svg-container {
    display: inline-block;
    position: relative;
    width: 100%;
    vertical-align: middle;
    overflow: hidden;
}
</style>
