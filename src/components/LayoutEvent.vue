<template>
  <v-app>
    <div class="ml-5 mt-5 text-left">
      <h2>Events</h2>
      <v-btn
        @click="refreshTable"
        color="gray"
        icon
        style="width: 32px; height: 32px"
      >
        <v-icon style="font-size: 16px">mdi-refresh</v-icon>
      </v-btn>
      <v-divider class="border-opacity-100 mt-4" color="success"></v-divider>
      <v-data-table
        :headers="$headers"
        :items="visibleEvents"
        disable-initial-sort
        hide-actions
        select-all
        items-per-page="-1"
      >
        <template v-slot:[`item.date`]="{ item }">
          {{ formatDateTime(item.date) }}
        </template>

        <template v-slot:[`item.warning`]="{ item }">
          <v-icon v-if="item.warning" color="red">mdi-alert-circle</v-icon>
          <v-icon v-else color="green">mdi-check-circle</v-icon>
        </template>

        <template v-slot:[`item.error`]="{ item }">
          <v-icon v-if="item.error" color="red">mdi-alert-octagon</v-icon>
          <v-icon v-else color="green">mdi-check-circle</v-icon>
        </template>
      </v-data-table>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      headers: "",
      events: [],
      visibleEvents: [],
      pageSize: 50,
      page: 1,
      isLoading: false,
    };
  },
  computed: {
    headers() {
      if (this.events.length > 0) {
        return Object.keys(this.events[0])
          .filter((key) => key !== "Number")
          .map((key) => {
            return { text: key, value: key };
          });
      }
      return [];
    },
  },
  methods: {
    formatDateTime(dateTimeString) {
      const date = new Date(dateTimeString);
      return date.toLocaleString();
    },
    fetchEvents() {
      this.isLoading = true;
      const requestData = {
        page: this.page,
        pagesize: this.pageSize,
        sort: -1,
      };
      axios
        .post("http://crm.kassa-plus.ru:50000/listevent", requestData)
        .then((response) => {
          if (this.page === 1) {
            this.events = response.data.message;
          } else {
            this.events = this.events.concat(response.data.message);
          }
          this.updateVisibleEvents();
        })
        .catch((error) => {
          console.error(
            "Error fetching product data:",
            error.response?.data,
            error.toJSON()
          );
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    updateVisibleEvents() {
      this.visibleEvents = this.events.map((event) => {
        return Object.keys(event).reduce((acc, key) => {
          const lowerCaseKey = key.toLowerCase();
          if (
            lowerCaseKey !== "__v" &&
            lowerCaseKey !== "number" &&
            lowerCaseKey !== "_id"
          ) {
            acc[key] = event[key];
          }
          return acc;
        }, {});
      });
    },
    refreshTable() {
      this.page = 1;
      this.events = [];
      this.visibleEvents = [];
      this.fetchEvents();
    },
    handleScroll() {
      const bottomOfWindow =
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight;
      if (bottomOfWindow && !this.isLoading) {
        this.page++;
        this.fetchEvents();
      }
    },
  },
  mounted() {
    this.fetchEvents();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
