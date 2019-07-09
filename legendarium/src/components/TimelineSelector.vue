<template lang="html">
<div class="timeline-selector">
    <ul>
        <li v-for="event in events"
          v-bind:key="event.id"
          v-bind:class="{ 'active': event.id == activeEventId }"
          v-on:click="$emit('set-active-event', event.id)">
            {{ event.name }}
        </li>
    </ul>
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

    },
    computed: {

    }
}
</script>

<style scoped>
.timeline-selector .active {
  color: #0055ff;
  font-weight: bold;
}
</style>
