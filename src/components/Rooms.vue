<template>
    <v-content class="pa-0">
        <div class="text-center">
            <v-card
                    dark
                    class="secondary"
                    background-color="deep-purple accent-4">
                <h1 class="pa-3 display-3 font-weight-thin ">Örtlichkeiten buchen</h1>
                <v-tabs
                        v-model="tab"
                        centered
                        dark
                        icons-and-text
                >
                    <v-tabs-slider></v-tabs-slider>

                    <v-tab href="#tab-1">
                        Zimmer
                        <v-icon>mdi-door</v-icon>
                    </v-tab>

                    <v-tab href="#tab-2">
                        Tagungsräume
                        <v-icon>mdi-presentation</v-icon>
                    </v-tab>

                    <v-tab href="#tab-3">
                        Festsäle
                        <v-icon>mdi-party-popper</v-icon>
                    </v-tab>
                    <v-tab href="#tab-4">
                        Fitnessstudios
                        <v-icon>mdi-run-fast</v-icon>
                    </v-tab>
                    <v-tab href="#tab-5">
                        Schwimmbäder
                        <v-icon>mdi-swim</v-icon>
                    </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                    <v-tab-item
                            v-for="i in 5"
                            :key="i"
                            :value="'tab-' + i"
                    >
                        <v-card flat>
                            <v-card-text v-if="i == 1">
                                <Booking></Booking>
                            </v-card-text>
                            <v-card-text v-if="i == 2">
                                <v-row>
                                    <v-card v-for="j in tagungsräume" :key="j.RAUMNUMMER"
                                            :loading="loading"
                                            class="mx-auto my-12"
                                            max-width="374"
                                    >
                                        <v-img
                                                height="250"
                                                src="../assets/tagungsraum.jpg"
                                        ></v-img>

                                        <v-card-title>Tagungsraum</v-card-title>

                                        <v-card-text>
                                            <p><v-icon>mdi-door</v-icon>RaumNr: <span>{{j.RAUMNUMMER}}</span></p>
                                            <div class="mb-1 subtitle-1 black--text">
                                                Fläche: {{j.GROESSE}}m² <v-icon>mdi-tape-measure</v-icon><br>
                                                Max. {{j.TR_KAPAZITAET}} Personen <v-icon>mdi-account</v-icon>
                                            </div>

                                            <div>{{j.BESCHREIBUNG}}</div>
                                        </v-card-text>

                                        <v-divider class="mx-4"></v-divider>
                                        <span class="subtitle-2">Ausstattung:</span><br>
                                        {{j.INVENTAR}}
                                        <v-divider class="mx-4"></v-divider>

                                        <v-card-actions>
                                            <router-link
                                                    :to="'/booking/'+j.RAUMNUMMER"
                                                    tag="span"
                                            >
                                            <v-btn
                                                    color="secondary"
                                                    
                                            >
                                                Reservieren
                                            </v-btn>
                                            </router-link>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-card>
                                </v-row>
                            </v-card-text>
                            <v-card-text v-if="i == 3">
                                <v-row>
                                    <v-card v-for="j in festsäle" :key="j.RAUMNUMMER"
                                            :loading="loading"
                                            class="mx-auto my-12"
                                            max-width="374"
                                    >
                                        <v-img
                                                height="250"
                                                src="../assets/festsaal.jpg"
                                        ></v-img>

                                        <v-card-title>Festsaal</v-card-title>

                                        <v-card-text>
                                            <p><v-icon>mdi-door</v-icon>RaumNr: <span>{{j.RAUMNUMMER}}</span></p>
                                            <div class="mb-1 subtitle-1 black--text">
                                                Fläche: {{j.GROESSE}}m² <v-icon>mdi-tape-measure</v-icon>
                                            </div>

                                            <div>{{j.BESCHREIBUNG}}</div>
                                        </v-card-text>

                                        <v-divider class="mx-4"></v-divider>
                                        <span class="subtitle-2">Ausstattung:</span><br>
                                        {{j.INVENTAR}}
                                        <v-divider class="mx-4"></v-divider>

                                        <v-card-actions>
                                            <router-link
                                                    :to="'/booking/'+j.RAUMNUMMER"
                                                    tag="span"
                                            >
                                                <v-btn
                                                        color="secondary"

                                                >
                                                    Reservieren
                                                </v-btn>
                                            </router-link>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-card>
                                </v-row>
                            </v-card-text>
                            <v-card-text v-if="i == 4">
                                <v-row>
                                    <v-card v-for="j in fitnessstudios" :key="j.RAUMNUMMER"
                                            :loading="loading"
                                            class="mx-auto my-12"
                                            max-width="374"
                                    >
                                        <v-img
                                                height="250"
                                                src="../assets/gym.jpg"
                                        ></v-img>

                                        <v-card-title>Fitnesstudio</v-card-title>

                                        <v-card-text>
                                            <p><v-icon>mdi-door</v-icon>RaumNr: <span>{{j.RAUMNUMMER}}</span></p>
                                            <div class="mb-1 subtitle-1 black--text">
                                                Fläche: {{j.GROESSE}}m² <v-icon>mdi-tape-measure</v-icon>
                                            </div>

                                            <div>{{j.BESCHREIBUNG}}</div>
                                        </v-card-text>

                                        <v-divider class="mx-4"></v-divider>
                                        <span class="subtitle-2">Ausstattung:</span><br>
                                        {{j.INVENTAR}}
                                        <v-divider class="mx-4"></v-divider>

                                        <v-card-title><v-icon>mdi-clock</v-icon><span class="ml-3">24h am Tag geöffnet</span></v-card-title>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-card>
                                </v-row>
                            </v-card-text>
                            <v-card-text v-if="i == 5">
                                <v-row>
                                    <v-card v-for="j in schwimmbäder" :key="j.RAUMNUMMER"
                                            :loading="loading"
                                            class="mx-auto my-12"
                                            max-width="374"
                                    >
                                        <v-img
                                                height="250"
                                                src="../assets/swimmingpool1.jpg"
                                        ></v-img>

                                        <v-card-title>Schwimmbad</v-card-title>

                                        <v-card-text>
                                            <p><v-icon>mdi-door</v-icon>RaumNr: <span>{{j.RAUMNUMMER}}</span></p>
                                            <div class="mb-1 subtitle-1 black--text">
                                                Fläche: {{j.GROESSE}}m² <v-icon>mdi-tape-measure</v-icon>
                                            </div>

                                            <div>{{j.BESCHREIBUNG}}</div>
                                        </v-card-text>

                                        <v-divider class="mx-4"></v-divider>
                                        <span class="subtitle-2">Besondere Ausstattung:</span><br>
                                        {{j.INVENTAR}}
                                        <v-divider class="mx-4"></v-divider>

                                        <v-card-title><v-icon>mdi-clock</v-icon><span class="ml-3">24h am Tag geöffnet</span></v-card-title>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-card>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </div>
    </v-content>

</template>

<script>
    import Booking from "@/components/Booking";
    import axios from 'axios';
    export default {
        name: "Rooms",
        components: {Booking},
        data: () => {
            return {
                tab: null,
                rooms: null,
                loading: false,
                tagungsräume: [],
                festsäle: [],
                fitnessstudios: [],
                schwimmbäder: [],
            }
        },
        mounted () {
            this.loading = true;
            axios
                .get('http://hssapi.y4gn1.de/rooms')
                .then(response => {
                    this.rooms = response.data;
                    if(this.rooms){
                    this.tagungsräume = this.rooms.filter((v) => v.RAUMTYP === 'tagungsraum');
                    this.festsäle = this.rooms.filter((v) => v.RAUMTYP === 'festsaal');
                    this.fitnessstudios = this.rooms.filter((v) => v.RAUMTYP === 'fitnessstudio');
                    this.schwimmbäder = this.rooms.filter((v) => v.RAUMTYP === 'schwimmbad');
                    }
                    this.loading = false;
                })
        },
    methods: {
    }

    }
</script>

<style scoped>

</style>
