<template>
    <v-content class="pa-0">
        <div class="text-center">
            <v-card
                    dark
                    class="secondary"
                    background-color="deep-purple accent-4">
                <h1 class="pa-3 display-3 font-weight-thin ">Einchecken</h1>
            </v-card>
        </div>
        <div>
            <v-row class="justify-center text-center">
                    <v-col>
                        <router-link
                                to="/booking"
                                tag="div">
                        <v-card class="pa-10" style="">
                        <v-icon size="100px">mdi-account-badge</v-icon>
                        <h3 class="display-2">Ich bin bereits Kunde</h3>
                        </v-card>
                        </router-link>
                    </v-col>
                <v-col>
                    <router-link
                            to="/createCustomer"
                            tag="div">
                    <v-card class="pa-10">
                    <v-icon size="100px">mdi-account-star</v-icon>
                    <h3 class="display-2">Ich bin Neukunde</h3>
                    </v-card>
                    </router-link>
                </v-col>
            </v-row>
        </div>
    </v-content>
</template>

<script>
    export default {
        name: "Checkin",
        data () {
            return {
                tab: null,
            }
        },
    }
</script>

<style scoped>

</style>
