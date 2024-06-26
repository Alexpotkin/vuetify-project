<template>
  <v-layout style="height: 100%; width: 100%">
    <v-navigation-drawer location="left" permanent>
      <template v-slot:prepend>
        <v-list-item
          lines="two"
          prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
          subtitle="Logged in"
          title="Jane Smith"
        ></v-list-item>
      </template>

      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list density="compact" nav>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :to="`/${item.text.toLowerCase()}`"
            @click="handleMenuItem(item.text.toLowerCase())"
            :prepend-icon="item.icon"
          >
            <v-list-item-content>
              {{ item.text }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-list>
    </v-navigation-drawer>
    <v-main style="height: 300px"></v-main>
  </v-layout>
</template>

<script>
export default {
  name: "LayoutMenu",
  data() {
    return {
      items: [
        { icon: "mdi-view-dashboard-outline", text: "Dashboard" },
        { icon: "mdi-calendar-check", text: "Event" },
        { icon: "mdi-desktop-tower", text: "Device" },
        { icon: "mdi-cog-outline", text: "Settings" },
      ],
    };
  },
  methods: {
    handleMenuItem(selectedItem) {
      this.$emit("menuItemSelected", selectedItem);
    },
  },
};
</script>
