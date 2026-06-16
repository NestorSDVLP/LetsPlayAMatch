import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { onAuthStateChanged } from 'firebase/auth'

import { 
    auth, 
    login as loginService, 
    logout as logoutService,
    loginWithGoogle as loginWithGoogleService // Importamos el servicio nuevo
} from '@/features/auth/services/auth.service'

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

    /*
    * Inicializa el listener de Firebase Auth.
    */
    const initAuth = () => {
        onAuthStateChanged(auth, (firebaseUser) => {
            user.value = firebaseUser
            loadingAuth.value = false
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

    /*
    * API pública.
    */
    return {
        user,
        isAuthenticated,
        loadingAuth,
        initAuth,
        loginUser,
        loginUserWithGoogle, // Exportamos la nueva acción
        logoutUser
    }
})