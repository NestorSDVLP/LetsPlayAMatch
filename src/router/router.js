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
    {
        path: '/matches/view-board',
        name: 'matches-view-board',
        component: () => import('@/features/matches/views/MatchesBoardView.vue'),
        meta: { 
            requiresAuth: true,
            requiresCompletedProfile: true
        }
    },
    {
        path: '/matches/view-list',
        name: 'matches-view-list',
        component: () => import('@/features/matches/views/MatchesListView.vue'),
        meta: { 
            requiresAuth: true,
            requiresCompletedProfile: true
        }
    },
    {
        path: '/matches/new-match',
        name: 'new-match',
        component: () => import('@/features/matches/views/MatchesNewView.vue'),
        meta: { 
            requiresAuth: true,
            requiresCompletedProfile: true
        }
    },
    {
        path: '/trainers/edit-trainer',
        name: 'edit-trainer',
        component: () => import('@/features/trainers/views/TrainerEditView.vue'),
        meta: { 
            requiresAuth: true 
        }
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
* Importación del store de Auth para controlar el acceso.
*/

import { useAuthStore } from '@/features/auth/stores/auth.store'

/*
* Importación del store de Trainer para controlar la edicion del perfil del entrenador.
*/

import { useTrainerStore } from '@/features/trainers/stores/trainers.store'

router.beforeEach(async (to, from) => {

    console.log('ANTES DEL GUARD')

    const uiStore = useUiStore()
    uiStore.setLoading(true)

    const authStore = useAuthStore()
    const trainerStore = useTrainerStore()

    console.log('isAuthenticated:', authStore.isAuthenticated)

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        console.log('REDIRIGE LOGIN')
        return { name: 'login' }
    }

    try {

        if (authStore.isAuthenticated && !trainerStore.trainer) {

            console.log('ANTES initializeTrainer')

            await trainerStore.initializeTrainer(authStore.user)

            console.log('DESPUES initializeTrainer')
        }

    } catch (error) {

        console.error('ERROR initializeTrainer', error)

    }

    console.log('SALE DEL GUARD')

    return true
})

/*router.beforeEach(async (to, from) => {
    const uiStore = useUiStore()
    uiStore.setLoading(true)
    
    // Simula una demora de 250ms para poder ver el diseño del spinner *****************************
    // await new Promise(resolve => setTimeout(resolve, 250)) // Opcional

    const authStore = useAuthStore();
    const trainerStore = useTrainerStore()

    console.log('isAuthenticated:', authStore.isAuthenticated)
    console.log('user:', authStore.user)

    // Si la ruta requiere autenticación y NO estamos autenticados, retornamos la ruta de login
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return { name: 'login' }; // Vue Router hace la redirección al retornar este objeto        
    }

    if (authStore.isAuthenticated && !trainerStore.trainer) {
        await trainerStore.initializeTrainer(authStore.user)
        console.log(trainerStore.trainer)
    }
    
    // Si todo está bien, retornamos true para permitir la navegación
    return true;
})*/

router.afterEach(() => {

    console.log('AFTER EACH')

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

/*router.onError(() => {
    const uiStore = useUiStore()
    uiStore.setLoading(false)
})*/

router.onError(error => {

    console.error('ROUTER ERROR')
    console.error(error)

    const uiStore = useUiStore()
    uiStore.setLoading(false)

})

/*
* Exporta el router para ser registrado
* en la aplicación principal.
*/

export default router