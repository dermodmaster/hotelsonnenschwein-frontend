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
                                    <v-card v-for="j in 6" :key="j"
                                            :loading="loading"
                                            class="mx-auto my-12"
                                            max-width="374"
                                    >
                                        <v-img
                                                height="250"
                                                src="../assets/tagungsraum.jpg"
                                        ></v-img>

                                        <v-card-title>Tagungsraum #X</v-card-title>

                                        <v-card-text>
                                            <div class="my-4 subtitle-1 black--text">
                                                Kapazität: x Personen
                                            </div>

                                            <div>Beschreibung Beschreibung Beschreibung Beschreibung Beschreibung</div>
                                        </v-card-text>

                                        <v-divider class="mx-4"></v-divider>

                                        <v-card-title>Bestehende Reservierungen</v-card-title>

                                        <v-card-text>
                                                <v-chip class="accent mr-2">5:30Uhr - 7:30Uhr</v-chip>
                                                <v-chip class="accent mr-2">16:30Uhr - 17:30Uhr</v-chip>
                                        </v-card-text>

                                        <v-card-actions>
                                            <v-btn
                                                    color="secondary"
                                                    @click="reserve"
                                            >
                                                Reservieren
                                            </v-btn>
                                            <v-spacer></v-spacer>
                                            <v-chip color="success"><v-icon>mdi-check</v-icon>Aktuell Frei</v-chip>
                                        </v-card-actions>
                                    </v-card>
                                </v-row>
                            </v-card-text>
                            <v-card-text v-if="i == 3">
                                <v-row>
                                    <v-card v-for="j in 3" :key="j"
                                            :loading="loading"
                                            class="mx-auto my-12"
                                            max-width="374"
                                    >
                                        <v-img
                                                height="250"
                                                src="../assets/festsaal.jpg"
                                        ></v-img>

                                        <v-card-title>Festsaal #X</v-card-title>

                                        <v-card-text>
                                            <div class="my-4 subtitle-1 black--text">
                                                Kapazität: x Personen
                                            </div>

                                            <div>Beschreibung Beschreibung Beschreibung Beschreibung Beschreibung</div>
                                        </v-card-text>

                                        <v-divider class="mx-4"></v-divider>

                                        <v-card-title>Bestehende Reservierungen</v-card-title>

                                        <v-card-text>
                                                <v-chip class="accent mr-2">5:30Uhr - 7:30Uhr</v-chip>
                                                <v-chip class="accent mr-2">16:30Uhr - 17:30Uhr</v-chip>
                                        </v-card-text>

                                        <v-card-actions>
                                            <v-btn
                                                    color="secondary"
                                                    @click="reserve"
                                            >
                                                Reservieren
                                            </v-btn>
                                            <v-spacer></v-spacer>
                                            <v-chip color="success"><v-icon>mdi-check</v-icon>Aktuell Frei</v-chip>
                                        </v-card-actions>
                                    </v-card>
                                </v-row>
                            </v-card-text>
                            <v-card-text v-if="i == 4">
                                <v-row>
                                    <v-card v-for="j in 2" :key="j"
                                            :loading="loading"
                                            class="mx-auto my-12"
                                            max-width="374"
                                    >
                                        <v-img
                                                height="250"
                                                src="../assets/gym.jpg"
                                        ></v-img>

                                        <v-card-title>Fitnesstudio #X</v-card-title>

                                        <v-card-text>
                                            <div class="my-4 subtitle-1 black--text">
                                                Kapazität: x Personen
                                            </div>

                                            <div>Beschreibung Beschreibung Beschreibung Beschreibung Beschreibung</div>
                                        </v-card-text>

                                        <v-divider class="mx-4"></v-divider>

                                        <v-card-title><v-icon>mdi-clock</v-icon><span class="ml-3">24h am Tag geöffnet</span></v-card-title>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-chip color="success"><v-icon>mdi-check</v-icon>Aktuell Frei</v-chip>
                                        </v-card-actions>
                                    </v-card>
                                </v-row>
                            </v-card-text>
                            <v-card-text v-if="i == 5">
                                <v-row>
                                    <v-card v-for="j in 2" :key="j"
                                            :loading="loading"
                                            class="mx-auto my-12"
                                            max-width="374"
                                    >
                                        <v-img
                                                height="250"
                                                src="../assets/swimmingpool1.jpg"
                                        ></v-img>

                                        <v-card-title>Schwimmbad #X</v-card-title>

                                        <v-card-text>
                                            <div class="my-4 subtitle-1 black--text">
                                                Kapazität: x Personen
                                            </div>

                                            <div>Beschreibung Beschreibung Beschreibung Beschreibung Beschreibung</div>
                                        </v-card-text>

                                        <v-divider class="mx-4"></v-divider>

                                        <v-card-title><v-icon>mdi-clock</v-icon><span class="ml-3">24h am Tag geöffnet</span></v-card-title>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-chip color="success"><v-icon>mdi-check</v-icon>Aktuell Frei</v-chip>
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
    export default {
        name: "Rooms",
        components: {Booking},
        data () {
            return {
                tab: null,
            }
        },
    }
</script>

<style scoped>

</style>
