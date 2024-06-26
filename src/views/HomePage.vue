<template>
  <v-app>
    <v-main style="height: 100vh">
      <v-container>
        <v-row style="height: 100%">
          <v-col
            cols="12"
            md="2"
            style="
              position: fixed;
              top: 0;
              left: 0;
              bottom: 0;
              overflow-y: hidden;
            "
          >
            <v-sheet min-height="300px" style="height: 100vh">
              <LayoutMenu @menuItemSelected="handleMenuItemSelected" />
            </v-sheet>
          </v-col>
          <v-col
            cols="12"
            md="10"
            style="height: 100vh; margin-left: 200px; width: 100vh"
          >
            <v-sheet min-height="90vh" style="height: 100%">
              <content>
                <ContentPage :selectedMenuItemContent="menuItemSelected" />
              </content>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ContentPage from "@/components/ContentPage.vue";
import LayoutMenu from "@/components/LayoutMenu.vue";
export default {
  components: {
    LayoutMenu,
    ContentPage,
  },
  methods: {
    handleMenuItemSelected(selectedItem) {
      this.menuItemSelected = selectedItem;
    },
  },
  data() {
    return {
      menuItemSelected: "dashboard",
    };
  },
};
</script>
