<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <h2><v-icon>mdi-hotel</v-icon> Hotel Sonnenschwein</h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        target="_blank"
        text
      >
        <span class="mr-2">Einchecken</span>
        <v-icon>mdi-run</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <Landingpage/>
    </v-content>
  </v-app>
</template>

<script>
import Landingpage from './components/Landingpage';

export default {
  name: 'App',

  components: {
    Landingpage,
  },

  data: () => ({
    //
  }),
};
</script>
