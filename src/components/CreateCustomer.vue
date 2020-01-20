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
            <v-alert v-if="errtext" type="error">
                {{errtext}}
            </v-alert>
            <router-link
                    to="/booking"
                    tag="div">
            <v-alert v-if="success" type="success">
                Kunde erfolgreich registriert!
                <v-btn>Fortfahren</v-btn>
            </v-alert>
            </router-link>
            <v-form v-model="valid">
                <v-container>
                    <v-row>
                        <v-col cols="4">
                            <v-text-field
                                    v-model="firstname"
                                    :rules="nameRules"
                                    :counter="50"
                                    label="Vorname"
                                    required
                            ></v-text-field>
                        </v-col>

                    <v-col cols="4">
                        <v-text-field
                                v-model="lastname"
                                :rules="nameRules"
                                :counter="50"
                                label="Nachname"
                                required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="4">
                        <v-text-field
                                v-model="age"
                                :counter="3"
                                type="number"
                                label="Alter"
                                required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="4">
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

                    <v-col cols="4">
                        <v-text-field
                                v-model="street"
                                :counter="50"
                                label="Straße"
                                required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field
                                v-model="tel"
                                :counter="30"
                                label="Telefonnummer"
                                required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field
                                v-model="iban"
                                :counter="34"
                                label="IBAN"
                                required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field
                                v-model="bic"
                                :counter="11"
                                label="BIC"
                                required
                        ></v-text-field>
                    </v-col>
                        <v-col cols="12">
                            <v-btn @click="bookEvent" color="secondary">
                                Registrieren
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </v-container>
    </v-content>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "CreateCustomer",
        data: () => ({
            valid: false,
            firstname: '',
            lastname: '',
            age: null,
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
            street: "",
            tel: "",
            iban: "",
            bic: "",
            success: false,
            errtext:null
        }),
        methods: {
            bookEvent(){
                axios.post('http://hssapi.y4gn1.de/customer', {
                    email: this.email,
                    name: this.lastname,
                    vorname: this.firstname,
                    alter:parseInt(this.age),
                    strasse: this.street,
                    plz: this.plz,
                    telefon: this.tel,
                    iban: this.iban,
                    bic: this.bic,
                })
                    .then(response => {
                        this.success = false;
                        this.errtext = null;
                        window.console.log(response.data);
                        if(response.data[0] && response.data[0].Status) {
                            switch ((parseInt(response.data[0].Status))) {
                                case 0:
                                    this.success = true;
                                    break;
                                case 1:
                                    this.errtext = "Eine Angabe fehlt";
                                    break;
                                case 2:
                                    this.errtext = "Das Format der E-Mail ist ungültig.";
                                    break;
                                case 3:
                                    this.errtext = "Das Alter muss zwischen 18 und 200 liegen.";
                                    break;
                                case 4:
                                    this.errtext = "Die E-Mail ist bereits registriert.";
                                    break;
                                case 5:
                                    this.errtext = "Die PLZ ist nicht bekannt.";
                                    break;
                                case 6:
                                    this.errtext = "Der Kunde existiert bereits";
                                    break;
                                case 7:
                                    this.errtext = "Die IBAN ist bereits registriert.";
                                    break;
                                default:
                                    break;
                            }
                        }
                    })
                    .catch(function () {
                    });
            }
        }
    }
</script>

<style scoped>

</style>
