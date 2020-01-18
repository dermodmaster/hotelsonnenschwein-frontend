<template>
    <v-content class="pa-0">
        <div class="text-center">
            <v-card
                    dark
                    class="secondary"
                    background-color="deep-purple accent-4">
                <h1 class="pa-3 display-3 font-weight-thin ">Events in der Nähe</h1>
            </v-card>
        </div>
        <div class="text-center my-10">
        <p v-if="events.length === 0" class="display-1">Leider keine Events gefunden! :(</p>
        </div>
        <v-row v-if="events.length !== 0" >
            <v-col v-for="event in events" :key="event">
                <v-card class="pa-5 mx-auto" elevation="7" >
                    <v-card-title>{{event.EVENT_NAME}}</v-card-title>
                    <v-card-subtitle>{{event.EVENT_START}} bis {{event.EVENT_ENDE}}</v-card-subtitle>
                    <v-card-text>
                    <p>{{event.EVENT_BESCHREIBUNG}}</p>
                        <p><v-icon>mdi-near-me</v-icon> Reiseziel: {{event.ZIEL}}</p>
                        <p><v-icon>mdi-human-handsup</v-icon> Max. {{event.EVENT_KAPAZITAET}} Personen</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="secondary" disabled="true">Jetzt Buchen</v-btn><v-spacer></v-spacer><span class="display-1">{{event.KOSTEN}}€</span>
                    </v-card-actions>

                </v-card>
            </v-col>
        </v-row>
    </v-content>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "Events",
        data: () => {
            return {
                events: null
            }
        },
        mounted () {
            axios
                .get('http://hssapi.y4gn1.de/events')
                .then(response => (this.events = response.data))
        }
    }
</script>

<style scoped>

</style>
