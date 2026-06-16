/*
* Dependencias base de Vue y Pinia.
*/

import { createApp } from 'vue'
import { createPinia } from 'pinia'

/*
* Hoja de estilos principal de la aplicación.
*/

import '@/assets/styles/main.scss'

/*
* Recursos visuales de Bootstrap.
*
* - Bootstrap Icons
* - Componentes JS de Bootstrap
*/

import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

/*
* Componente raíz de la aplicación.
*/

import App from '@/App.vue'

/*
* Configuración global de rutas.
*/

import router from '@/router/router.js'

/*
* Store de autenticación.
*
* Se inicializa al arrancar la aplicación para
* mantener sincronizado el estado de Firebase Auth.
*/

import { useAuthStore } from '@/features/auth/stores/auth.store'

/*
* Crea la instancia principal de Vue.
*/

const app = createApp(App)

/*
* Crea y registra Pinia como gestor global de estado.
*/

const pinia = createPinia()

app.use(pinia)

/*
* Inicializa el store de autenticación.
*
* Escucha los cambios de sesión mediante
* Firebase Auth y actualiza el estado global.
*/

const authStore = useAuthStore()

authStore.initAuth()

/*
* Registra Vue Router.
*/

app.use(router)

/*
* Monta la aplicación sobre el elemento #app.
*/

app.mount('#app')