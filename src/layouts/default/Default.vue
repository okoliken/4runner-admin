<template>
  <v-app>
    <v-navigation-drawer color="#f9f9f9" permanent>
      <div class="d-flex align-center justify-center">
        <img
          style="object: cover"
          class="pt-3"
          src="../../assets/4runner.png"
          alt=""
          srcset=""
        />
      </div>
      <v-list class="mt-6 px-5">
        <v-list-item
          active-class="bg-active"
          to="/"
          rounded="5px"
          class="mb-6"
          link
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
        ></v-list-item>
        <v-list-item
          color="#1c1b20"
          rounded="5px"
          class="mb-6"
          link
          prepend-icon="mdi-account-box"
          title="Quotes"
        ></v-list-item>
        <v-list-item
          color="#1c1b20"
          rounded="5px"
          class="mb-6"
          link
          prepend-icon="mdi-gavel"
          title="Invoice"
        ></v-list-item>
        <v-list-item
          color="#1c1b20"
          rounded="5px"
          class="mb-6"
          link
          prepend-icon="mdi-album"
          title="Audit logs"
        ></v-list-item>
        <v-list-item
          color="#1c1b20"
          rounded="5px"
          class="mb-6"
          link
          prepend-icon="mdi-cog"
          title="Settings"
        ></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn @click="logout" size="large" class="text-capitalize" variant="text" block>
            <v-icon class="mr-4" icon="mdi-logout"></v-icon>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <default-bar />

    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
import {logOut} from '../../utils/routes'
import { apiService } from '../../plugins/axios'


import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";

const logout = async () => {

 try {
  await apiService.post(logOut)
 } catch (error) {
  console.log(error)
 }

  // 
}
</script>

<style scoped>
.bg-active {
  background-color: #1c1b20;
  color: #fff;
  border-radius: 8px;
}
</style>
