<template>
  <v-switch
    v-model="model"
    :label="`Switch: ${model}`"
    false-value="no"
    true-value="yes"
    hide-details
  ></v-switch>
</template>

<script>
export default {
  name: "LayoutSettings",
  data: () => ({
    model: "no",
  }),
};
</script>
