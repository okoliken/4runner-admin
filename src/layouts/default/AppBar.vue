<template>
  <v-app-bar class="pa-2" flat>
    <div  class="w-100 pa-2 d-flex align-center justify-space-between mt-1">
     <!-- <h2>12th June 2023</h2> -->
    
    <v-spacer></v-spacer>
   <div class="d-flex align-center justify-end">
      <v-avatar class="mr-4" size="x-large">
        <v-img
          :src="admin_details.image !== '' ? admin_details.image : 'https://cdn.vuetifyjs.com/images/john.jpg'"
          alt="John"
        ></v-img>
      </v-avatar>
     <div class="mr-4">
       <p>{{admin_details.name}}</p>
      <p>{{admin_details.role_name}}</p>
     </div>
    </div>

  </div>
  </v-app-bar>
</template>

<script lang="ts" setup>

import {onMounted, ref} from 'vue'
import {services} from '../../composables/services'

const {getDashboard} = services()
const admin_details = ref<any>('')
onMounted(async () => {
  const data = await getDashboard()  

  console.log(admin_details.value = data)
})
</script>


<style scoped>
.w-100 {
  width: 100%;
}
</style>
