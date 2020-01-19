<template>

    <v-content class="pa-0">
        <div class="text-center">
            <v-card
                    dark
                    class="secondary"
                    background-color="deep-purple accent-4">
                <h1 class="pa-3 display-3 font-weight-thin ">Neukunden anlegen</h1>
            </v-card>
        </div>
        <v-container>
            <v-form v-model="valid">
                <v-container>
                        <v-col>
                            <v-text-field
                                    v-model="firstname"
                                    :rules="nameRules"
                                    :counter="50"
                                    label="Vorname"
                                    required
                            ></v-text-field>
                        </v-col>

                        <v-col>
                            <v-text-field
                                    v-model="lastname"
                                    :rules="nameRules"
                                    :counter="50"
                                    label="Nachname"
                                    required
                            ></v-text-field>
                        </v-col>

                    <v-col>
                        <v-text-field
                                v-model="email"
                                :rules="emailRules"
                                :counter="100"
                                label="E-mail"
                                required
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                                v-model="plz"
                                type="number"
                                :counter="5"
                                label="PLZ"
                                required
                        ></v-text-field>
                    </v-col>

                    <v-col>
                        <v-text-field
                                v-model="tel"
                                :counter="30"
                                label="Telefonnummer"
                                required
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                                v-model="iban"
                                :counter="34"
                                label="IBAN"
                                required
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                                v-model="bic"
                                :counter="11"
                                label="BIC"
                                required
                        ></v-text-field>
                    </v-col>
                        <v-col>
                            <v-btn color="secondary">
                                Registrieren
                            </v-btn>
                        </v-col>
                </v-container>
            </v-form>
        </v-container>
    </v-content>
</template>

<script>
    export default {
        name: "CreateCustomer",
        data: () => ({
            valid: false,
            firstname: '',
            lastname: '',
            nameRules: [
                v => !!v || 'Name wird benötigt',
                v => v.length <= 10 || 'Name darf nicht länger als 50 Zeichen sein',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail wird benötigt',
                v => /.+@.+/.test(v) || 'E-mail nicht korrekt',
            ],
            plz: null,
            tel: "",
            iban: "",
            bic: ""
        }),
    }
</script>

<style scoped>

</style>
