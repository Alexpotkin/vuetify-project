<template>
  <v-row justify="center">
    <v-col cols="auto">
      <v-radio-group v-model="color" hide-details inline>
        <v-radio color="indigo" label="indigo" value="indigo"></v-radio>

        <v-radio
          color="indigo-darken-3"
          label="indigo-darken-3"
          value="indigo-darken-3"
        ></v-radio>

        <v-radio color="primary" label="primary" value="primary"></v-radio>

        <v-radio
          color="secondary"
          label="secondary"
          value="secondary"
        ></v-radio>
      </v-radio-group>
    </v-col>
    <v-container>
      <v-card>
        <v-card-title class="text-overline">
          Apptime
          <div class="text-green-darken-3 text-h3 font-weight-bold">99%</div>
          <div class="text-h6 text-medium-emphasis font-weight-regular">
            $155454 good events
          </div>
        </v-card-title>
        <br />
        <v-card-text>
          <div
            :style="`right: calc(${review} - 32px)`"
            class="position-absolute mt-n8 text-caption text-green-darken-3"
          >
            Stability marker point day
          </div>
          <v-progress-linear
            color="green-darken-2"
            height="55"
            model-value="90"
            rounded="lg"
          >
            <v-badge
              :style="`right: ${review}`"
              class="position-absolute"
              color="red"
              dot
              inline
            ></v-badge>
          </v-progress-linear>

          <div class="d-flex justify-space-between py-3">
            <span class="text-green-darken-3 font-weight-medium">
              Событий получено за все время
            </span>

            <span class="text-medium-emphasis"> 2938000 total event </span>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-list-item
          append-icon="mdi-chevron-right"
          lines="two"
          subtitle="Details and agreement"
          link
        ></v-list-item>
      </v-card>
    </v-container>
    <v-sparkline
      :auto-line-width="autoLineWidth"
      :fill="fill"
      :gradient="gradient"
      :gradient-direction="gradientDirection"
      :line-width="width"
      :model-value="value"
      :padding="padding"
      :smooth="radius || false"
      :stroke-linecap="lineCap"
      :type="type"
      auto-draw
    ></v-sparkline>
    <v-col v-for="(variant, i) in variants" :key="i" cols="12" md="6">
      <v-card :color="color" :variant="variant" class="mx-auto">
        <v-card-item>
          <div>
            <div class="text-overline mb-1">{{ variant }}</div>
            <div class="text-h6 mb-1">Headlinesss</div>
            <div class="text-caption">
              Greyhound divisely hello coldly fonwderfully
            </div>
          </div>
        </v-card-item>

        <v-card-actions>
          <v-btn> Button </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";

const variants = ["elevated", "flat", "tonal", "outlined"];
const color = ref("indigo");
</script>

<script>
const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];
export default {
  name: "LayoutDashboard",
  data: () => ({
    review: "5%",
    width: 2,
    radius: 10,
    padding: 8,
    lineCap: "round",
    gradient: gradients[5],
    value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    gradientDirection: "top",
    gradients,
    fill: false,
    type: "trend",
    autoLineWidth: false,
  }),
};
</script>
