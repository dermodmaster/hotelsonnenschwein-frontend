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
            <v-col v-for="zimmer in rooms" :key="zimmer.RAUM_ID">
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
                rooms: [],

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

        }
    }
</script>

<style scoped>


</style>
