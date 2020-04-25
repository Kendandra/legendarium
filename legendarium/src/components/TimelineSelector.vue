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
    <svg ref="svg" width="100%" height="100%" >
        <g class="central-timeline"><line x1="0%" x2="100%" y1="50px" y2="50px" /></g>
        <g v-for="tick in ticks" 
            class="central-timeline"
            v-bind:key="tick.id">
            <line class="tick" v-bind:x1="tick.posX" v-bind:x2="tick.posX" y1="40px" y2="60px" />
        </g>
        <g v-for="(event, index) in orderedEvents" 
            v-bind:key="event.id" v-on:click="$emit('set-active-event', event.id)" 
            v-bind:class="{ 'active': isActiveEvent(event) }" 
            v-bind:fill="getSagaHexColor(event.saga.shortName)" 
            v-bind:stroke="getSagaHexColor(event.saga.shortName)">
            <circle v-bind:r="getEventDotRadius(event)" 
                v-bind:cx="getEventDotX(event)" 
                v-bind:cy="getEventDotY(event, index)">
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
            totalTicks: 10,
            circleRadius: 5,
            maxCircleRadius: 10,
        };
    },

    mounted() {
        // HACK: Seems that even with $nextTick clientHeight isn't populated yet (though clientWidth is)
        // This re-evaluate give us time for this to populate.  Timeout 0 (or even 10) doesn't work, so
        // no clue if this will work on all clients all the time.
        setTimeout(() => {
            this.setSvgDimensions();
        }, 100);

        this.$nextTick(function () {
            window.addEventListener("resize", this.setSvgDimensions);
            //Init
            this.setSvgDimensions();
        });
    },

    methods: {
        setSvgDimensions() {
            this.svgWidth = this.$refs.svg.clientWidth;
            this.svgHeight = this.$refs.svg.clientHeight;
            this.totalTicks = Math.round(this.$refs.svg.clientWidth / (this.maxCircleRadius * 4))
        },

        isActiveEvent(event) {
            return event.id == this.activeEventId;
        },


        // Event based methods
        getEventDotX(event) {
            const tick = this.ticks.find(t => t.events.find(e => e.id === event.id))
            return tick.posX
        },

        getEventDotRadius(event) {
            if (this.isActiveEvent(event)) {
                return this.maxCircleRadius + "px";
            } else {
                return this.circleRadius + "px";
            }
        },

        getEventDotY(event) {
            const tick = this.ticks.find(t => t.events.find(e => e.id === event.id));
            let posY = tick.posY;
            const offSetY = Number(this.maxCircleRadius * 3 * tick.events.indexOf(event));
            if (offSetY !== 0) {
                posY += offSetY;
            }
            return posY + "px"
        },

        // Saga based methods
        //getSagaLineY(saga) {
        //    return;
        //},

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

        startYear() {
            return Number(this.orderedEvents[0].epoch.year)
        },

        endYear() {
            return Number(this.orderedEvents[this.orderedEvents.length - 1].epoch.year)
        },

        yearRange() {
            return this.endYear - this.startYear
        },

        timeUnits() {
            return (this.yearRange) / this.totalTicks;
        },

        offsetStartYear() {
            return this.startYear - this.timeUnits;
        },

        offsetTickAmount() {
            // Offset by 3 for 1 tick at the end, 1 tick at the beginning and 1 more for aligning to 20 for array indexing.
            return this.totalTicks + 3
        },

        ticks() {
            // Generates an array from the requested amount of totalTicks. If 20 makes [0, 1, 2, ... 19]
            // 
            const tickRange = [...Array(this.offsetTickAmount).keys()];
            const tickObjArray = tickRange.map(t => ({
                posX: (100 / this.offsetTickAmount) * t + "%",
                posY: 50,
                tick: t,
                year: t * this.timeUnits + this.offsetStartYear,
                events: this.orderedEvents.filter(oe => (Math.floor((Number(oe.epoch.year) - this.offsetStartYear) / this.timeUnits) === t))
            }));
            return tickObjArray
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

.timeline-selector svg g.active circle {
    stroke-width: 8;
    fill: white;
}

.central-timeline {
    fill: #2b2b2b;
    stroke: #2b2b2b;
    line {
        stroke-width: 3;
    }
    .tick {
        stroke-width: 1;
    }
}

.resizeable-svg-container {
    display: inline-block;
    position: relative;
    width: 100%;
    vertical-align: middle;
    overflow: hidden;
}
</style>
