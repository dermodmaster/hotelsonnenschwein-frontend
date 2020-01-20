<template>
    <v-content class="pa-0">
        <div class="text-center">
            <v-card
                    dark
                    class="secondary"
                    background-color="deep-purple accent-4">
                <h1 v-if="roomtypes" class="pa-3 display-3 font-weight-thin ">{{roomtypes.filter(v=>v.ID_ZIMMERTYP === $route.params.roomtype)[0].BESCHREIBUNG}} Reservierung</h1>

            </v-card>
        </div>
        <v-container>
            <v-row>
                <v-col cols="5">
                    <h3>Nach freien Räumen filtern</h3>
                    <p>Geben Sie bitte ihren Buchungszeitraum an, um nach freien Räumen zu filtern.</p>
                    <v-date-picker @change="getBlockedRooms" v-model="timespan" range></v-date-picker>
                </v-col>
                <v-col>
                    <v-col v-for="zimmer in (filteredview ? rooms.filter(v => this.blockedRooms.includes(v.RAUMNUMMER)) : rooms)" :key="zimmer.RAUM_ID">
                        <v-card class="zimmercard">
                            <v-row>
                                <div>
                                    <v-img width="300" v-if="zimmer && zimmer.BILD" :src="'data:image/png;base64,'+zimmer.BILD"></v-img>
                                    <v-img width="300" v-if="roomtypes && !zimmer.BILD" :src="'data:image/png;base64,'+roomtypes.filter(v=>v.ID_ZIMMERTYP === zimmer.ID_ZIMMERTYP)[0].BILD"></v-img>
                                </div>
                                <v-col>
                                    <p class="title">Zimmer <span>{{zimmer.RAUMNUMMER}}</span></p>
                                    <div class="mb-1 subtitle-1 black--text">
                                        Fläche: {{zimmer.GROESSE}}m² <v-icon>mdi-tape-measure</v-icon><br>
                                    </div>

                                    <div>{{zimmer.BESCHREIBUNG}}</div>
                                    <div  v-if="zimmer.INVENTAR">
                                        <v-divider class="mx-4"></v-divider>
                                        <span class="subtitle-2">Besondere Ausstattung:</span><br>
                                        {{zimmer.INVENTAR}}
                                    </div>
                                    <v-divider></v-divider>

                                    <router-link
                                            :to="'/booking/'+zimmer.RAUMNUMMER"
                                            tag="div">
                                        <v-btn @click="selectedRoom = zimmer; dialog = true" color="secondary" class="title align-self-end regular text-none">
                                            {{parseFloat(zimmer.CALCPREIS).toFixed(2)}}€ / Nacht
                                        </v-btn>
                                    </router-link>
                                </v-col>
                                <v-col cols="2" class="align-content-end">
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-col>

            </v-row>
        </v-container>
    </v-content>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "roomList",
        data: () => {
            return {
                roomtypes: null,
                blockedRooms: [],
                timespan: [],
                rooms: [],
                filteredview: false,

            }
        },
        mounted() {
            axios
                .get('http://hssapi.y4gn1.de/roomtypes')
                .then(response => {
                    this.roomtypes = response.data;
                });
            axios
                .get('http://hssapi.y4gn1.de/rooms')
                .then(response => {
                    this.rooms = response.data.filter(v => v.ID_ZIMMERTYP === this.$route.params.roomtype);
                });
        },
        methods:{
            getBlockedRooms(){
                const result = [];
                if(this.timespan[0] && this.timespan[1]){
                    axios.post('http://hssapi.y4gn1.de/rooms/free', {
                        zimmertyp: this.$route.params.roomtype,
                        start: this.timespan[0],
                        ende: this.timespan[1]
                    })
                        .then(response => {
                            response.data.map(v => {
                                result.push(v.RAUMNUMMER);
                            })
                            this.blockedRooms = result;
                            this.filteredview = true;
                        })
                        .catch(function () {
                        });

                }
            }
        }
    }
</script>

<style scoped>


</style>
