<template>
    <v-content class="pa-0">
        <div class="text-center">
            <v-card
                    dark
                    class="secondary"
                    background-color="deep-purple accent-4">
                <h1 class="pa-3 display-3 font-weight-thin ">Zimmer buchen</h1>
            </v-card>
        </div>
        <v-row>
            <v-col md="3" v-for="roomtype in roomtypes" :key="roomtype.ID_ZIMMERTYP">
                <v-card elevation="8">
                    <v-row>
                        <v-col>
                        <img style="width: 100%" :src="'data:image/png;base64,'+roomtype.BILD">
                        <v-col>
                            <v-row>
                                <v-col>
                                    <h1 class="display-3">{{roomtype.ZTYP_BESCHREIBUNG}}</h1>
                                    <hr class="my-6">
                                    <p class="title font-weight-regular">{{roomtype.EINRICHTUNG}}</p>
                                </v-col>
                            </v-row>
                            <v-row  class="align-end">
                                <v-col cols="6">
                                    <v-chip class="mb-8 pa-5 subtitle-1">
                                        <v-icon size="32px">{{roomtype.BETTEN > 1? 'mdi-bed-king' : 'mdi-bed-single'}}</v-icon><span class="ml-2"><b>{{roomtype.BETTEN}}</b> {{roomtype.BETTEN > 1 ? 'Schlafplätze' : 'Schlafplatz'}}</span>
                                    </v-chip>
                                    <router-link
                                            :to="'/rooms/'+roomtype.ID_ZIMMERTYP"
                                            tag="div">
                                    <v-btn color="secondary" block>Jetzt buchen</v-btn>
                                    </router-link>
                                </v-col>
                                <v-col class="text-center" cols="6">
                                    <p class="title font-weight-light">Aktuell<br><span class="display-2 font-weight-light">{{parseFloat(roomtype.Mindestpreis).toFixed(2)}}€</span><br>pro Nacht</p>
                                </v-col>
                            </v-row>
                        </v-col>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-content>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "Booking",
        data: () => {
            return {
                roomtypes: null
            }
        },
        mounted() {
            axios
                .get('http://hssapi.y4gn1.de/roomtypes/prices')
                .then(response => {
                    this.roomtypes = response.data;
                })
        }
    }
</script>

<style scoped>

</style>
