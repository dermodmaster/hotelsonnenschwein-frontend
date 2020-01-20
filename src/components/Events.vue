<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-content class="pa-0">
        <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <div class="text-center">
            <v-card
                    dark
                    class="secondary"
                    background-color="deep-purple accent-4">
                <h1 class="pa-3 display-3 font-weight-thin ">Events in der Nähe</h1>
            </v-card>
        </div>
        <v-alert v-if="errtext" type="error">
            {{errtext}}
        </v-alert>
        <v-alert v-if="success" type="success">
            Event erfolgreich gebucht!
        </v-alert>
        <div class="text-center my-10">
        <p v-if="events && events.length === 0" class="display-1">Leider keine Events gefunden! :(</p>
        </div>
        <v-row v-if="!loading && events && events.length !== 0" >
            <v-col v-for="event in events" :key="event.EVENT_ID">
                <v-card class="pa-5 mx-auto" elevation="7" >
                    <v-card-title>{{event.EVENT_NAME}}</v-card-title>
                    <v-card-subtitle>{{event.EVENT_START}} bis {{event.EVENT_ENDE}}</v-card-subtitle>
                    <v-card-text>
                    <p>{{event.EVENT_BESCHREIBUNG}}</p>
                        <p><v-icon>mdi-near-me</v-icon> Reiseziel: {{event.ZIEL}}</p>
                        <p><v-icon>mdi-human-handsup</v-icon> Max. {{event.EVENT_KAPAZITAET}} Personen</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="secondary" @click="dialog = true; selectedEvent = event">Jetzt Buchen</v-btn><v-spacer></v-spacer><span class="display-1">{{event.KOSTEN}}€</span>p.P.
                    </v-card-actions>

                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center" v-if="dialog">
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <p class="headline">Eventbuchung</p>
                    </v-card-title>
                    <v-card-text>
                        <p>{{personen > 1 ? personen+' Tickets' : personen+' Ticket'}} für das Event <b>{{selectedEvent.EVENT_NAME}}</b></p>
                        <v-container>
                            <v-row>
                                <v-col cols="9">
                                    <v-text-field label="Email*"  v-model="mail" required></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                    <v-text-field label="Anzahl Personen" type="number"  v-model="personen" required></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                        <small>*Pflichtfeld</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <span class="display-1">{{(selectedEvent.KOSTEN * personen).toFixed(2)}}€</span>
                        <v-btn color="secondary" text @click="dialog = false">Abbrechen</v-btn>
                        <v-btn color="secondary"  @click="dialog = false;bookEvent()">Buchen</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-content>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "Events",
        data: () => {
            return {
                dialog: false,
                selectedEvent : null,
                mail: "",
                personen: 1,
                events: [],
                loading:false,
                errtext: null,
                success: false,
            }
        },
        mounted () {
            this.loading=true;
            axios
                .get('http://hssapi.y4gn1.de/events')
                .then(response => {this.events = response.data;
                this.loading = false;})
        },
        methods:{
            bookEvent(){
                axios.post('http://hssapi.y4gn1.de/events', {
                    email: this.mail,
                    event_id: this.selectedEvent.EVENT_ID,
                    count: this.personen
                })
                    .then(response => {
                        this.success = false;
                        this.errtext = null;
                        if(response.data[0] && response.data[0].Status) {
                            switch ((parseInt(response.data[0].Status))) {
                                case 0:
                                    this.success = true;
                                    break;
                                case 1:
                                    this.errtext = "Die Kapazität des Events reicht für die Personenanzahl nicht aus";
                                    break;
                                case 2:
                                    this.errtext = "Das Format der E-Mail ist ungültig.";
                                    break;
                                case 3:
                                    this.errtext = "Es kann kein Kunde zur E-Mail gefunden werden.";
                                    break;
                                default:
                                    break;
                            }
                        }
                    })
                    .catch(function () {
                    });
            }
        }
    }
</script>

<style scoped>

</style>
