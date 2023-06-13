import {dashboard} from '../utils/routes'
import {apiService} from '../plugins/axios'
import {ref} from 'vue'
export const services = () => {
   const val = ref<any>('')
    const getDashboard = async () => {
       const data:any =  await apiService.get(dashboard)

        val.value = data.success.info
        console.log(val.value)
        return val.value
    }
    // console.log(val.value)

    return {getDashboard, val}
}

// interface Admin {
//     name:string,
//     email:string,
//     image:string,
//     gender:string
// }