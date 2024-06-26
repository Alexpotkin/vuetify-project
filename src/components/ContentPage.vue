<template>
  <div>
    <component :is="menuComponents[selectedMenuItemContent]" />
  </div>
</template>

<script>
import LayoutDashboard from "@/components/LayoutDashboard.vue";
import LayoutDevice from "@/components/LayoutDevice.vue";
import LayoutEvent from "@/components/LayoutEvent.vue";
import LayoutSettings from "@/components/LayoutSettings.vue";

export default {
  props: {
    selectedMenuItemContent: String,
  },
  components: {
    LayoutDashboard,
    LayoutEvent,
    LayoutDevice,
    LayoutSettings,
  },
  computed: {
    menuComponents() {
      return {
        dashboard: LayoutDashboard,
        event: LayoutEvent,
        device: LayoutDevice,
        settings: LayoutSettings,
      };
    },
  },
};
</script>
