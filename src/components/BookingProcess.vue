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
                            v-if="room"
                    >
                        <v-img
                                height="250"
                                src="../assets/tagungsraum.jpg"
                        ></v-img>

                        <v-card-title>Tagungsraum</v-card-title>

                        <v-card-text>
                            <div class="mb-1 subtitle-1 black--text">
                                RaumNr: <span>{{room.RAUMNUMMER}}</span><v-icon>mdi-door</v-icon><br>
                                Fläche: {{room.GROESSE}}m² <v-icon>mdi-tape-measure</v-icon><br>
                                Max. {{room.TR_KAPAZITAET}} Personen <v-icon>mdi-account</v-icon>
                            </div>

                            <div>{{room.BESCHREIBUNG}}</div>
                        </v-card-text>

                        <v-divider class="mx-4"></v-divider>
                        <div class="ma-5">
                        <span class="subtitle-2">Ausstattung:</span><br>
                        {{room.INVENTAR}}
                        </div>
                        <v-divider class="mx-4"></v-divider>


                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-chip color="success"><v-icon>mdi-check</v-icon>Aktuell Frei</v-chip>
                        </v-card-actions>
                    </v-card>
            </v-col>
            <v-col v-if="room.RAUMTYP !== 'zimmer'">
                <v-card>
                    <v-form>
                        <v-row>
                            <v-col style="max-width: 300px">
                                <div class="ma-3">
                                    <v-text-field v-model="mail" label="E-Mail"></v-text-field>
                                    <p>Buchungsstart: {{picker}} {{time}}</p>
                                    <p>Buchungsende: {{picker2}} {{time2}}</p>
                                    <v-btn class="mr-4" color="secondary" @click="submit">Reservieren</v-btn>
                                </div>
                            </v-col>
                            <v-col>
                                    <v-row>
                                        <v-col>
                                            <h3>Buchungsstart</h3>
                                            <v-date-picker v-model="picker"></v-date-picker>
                                            <v-time-picker v-model="time" format="24hr"></v-time-picker>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <h3>Buchungsende</h3>
                                            <v-date-picker v-model="picker2"></v-date-picker>
                                            <v-time-picker v-model="time2" format="24hr"></v-time-picker>
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
                loading: false,
                titles: {tagungsraum: "Tagungsraum"},
                images: {tagungsraum: "tagungsraum.jpg"},
                mail: "",
                picker: null,
                picker2: null,
                time:null,
                time2:null
            }
        },
        mounted() {
            this.loading = true;
            axios
                .get('http://hssapi.y4gn1.de/rooms/' + this.$route.params.id)
                .then(response => {
                    this.loading = false;
                    this.room = response.data[0];
                })
        },
        methods: {
            submit(){
                alert("ok")
            }
        }
    }
</script>

<style scoped>

</style>
