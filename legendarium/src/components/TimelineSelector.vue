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
    <svg ref="svg" width="100%" height="100px" >
        <!-- Draw Saga lines -->
        <g v-for="(saga, index) in sagas" v-bind:key="saga.saga.id" v-bind:fill="getSagaHexColor(saga.saga.shortName)" v-bind:stroke="getSagaHexColor(saga.saga.shortName)">

            <line x1="0" v-bind:x2="50" y1="getSagaLineY(saga)" y2="100" />
        </g>

        <!-- Draw event dots -->
        <g v-for="(event, index) in orderedEvents" v-bind:key="event.id" v-on:click="$emit('set-active-event', event.id)" v-bind:class="{ 'active': isActiveEvent(event) }" v-bind:fill="getSagaHexColor(event.saga.shortName)" v-bind:stroke="getSagaHexColor(event.saga.shortName)">

            <circle v-bind:r="getEventDotRadius(event)" v-bind:cx="getEventDotX(index)" cy="50">
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
    data() {
        return {
            svgWidth: 0,
            svgHeight: 0,
        };
    },

    mounted() {
        // HACK: Seems that even with $nextTick clientHeight isn't populated yet (though clientWidth is)
        // This re-evaluate give us time for this to populate.  Timeout 0 (or even 10) doesn't work, so
        // no clue if this will work on all clients all the time.
        setTimeout(() => {
            //this.setSvgDimensions();
        }, 100);

        this.$nextTick(function () {
            //window.addEventListener("resize", this.setSvgDimensions);
            //Init
            //this.setSvgDimensions();
        });
    },

    methods: {
        setSvgDimensions() {
            this.svgWidth = this.$refs.svg.clientWidth;
            this.svgHeight = this.$refs.svg.clientHeight;
        },

        isActiveEvent(event) {
            return event.id == this.activeEventId;
        },

        // Event based methods
        getEventDotX(eventIndex) {
            return 50 + eventIndex * 100;
        },

        getEventDotRadius(event) {
            if (this.isActiveEvent(event)) {
                return "10px";
            } else {
                return "5px";
            }
        },

        // Saga based methods
        getSagaLineY(saga) {
            return;
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
        },
        getSagaLineEndingX() {
            return this.svgWidth;
        }
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.setSvgDimensions);
    }
}
</script>

<style lang="scss" scoped>
.timeline-selector li.active {
    font-weight: bold;
}

.timeline-selector svg circle {
    stroke-width: 4;
}

.timeline-selector svg line {
    stroke-width: 6;
}

.timeline-selector svg g.active circle {
    stroke-width: 8;
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
