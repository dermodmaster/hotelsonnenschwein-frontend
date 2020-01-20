<template>
    <v-content class="pa-0">
        <div class="text-center">
            <v-card
                    dark
                    class="secondary"
                    :loading="loading"
                    background-color="deep-purple accent-4">
                <h1 class="pa-3 display-3 font-weight-thin ">Auskunft</h1>
                <h3>Um eine Auskunft zu erhalten, geb bitte hier deine E-Mail Adresse ein:</h3>
                <v-row class="justify-center">
                    <v-col style="max-width: 400px">
                        <v-text-field v-model="email" class="text-center"></v-text-field>
                        <v-btn @click="getData">Daten abfragen</v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </div>
        <v-alert v-if="errtext" type="error">
            {{errtext}}
        </v-alert>
        <div v-if="!errtext">
            <v-row>
                <v-col>
                    <div class="text-center">
                        <v-card
                                dark
                                class="secondary"
                                :loading="events.loading"
                                background-color="deep-purple accent-4">
                            <h1 class="pa-3 display-1 font-weight-light ">Gebuchte Events</h1>
                        </v-card>
                    </div>
                    <v-data-table
                            :headers="events.headers"
                            :items="events.data"
                            :items-per-page="5"
                            class="elevation-1"
                    ></v-data-table>
                </v-col>
                <v-col>
                    <div class="text-center">
                        <v-card
                                dark
                                class="secondary"
                                :loading="rooms.loading"
                                background-color="deep-purple accent-4">
                            <h1 class="pa-3 display-1 font-weight-light ">Reservierte Angebote</h1>
                        </v-card>
                    </div>
                    <v-data-table
                            :headers="rooms.headers"
                            :items="rooms.data"
                            :items-per-page="5"
                            class="elevation-1"
                    ></v-data-table>
                </v-col>
                <v-col>
                    <div class="text-center">
                        <v-card
                                dark
                                class="secondary"
                                :loading="zimmer.loading"
                                background-color="deep-purple accent-4">
                            <h1 class="pa-3 display-1 font-weight-light ">Gebuchte Zimmer</h1>
                        </v-card>
                    </div>
                    <v-data-table
                            :headers="zimmer.headers"
                            :items="zimmer.data"
                            :items-per-page="5"
                            class="elevation-1"
                    ></v-data-table>
                </v-col>
            </v-row>
        </div>
    </v-content>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "informationdesk",
        data: () => {
            return {
                data: [],
                loading: false,
                email: "melanie1337@gmail.com",
                errtext:null,
                translate: {"festsaal":"Festsaal", "tagungsraum":"Tagungsraum", "fitnessstudio":"Fitnessstudio", "schwimmbad":"Schwimmbad"},
                events: {"loading":false, "data":[],headers: [
                        {
                            text: 'Eventname',
                            align: 'left',
                            value: 'Name',
                        },
                        {
                            text: 'Ziel',
                            value: 'Ziel',
                        },
                        { text: 'Event Beginn', value: 'Start' },
                        { text: 'Event Ende', value: 'Ende' },
                        { text: 'Personen', value: 'Anzahl' },
                    ]},
                rooms: {"loading":false, "data":[],headers: [
                        {
                            text: 'Raumnummer',
                            align: 'left',
                            value: 'Raumnummer',
                        },
                        {
                            text: 'Zimmertyp',
                            value: 'Raeumlichkeit',
                        },
                        { text: 'Buchungs Beginn', value: 'Start' },
                        { text: 'Buchungs Ende', value: 'Ende' },
                        { text: 'Preis (€)', value: 'Preis' },
                    ]},
                zimmer: {"loading":false, "data":[],headers: [
                        {
                            text: 'Raumnummer',
                            align: 'left',
                            value: 'Raumnummer',
                        },
                        {
                            text: 'Zimmertyp',
                            value: 'Zimmer',
                        },
                        { text: 'Buchungs Beginn', value: 'Start' },
                        { text: 'Buchungs Ende', value: 'Ende' },
                        { text: 'Preis (€)', value: 'Preis' },
                    ],}
            }
        },
        mounted() {
            this.loading = true;
            axios
                .get('http://hssapi.y4gn1.de/workers')
                .then(response => {
                    this.loading = false;
                    this.workers = response.data;
                })
        },
        methods:{
            errorHandling(data){
                this.errtext = null;
                if(data[0] && data[0].Status){
                    switch (parseInt(data[0].Status)) {
                        case 1:
                            this.errtext = "Die E-Mail ist ungültig.";
                            break;
                        case 2:
                            this.errtext = "Die E-Mail ist ungültig.";
                            break;
                        case 3:
                            this.errtext = "Es kann kein Kunde zur E-Mail gefunden werden.";
                            break;
                        default:
                            break;
                    }
                }
            },
            getData(){
                if(!this.email){
                    this.errtext = "Bitte eine E-Mail angeben.";
                    return;
                }
                const timeoptions = {weekend: 'long', year:'numeric', month:'long', day:'numeric', hour:'numeric', minute:'numeric'};
                this.events.loading = true;
                this.rooms.loading = true;
                this.zimmer.loading = true;

                axios.get('http://hssapi.y4gn1.de/booked/events/'+this.email)
                    .then(response => {
                        this.events.data = response.data;
                        this.events.data.map(v => {
                            v.Start = v.Start.replace(" ", "T");
                            v.Start = new Date(v.Start).toLocaleDateString('de-DE', timeoptions)+" Uhr";
                            v.Ende = v.Ende.replace(" ", "T");
                            v.Ende = new Date(v.Ende).toLocaleDateString('de-DE', timeoptions)+" Uhr";
                        })
                        this.events.loading=false;

                        this.errorHandling(response.data);

                    });
                axios.get('http://hssapi.y4gn1.de/booked/rooms/'+this.email)
                    .then(response => {
                        this.rooms.data = response.data;
                        this.rooms.data.map(v => {
                            v.Preis = parseFloat(v.Preis).toFixed(2)+"€";
                            v.Raeumlichkeit = this.translate[v.Raeumlichkeit];
                            v.Start = v.Start.replace(" ", "T");
                            v.Start = new Date(v.Start).toLocaleDateString('de-DE', timeoptions)+" Uhr";
                            v.Ende = v.Ende.replace(" ", "T");
                            v.Ende = new Date(v.Ende).toLocaleDateString('de-DE', timeoptions)+" Uhr";
                        })
                        this.rooms.loading = false;
                        this.errorHandling(response.data);

                    });
                axios.get('http://hssapi.y4gn1.de/booked/zimmer/'+this.email)
                    .then(response => {
                        this.zimmer.data = response.data;
                        this.zimmer.data.map(v => {
                            v.Preis = parseFloat(v.Preis).toFixed(2)+"€";
                            v.Start = v.Start.replace(" ", "T");
                            v.Start = new Date(v.Start).toLocaleDateString('de-DE', timeoptions)+" Uhr";
                            v.Ende = v.Ende.replace(" ", "T");
                            v.Ende = new Date(v.Ende).toLocaleDateString('de-DE', timeoptions)+" Uhr";
                        })
                        this.zimmer.loading = false;
                        this.errorHandling(response.data);
                    });
            }
        }
    }
</script>

<style scoped>

</style>
