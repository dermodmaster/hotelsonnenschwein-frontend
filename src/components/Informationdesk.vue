<template>
    <v-content class="pa-0">
        <div class="text-center">
            <v-card
                    dark
                    class="secondary"
                    background-color="deep-purple accent-4">
                <h1 class="pa-3 display-3 font-weight-thin ">Auskunft</h1>
                <h3>Um eine Auskunft zu erhalten, geb bitte hier deine E-Mail Adresse ein:</h3>
                <v-row class="justify-center">
                    <v-col style="max-width: 400px">
                        <v-form>
                            <v-text-field class="text-center"></v-text-field>
                            <v-btn>Daten abfragen</v-btn>
                        </v-form>
                    </v-col>
                </v-row>
            </v-card>
        </div>
        <div class="text-center">
            <v-card
                    dark
                    class="secondary"
                    background-color="deep-purple accent-4">
                <h1 class="pa-3 display-3 font-weight-thin ">Gebuchte Events</h1>
            </v-card>
        </div>
        <div class="text-center">
            <v-card
                    dark
                    class="secondary"
                    background-color="deep-purple accent-4">
                <h1 class="pa-3 display-3 font-weight-thin ">Gebuchte Räume</h1>
            </v-card>
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
                loading: false
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
        }
    }
</script>

<style scoped>

</style>
