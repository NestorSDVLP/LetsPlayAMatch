/*
* Configuración principal de Vue Router.
*/

import { createRouter, createWebHistory } from 'vue-router'


/*
* Vistas asociadas a cada ruta de la aplicación.
*/

import HomeView from '@/features/home/views/HomeView.vue'

import LoginView from '@/features/auth/views/LoginView.vue'
import NotFoundView from '@/features/404/views/404.vue'

/*
* Definición del mapa de navegación.
*
* La ruta principal de mascotas redirecciona
* a una URL completa con filtros explícitos.
*
* Esto garantiza que todos los filtros tengan
* siempre un valor definido.
*/

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    // Esta ruta tiene que ir ÚLTIMA SIÉMPRE:
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFoundView
    }

]

/*
* Instancia del router utilizando History API.
*
* Las URLs se muestran sin hash (#).
*/

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition // Si toca "atrás", mantiene la posición previa
        } else {
            return { top: 0, behavior: 'smooth' } // Si es navegación nueva, scrollea al tope
            // Si querés que sea fluido podés usar: return { top: 0, behavior: 'smooth' }
        }
    }
})

/*
* Importación del store de UI para controlar el loader de navegación.
*/

import { useUiStore } from '@/shared/stores/ui.store'

/*
* Navigation Guards para activar y desactivar el loader global.
*/

router.beforeEach(async (to, from) => {
    const uiStore = useUiStore()
    uiStore.setLoading(true)
    
    // Simula una demora de 250ms para poder ver el diseño del spinner *****************************
    await new Promise(resolve => setTimeout(resolve, 250))
})

router.afterEach(() => {
    const uiStore = useUiStore()
    uiStore.setLoading(false)

    // 1. Cerrar Offcanvas: Buscamos el botón de cerrar (.btn-close) del offcanvas que esté abierto (.show) y le hacemos click
    const activeOffcanvasCloseBtn = document.querySelector('.offcanvas.show .btn-close, .offcanvas.show [data-bs-dismiss="offcanvas"]')
    if (activeOffcanvasCloseBtn) {
        activeOffcanvasCloseBtn.click()
    }

    // 2. Cerrar Dropdowns (menús desplegables de mobile): Buscamos los toggles que estén abiertos y les hacemos click para colapsarlos
    const activeDropdowns = document.querySelectorAll('.dropdown-toggle.show')
    activeDropdowns.forEach(dropdown => {
        dropdown.click()
    })
})

router.onError(() => {
    const uiStore = useUiStore()
    uiStore.setLoading(false)
})

/*
* Exporta el router para ser registrado
* en la aplicación principal.
*/

export default router