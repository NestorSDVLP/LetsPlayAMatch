import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { onAuthStateChanged } from 'firebase/auth'

import { 
    auth, 
    login as loginService, 
    logout as logoutService,
    loginWithGoogle as loginWithGoogleService // Importamos el servicio nuevo
} from '@/features/auth/services/auth.service'

import { useTrainerStore } from '@/features/trainers/stores/trainers.store'

export const useAuthStore = defineStore('auth', () => {

    /*
    * Usuario autenticado.
    */
    const user = ref(null)

    /*
    * Estado derivado de autenticación.
    */
    const isAuthenticated = computed(() => {
        return !!user.value
    })

    /*
    * Estado de carga inicial.
    */
    const loadingAuth = ref(true)

    const authReady = ref(false)

    /*
    * Inicializa el listener de Firebase Auth.
    */
    const initAuth = () => {

        const trainerStore = useTrainerStore()

        onAuthStateChanged(auth, async (firebaseUser) => {

            user.value = firebaseUser

            if (firebaseUser) {

                await trainerStore.initializeTrainer(firebaseUser)

            } else {

                trainerStore.clearTrainer()

            }

            loadingAuth.value = false
            authReady.value = true

        })

    }

    const loginUser = async (email, password) => {
        return await loginService(email, password)
    }

    // Nueva acción para el login con Google
    const loginUserWithGoogle = async () => {
        try {
            return await loginWithGoogleService()
        } catch (error) {
            console.error("Error en Google Auth:", error)
            throw error 
        }
    }

    const logoutUser = async () => {
        return await logoutService()
    }

    /***************************** */

    const waitForAuth = () => {

        return new Promise(resolve => {

            if (authReady.value) {
                resolve()
                return
            }

            const unsubscribe = onAuthStateChanged(auth, () => {

                unsubscribe()
                resolve()

            })

        })

    }

    /*
    * API pública.
    */
    return {
        user,
        isAuthenticated,
        loadingAuth,
        initAuth,
        loginUser,
        loginUserWithGoogle,
        authReady,
        waitForAuth,
        logoutUser
    }
})