<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <router-link
              to="/"
              tag="span"
      >
      <v-btn class="d-flex align-center text-none" text>
        <h2><v-icon>mdi-hotel</v-icon> Hotel Sonnenschwein</h2>
      </v-btn>
      </router-link>

      <v-spacer></v-spacer>
      <router-link
              to="/"
              tag="span"
      >
        <v-btn
                target="_blank"
                color="secondary"
                class="ma-2"
        >
          <span class="mr-2">Startseite</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </router-link>
      <router-link
              to="/workers"
              tag="span"
      >
        <v-btn
                target="_blank"
                color="secondary"
                class="ma-2"
        >
          <span class="mr-2">Mitarbeiter</span>
          <v-icon>mdi-worker</v-icon>
        </v-btn>
      </router-link>
      <router-link
              to="/information"
              tag="span"
      >
        <v-btn
                target="_blank"
                color="secondary"
                class="ma-2"
        >
          <span class="mr-2">Auskunft</span>
          <v-icon>mdi-information-outline</v-icon>
        </v-btn>
      </router-link>
      <router-link
              to="/events"
              tag="span"
      >
        <v-btn
                target="_blank"
                color="secondary"
                class="ma-2"
        >
          <span class="mr-2">Events</span>
          <v-icon>mdi-party-popper</v-icon>
        </v-btn>
      </router-link>
      <router-link
              to="/rooms"
              tag="span"
      >
        <v-btn
                target="_blank"
                color="secondary"
                class="ma-2"
        >
          <span class="mr-2">Örtlichkeiten</span>
          <v-icon>mdi-door</v-icon>
        </v-btn>
      </router-link>
      <router-link
              to="/checkin"
              tag="span"
      >
        <v-btn
                class="ma-2"
                target="_blank"
                rounded
                color="accent"
        >
          <span class="mr-2">Einchecken</span>
          <v-icon>mdi-run</v-icon>
          <v-icon>mdi-arrow-right-thick</v-icon>
        </v-btn>
      </router-link>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>
