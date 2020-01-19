<template>
    <v-content class="pa-0">
        <v-parallax
                src="../assets/quitandinha-palace.jpg"
                height="600"
        >
            <div class="my-10" style="position:absolute">
                <p class="font-weight-thin ma-0" style="font-size: 1.5vw;">
                    Aktuell ein Zimmer schon ab
                </p>
                <span style="font-size: 5vw" class="font-weight-regular">➡{{preis}}€</span><span class="display-1"> / Nacht</span>
            </div>
            <v-row
                    align="center"
                    justify="center"
                    style="background: rgba(0,0,0,0.7);margin-left: -16px; margin-right: -16px"
            >
                <v-col class="text-center" cols="4">
                    <img
                            src="../assets/logo.png"
                            max-width="200"
                    />
                    <h1 class="display-3 font-weight-thin">Hotel Sonnenschwein</h1>
                    <v-rating
                            v-model="rating"
                            color="yellow darken-3"
                            background-color="grey darken-1"
                            :readonly="true"
                    ></v-rating>
                    <br>
                    <hr>
                    <br>
                    <h4 class="display-1 subheading">
                        Fühl dich wie daheim!
                    </h4>
                    <h3 class="font-weight-thin">
                        Luxus und Komfort,
                        Events und Tagungsort
                    </h3>
                </v-col>
            </v-row>
        </v-parallax>
        <div style="background-color: #ffc107">
        <v-row class="text-center justify-center pa-12">
            <v-col><v-card elevation="9" class="py-9">
                <v-icon size="70px" color="primary">mdi-door</v-icon>
                <p class="display-1">
                    <span class="font-weight-bold"> {{roomcount}}</span> Zimmer<br>
                </p>
            </v-card></v-col>
            <v-col>
            <v-card elevation="9" class="py-9">
                <v-icon size="70px" color="primary">mdi-presentation</v-icon>
                <p class="display-1"><span class="font-weight-bold"> {{tagungsraumcount}}</span> Tagungsräume<br>
                </p>
            </v-card></v-col>
            <v-col>
            <v-card elevation="9" class="py-9">
                <v-icon size="70px" color="primary">mdi-party-popper</v-icon>
                <p class="display-1"><span class="font-weight-bold"> {{festsaalcount}}</span> Festsäle<br>
                </p>
            </v-card></v-col>
            <v-col>
                <v-card elevation="9" class="py-9">
                    <v-icon size="70px" color="primary">mdi-run-fast</v-icon>
                    <p class="display-1"><span class="font-weight-bold"> {{fitnesscount}}</span> Fitnessstudios<br>
                    </p>
                </v-card></v-col>
            <v-col>
                <v-card elevation="9" class="py-9">
                    <v-icon size="70px" color="primary">mdi-swim</v-icon>
                    <p class="display-1"><span class="font-weight-bold"> {{schwimmbadcount}}</span> Schwimmbäder<br>
                    </p>
                </v-card></v-col>
        </v-row></div>
        <v-parallax
                src="../assets/room.jpg"
                height="800"
        >
            <v-row
                    align="center"
                    justify="center"
                    style="background: rgba(0,0,0,0.6);margin-left: -16px; margin-right: -16px"
            >
                <v-col class="text-center" cols="4">
                    <div class="ma-10">
                        <p class="display-3 font-weight-thin">
                            5 Sterne Hotel
                        </p>
                        <v-rating
                                v-model="rating"
                                color="yellow darken-3"
                                background-color="grey darken-1"
                                empty-icon="$ratingFull"
                                :readonly="true"
                        ></v-rating>
                    </div>
                    <hr>
                    <div class="ma-10">
                        <v-icon size="150px" color="white">mdi-emoticon-happy-outline</v-icon>
                        <p class="display-3 font-weight-thin">
                            Zufriedene Kunden: {{kundencount}} (Alle)
                        </p>
                    </div>
                </v-col>
            </v-row>
        </v-parallax>
    </v-content>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'Landingpage',

        data: () => ({
            rating: 5,
            preis: 0,
            roomcount: 0,
            tagungsraumcount: 0,
            festsaalcount: 0,
            fitnesscount: 0,
            schwimmbadcount: 0,
            kundencount: 0,
            stats:null,
            loading:false
        }),
        mounted(){
            this.loading = true;
            axios
                .get('http://hssapi.y4gn1.de/stats')
                .then(response => {
                    this.loading = false;
                    this.stats = response.data;
                    this.kundencount = response.data[0].ANZ_KUNDEN;
                    const preis = response.data[0].gPreis;
                    this.preis = parseFloat(preis).toFixed(2);
                    this.stats.forEach(element => {
                        switch (element.RAUMTYP) {
                            case 'festsaal':
                                this.festsaalcount = element.ANZ_RAUMTYP;
                                break;
                            case 'tagungsraum':
                                this.tagungsraumcount = element.ANZ_RAUMTYP;
                                break;
                            case 'fitnessstudio':
                                this.fitnesscount = element.ANZ_RAUMTYP;
                                break;
                            case 'schwimmbad':
                                this.schwimmbadcount = element.ANZ_RAUMTYP;
                                break;
                            case 'zimmer':
                                this.roomcount = element.ANZ_RAUMTYP;
                                break;
                            default:
                                break;
                        }
                    });
                })
        }
    };
</script>
<style>

</style>
