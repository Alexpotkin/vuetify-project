<template>
  <v-card class="mx-auto" max-width="3600">
    <v-card-item title="$group">
      <p class="text-h4 font-weight-black">Парашютная</p>
      <template v-slot:subtitle>
        <v-icon
          class="me-1 pb-1"
          color="error"
          icon="mdi-alert"
          size="18"
        ></v-icon>

        Внимание, есть предупреждения!
      </template>
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col class="text-h2" cols="6"> 99% </v-col>

        <v-col class="text-right" cols="6">
          <v-icon color="error" icon="mdi-alert-octagon" size="100"></v-icon>
        </v-col>
      </v-row>
    </v-card-text>

    <div class="d-flex py-3 justify-space-between">
      <v-list-item density="compact" prepend-icon="mdi-alert-octagon">
        <v-list-item-subtitle
          >5 ошибок за последние 60 мин.</v-list-item-subtitle
        >
      </v-list-item>

      <v-list-item density="compact" prepend-icon="mdi-alert">
        <v-list-item-subtitle>5 предупреждения</v-list-item-subtitle>
      </v-list-item>
    </div>

    <v-expand-transition>
      <div v-if="expand">
        <div class="py-2">
          <v-slider
            v-model="time"
            :max="6"
            :step="1"
            :ticks="labels"
            class="mx-4"
            color="primary"
            density="compact"
            show-ticks="always"
            thumb-size="10"
            hide-details
          ></v-slider>
        </div>

        <v-list class="bg-transparent">
          <v-list-item
            v-for="item in forecast"
            :key="item.day"
            :append-icon="item.icon"
            :subtitle="item.temp"
            :title="item.day"
          >
          </v-list-item>
        </v-list>
      </div>
    </v-expand-transition>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        :text="!expand ? 'Full Report' : 'Hide Report'"
        @click="expand = !expand"
      ></v-btn>
    </v-card-actions>
  </v-card>
  <v-card>
    <v-timeline align="start" side="end">
      <v-timeline-item
        v-for="(event, index) in timelineEvents"
        :key="index"
        :dot-color="event.dotColor"
        size="small"
      >
        <div class="d-flex">
          <strong class="me-4">{{ event.time }}</strong>
          <div>
            <strong>{{ event.title }}</strong>
            <div class="text-caption">{{ event.description }}</div>
          </div>
        </div>
      </v-timeline-item>
    </v-timeline>
  </v-card>
</template>

<script>
export default {
  name: "ClientCard",
  data: () => ({
    labels: {
      0: "ПН",
      1: "ВТ",
      2: "СР",
      3: "ЧТ",
      4: "ПТ",
      5: "СБ",
      6: "ВС",
    },
    expand: false,
    time: 0,
    forecast: [
      {
        day: "Сегодня",
        icon: "mdi-check-circle",
        temp: "0/0",
      },
      {
        day: "Вчера",
        icon: "mdi-alert-circle",
        temp: "0/1",
      },
      { day: "Позавчера", icon: "mdi-alert-octagon", temp: "10/0" },
    ],
    timelineEvents: [
      {
        time: "16:40:01",
        title: "Text",
        description: "Mobile App",
        dotColor: "pink",
      },
      {
        time: "3-4pm",
        title: "Design Stand Up",
        description: "Hangouts",
        dotColor: "teal-lighten-3",
      },
      { time: "12pm", title: "Lunch break", description: "", dotColor: "pink" },
      {
        time: "9-11am",
        title: "Finish Home Screen",
        description: "Web App",
        dotColor: "teal-lighten-3",
      },
    ],
  }),
};
</script>
