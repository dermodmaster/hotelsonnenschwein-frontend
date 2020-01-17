<template>
  <v-content class="pa-0">
    <v-parallax
            src="../assets/quitandinha-palace.jpg"
    >
      <v-row
              align="center"
              justify="center"
              style="background: rgba(0,0,0,0.4);margin-left: -16px; margin-right: -16px"
      >
        <v-col class="text-center" cols="15">
          <img
                  src="../assets/logo.png"
                  max-width="200"
          />
          <h1 class="display-3 font-weight-thin mb-4">Hotel Sonnenschwein</h1>
          <h4 class="display-1 subheading">
            Fühl dich wie daheim!
          </h4>
          <h4 class="subheading">
            Luxus und Komfort,
            Events und Tagungsort
          </h4>
        </v-col>
      </v-row>
    </v-parallax>

  </v-content>
</template>

<script>
export default {
  name: 'Landingpage',

  data: () => ({
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader',
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify',
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify',
      },
    ],
    importantLinks: [
      {
        text: 'Documentation',
        href: 'https://vuetifyjs.com',
      },
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com',
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify',
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs',
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify',
      },
    ],
    whatsNext: [
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com/components/api-explorer',
      },
      {
        text: 'Select a layout',
        href: 'https://vuetifyjs.com/layout/pre-defined',
      },
      {
        text: 'Frequently Asked Questions',
        href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
      },
    ],
  }),
};
</script>
