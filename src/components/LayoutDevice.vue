<template>
  <v-app>
    <div class="ml-5 mt-5 text-left">
      <RegistrationModal ref="registrationModal" />
      <h2>Address Book</h2>
      <v-divider class="border-opacity-100 mt-1" color="success"></v-divider>
      <div class="d-flex align-center">
        <v-btn
          @click="openRegistrationModal"
          icon
          class="mr-2"
          style="width: 32px; height: 32px"
        >
          <v-icon style="font-size: 16px">mdi-plus</v-icon>
        </v-btn>
        <v-btn
          @click="openRegistrationModal"
          icon
          class="mr-2"
          style="width: 32px; height: 32px"
        >
          <v-icon style="font-size: 16px">mdi-plus</v-icon>
        </v-btn>
        <v-btn
          @click="openRegistrationModal"
          icon
          class="mr-2"
          style="width: 32px; height: 32px"
        >
          <v-icon style="font-size: 16px">mdi-plus</v-icon>
        </v-btn>
        <v-btn
          @click="openRegistrationModal"
          icon
          class="mr-2"
          style="width: 32px; height: 32px"
        >
          <v-icon style="font-size: 16px">mdi-plus</v-icon>
        </v-btn>
        <v-btn
          @click="openRegistrationModal"
          icon
          class="mr-2"
          style="width: 32px; height: 32px"
        >
          <v-icon style="font-size: 16px">mdi-plus</v-icon>
        </v-btn>
        <v-switch
          ref="activeOnlySwitch"
          v-model="activeOnlySwitch"
          color="primary"
          label="Active only"
          hide-details
          @change="fetchContacts"
        ></v-switch>
        <v-switch
          ref="inactiveOnlySwitch"
          v-model="inactiveOnlySwitch"
          color="primary"
          label="Inactive only"
          hide-details
          @change="fetchContacts"
        ></v-switch>
      </div>

      <v-row>
        <v-col cols="2">
          <v-card class="mx-left mt-0">
            <v-sheet>
              <v-text-field
                v-model="search"
                clear-icon="mdi-close-circle-outline"
                label="Search Company Directory"
                clearable
                dark
                flat
                hide-details
                solo-inverted
              ></v-text-field>
              <v-checkbox
                v-model="caseSensitive"
                label="Case sensitive search"
                dark
                hide-details
              ></v-checkbox>
            </v-sheet>
            <v-card-text class="pa-0">
              <v-treeview
                v-model="tree"
                :search
                :open="open"
                :items="items"
                activatable
                compact
                item-key="name"
                open-on-click
                @update:active="handleTreeViewClick"
                @click:select="handleTreeViewClick"
              >
                <template v-slot:prepend="{ item, open }">
                  <v-icon
                    v-if="item.children"
                    :icon="'mdi-home-variant'"
                  ></v-icon>
                  <v-icon v-else :icon="'mdi-laptop'"></v-icon>
                </template>
              </v-treeview>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="9">
          <ClientCard />
        </v-col>
      </v-row>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import { VTreeview } from "vuetify/labs/VTreeview";
import ClientCard from "../components/UI/ClientCard.vue";
import RegistrationModal from "../components/UI/RegistrationModal.vue";

export default {
  data() {
    return {
      dialog: false,
      contacts: [],
      items: [],
      open: [1, 2],
      search: null,
      caseSensitive: false,
      selectedTreeNode: null,
    };
  },
  created() {
    this.fetchContacts();
  },
  components: {
    RegistrationModal,
    VTreeview,
    ClientCard,
  },
  methods: {
    openRegistrationModal() {
      this.$refs.registrationModal.openModal();
    },

    handleTreeViewClick(SelectItemKey) {
      const clickedItemId = SelectItemKey; // Получаем ID кликнутого элемента
      console.error(clickedItemId);
      const selectedGroup = this.items.find((group) =>
        group.children.some((item) => item.id === clickedItemId)
      );

      if (selectedGroup) {
        const selectedItem = selectedGroup.children.find(
          (item) => item.id === clickedItemId
        );
        const selectedTitle = selectedItem.title;
        const selectedGroupTitle = selectedGroup.title;

        console.log("Заголовок дочернего элемента:", selectedTitle);
        console.log("Группа родителя:", selectedGroupTitle);
      } else {
        console.error("Элемент не найден в массиве данных");
      }
    },

    fetchContacts() {
      let parameter = "all";
      if (this.$refs.activeOnlySwitch && this.$refs.activeOnlySwitch.isActive) {
        parameter = "active";
        if (this.$refs.inactiveOnlySwitch) {
          this.$refs.inactiveOnlySwitch.isActive = false;
        }
      } else if (
        this.$refs.inactiveOnlySwitch &&
        this.$refs.inactiveOnlySwitch.isActive
      ) {
        parameter = "inactive";
        if (this.$refs.activeOnlySwitch) {
          this.$refs.activeOnlySwitch.isActive = false;
        }
      }

      axios
        .post("http://crm.kassa-plus.ru:50000/listclientnames", {
          param: parameter,
        })
        .then((response) => {
          if (response.data.status === "Ok") {
            this.items = this.transformData(response.data.message);
          } else {
            console.error(
              "Ошибка при получении контактов:",
              response.data.message
            );
          }
        })
        .catch((error) => {
          console.error("Ошибка при получении контактов:", error);
        });
    },

    transformData(data) {
      const structuredData = [];
      let parentId = 1;
      const groups = {};

      data.forEach((item) => {
        if (!("group" in item) || !("_id" in item) || !("name" in item)) {
          console.error("Отсутствуют необходимые свойства в элементе:", item);
          return;
        }

        if (!(item.group in groups)) {
          groups[item.group] = {
            id: parentId,
            title: item.group,
            children: [],
          };
          parentId++;
        }

        const childId = item._id; // Используем _id в качестве ID дочернего элемента
        groups[item.group].children.push({
          id: childId,
          title: item.name,
        });
      });

      structuredData.push(...Object.values(groups));
      console.log("Преобразованные данные:", structuredData);
      return structuredData;
    },
  },
  computed: {
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].includes(search)
        : (item, search, textKey) =>
            item[textKey].toLowerCase().includes(search.toLowerCase());
    },
  },
};
</script>
