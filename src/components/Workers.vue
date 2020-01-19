<template>
    <v-content class="pa-0">
        <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <div class="text-center">
            <v-card
                    dark
                    class="secondary"
                    background-color="deep-purple accent-4">
                <h1 class="pa-3 display-3 font-weight-thin ">Mitarbeiter</h1>
            </v-card>
        </div>
        <div class="text-center">
        <h1 v-if="workers.length === 0">Keine Mitarbeiter gefunden...</h1>
        </div>
        <v-row v-if="workers.length !==0">
            <v-col v-for="arbeiter in workers" :key="arbeiter.ID_MITARBEITER" cols="3">
                <v-card>
                    <v-card-title>{{arbeiter.MITARBEITER_VORNAME + " " + arbeiter.MITARBEITER_NAME}}</v-card-title>
                    <v-card-subtitle>{{arbeiter.JOB_BEZEICHNUNG}}</v-card-subtitle>
                    <v-card-text>
                        <v-chip v-if="arbeiter.ID_CHEF">Chef: {{arbeiter.CHEF_VORNAME  + " " + arbeiter.CHEF_NAME}}</v-chip>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-content>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Workers",
        data: () => {
            return {
                workers: [],
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
