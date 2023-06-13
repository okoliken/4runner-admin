import axios from 'axios'
// @ts-ignore
import Cookie from 'js-cookie'


import { useToast } from 'vue-toast-notification';



export const apiService = axios.create({
    baseURL: 'https://runner-api.4runnerglobal.com/api/v1/',

})

export const storeUser = (user: any) => {
    Cookie.set('Admin', JSON.stringify(user))
}

// export const initServer = () => {
   
//     const userToken = Cookie.get('Admin');
//     console.log(userToken)
//     const server = axios.create()
//     if (userToken != null) {
//         const token = JSON.parse(userToken);
//         console.log(server.defaults.headers.common['Authorization'] = `Bearer ${token.token}`)
//         // server.defaults.headers.common['Authorization'] = `Bearer ${token.token}`
//     }
// }

export const removeUser = () => {
    // Cookie.remove('Admin')
    localStorage.removeItem('Token')
    window.location.href = "/auth/login"
}

apiService.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('Token') as any);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})


apiService.interceptors.response.use((res) => res.data, (error) => {
    const $toast = useToast();

    if (error.response.status == 400) {
         $toast.error(error.response.data.error.message, {
            position: 'top-right'
        })
     throw new Error(error)
    }

    if (error.response.status == 401) {
         $toast.error(error.response.data.error.message, {
            position: 'top-right'
        })

        removeUser()
     throw new Error(error)
    }
}) 