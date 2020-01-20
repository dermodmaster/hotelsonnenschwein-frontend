<template>
    <v-content class="pa-0">
        <div class="text-center">
            <v-card
                    dark
                    class="secondary"
                    background-color="deep-purple accent-4">
                <h1 class="pa-3 display-3 font-weight-thin ">Buchungsprozess</h1>
                <h3>Raumnummer {{$route.params.id}}</h3>
            </v-card>
        </div>
        <v-row>
            <v-col cols="4">
                    <v-card :loading="loading"
                            class="mx-12"
                    >
                        <h3 v-if="!room || !roomtypes">Laden...</h3>
                        <div v-if="room && roomtypes">
                        <v-img
                                v-if="!room.BILD && room.RAUMTYP === 'tagungsraum'"
                                height="250"
                                src="../assets/tagungsraum.jpg"
                        ></v-img>
                        <v-img
                                v-if="!room.BILD && room.RAUMTYP === 'festsaal'"
                                height="250"
                                src="../assets/festsaal.jpg"
                        ></v-img>
                        <v-img
                                v-if="!room.BILD && room.RAUMTYP === 'fitnessstudio'"
                                height="250"
                                src="../assets/gym.jpg"
                        ></v-img>
                        <v-img
                                v-if="!room.BILD && room.RAUMTYP === 'schwimmbad'"
                                height="250"
                                src="../assets/swimmingpool1.jpg"
                        ></v-img>
                        <v-img
                                v-if="!room.BILD && room.RAUMTYP === 'schwimmbad'"
                                height="250"
                                src="../assets/swimmingpool1.jpg"
                        ></v-img>
                        <v-img v-if="room.BILD" :src="'data:image/png;base64,'+room.BILD"></v-img>
                        <v-img v-if="room.RAUMTYP === 'zimmer' && !room.BILD" :src="'data:image/png;base64,'+roomtypes.filter(v=>v.ID_ZIMMERTYP === room.ID_ZIMMERTYP)[0].BILD"></v-img>

                        <v-card-title>{{!room.ID_ZIMMERTYP ? translate[room.RAUMTYP] : roomtypes.filter(v => v.ID_ZIMMERTYP === room.ID_ZIMMERTYP)[0].BESCHREIBUNG}}</v-card-title>

                        <v-card-text>
                            <div class="mb-1 subtitle-1 black--text">
                                RaumNr: <span>{{room.RAUMNUMMER}}</span><v-icon>mdi-door</v-icon><br>
                                Fläche: {{room.GROESSE}}m² <v-icon>mdi-tape-measure</v-icon><br>
                                Max. {{room.TR_KAPAZITAET}} Personen <v-icon>mdi-account</v-icon>
                            </div>

                            <div>{{room.BESCHREIBUNG}}</div>
                        </v-card-text>
                        <div v-if="room.INVENTAR">
                            <v-divider class="mx-4"></v-divider>
                            <div class="ma-5">
                                <span class="subtitle-2">Besondere Ausstattung:</span><br>
                                {{room.INVENTAR}}
                            </div>
                        </div>
                        <v-divider class="mx-4"></v-divider>
                    </div>
                    </v-card>
            </v-col>
            <v-col>
                <v-card>
                    <v-form>
                        <v-row>
                            <v-col style="max-width: 300px">
                                <div class="ma-3">
                                    <v-text-field v-model="mail" label="E-Mail"></v-text-field>
                                    <p>Buchungsstart: {{picker[0]}} {{time}}</p>
                                    <p>Buchungsende: {{picker[1]}} {{time2}}</p>
                                    <p v-if="room" class="title">Preis: {{price === 0 ? parseFloat(room.CALCPREIS).toFixed(2) : price.toFixed(2)}}€/{{price === 0 ? (room.RAUMTYP === 'zimmer' ? 'Nacht' : 'Stunde') : 'TOTAL'}}</p>
                                    <v-btn class="mr-4" color="secondary" :disabled="!picker || !time || !time2 || !mail" @click="submit">Reservieren</v-btn>
                                </div>
                            </v-col>
                            <v-col>
                                    <v-row>
                                        <v-col>
                                            <h3>Buchungszeitraum</h3>
                                            <v-date-picker @change="calcPrice" v-model="picker" range></v-date-picker>
                                        </v-col>
                                        <v-col>
                                            <h3>Buchungsstart</h3>
                                            <v-time-picker @inputx="calcPrice" v-model="time" format="24hr"></v-time-picker>
                                        </v-col>
                                        <v-col>
                                            <h3>Buchungsende</h3>
                                            <v-time-picker @input="calcPrice" v-model="time2" format="24hr"></v-time-picker>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-row>
                                                <v-col>
                                                    <h1>Bestehende Reservierungen in der Woche:</h1>
                                                    <v-btn
                                                            fab
                                                            small
                                                            left
                                                            color="primary"
                                                            @click="$refs.calendar.prev()"
                                                    >
                                                        <v-icon dark>mdi-chevron-left</v-icon>
                                                    </v-btn>
                                                    <v-btn @click="calendarType = (calendarType === 'month' ? 'week' : 'month')">{{calendarType === "month" ? 'Monat':'Woche'}}</v-btn>
                                                    <v-btn
                                                            fab
                                                            small
                                                            right
                                                            color="primary"
                                                            @click="$refs.calendar.next()"
                                                    >
                                                        <v-icon dark>mdi-chevron-right</v-icon>
                                                    </v-btn>

                                                </v-col>
                                            </v-row>
                                            <v-sheet>
                                                <v-calendar
                                                        ref="calendar"
                                                        v-model="start"
                                                        :events="events"
                                                        color="primary"
                                                        :type="calendarType"
                                                ></v-calendar>
                                            </v-sheet>
                                        </v-col>
                                    </v-row>
                            </v-col>
                        </v-row>
                    </v-form>

                </v-card>
            </v-col>
        </v-row>

    </v-content>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "BookingProcess",
        data: () => {
            return {
                room: null,
                roomtypes: null,
                bookings: null,
                events: [],
                loading: false,
                translate: {"festsaal":"Festsaal", "tagungsraum":"Tagungsraum", "fitnessstudio":"Fitnessstudio", "schwimmbad":"Schwimmbad"},
                titles: {tagungsraum: "Tagungsraum"},
                images: {tagungsraum: "tagungsraum.jpg"},
                mail: "",
                picker: [],
                calendarType: "month",
                time:"00:00",
                time2:"00:00",
                price: 0,
                start: '2019-01-12'
            }
        },
        mounted() {
            const now = new Date();
            this.start = now.toISOString().split('T')[0];
            this.loading = true;
            axios
                .get('http://hssapi.y4gn1.de/rooms')
                .then(response => {
                    this.room = response.data.filter(v => v.RAUMNUMMER === this.$route.params.id)[0];
                    axios
                        .get('http://hssapi.y4gn1.de/roomtypes')
                        .then(response => {
                            this.roomtypes = response.data;
                            axios
                                .get('http://hssapi.y4gn1.de/rooms/'+this.$route.params.id+'/times')
                                .then(response => {
                                    this.loading = false;
                                    this.bookings = response.data;
                                    this.bookings.map(v=>{
                                        this.events.push({"name":"Reserviert","start":v.BUCHUNG_START, "end":v.BUCHUNG_ENDE});
                                    })
                                })
                        })
                })

        },
        methods: {
            calcPrice(){
                if(this.picker && this.time && this.time2 && this.room){
                    const oneDay = 24 * 60 * 60 * 1000;
                    const oneHour = 60 * 60 * 1000;
                    const start = new Date(this.picker[0]+"T"+this.time);
                    const end = new Date(this.picker[1]+"T"+this.time2);
                    const diffDays = Math.round((end - start) / oneDay);
                    const diffHours = Math.round((end - start) / oneHour);
                    window.console.log(diffDays);
                    window.console.log(diffHours);
                    if(this.room.RAUMTYP === 'zimmer'){
                        window.console.log("Zimmer");
                        this.price = this.room.CALCPREIS * diffDays;
                    }else{
                        window.console.log("Kein Zimmer");
                        this.price = this.room.CALCPREIS * (diffHours+1); //+1 weil angebrochene Stunde
                    }
                    if(this.price < 0){
                        this.price = 0;
                    }
                }else{
                    this.price = 0;
                }
            },

            submit(){
                alert("ok")
            }
        }
    }
</script>

<style scoped>

</style>
