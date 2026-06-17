<template>

    <header id="mainHeader" class="bg-primary bg-gradient box-shadow fixed-top">
        <div class="container">
            <nav class="navbar navbar-expand-lg px-0">
                <router-link class="navbar-brand text-dark" to="/">
                    <img src="@/assets/images/logo.svg" class="logo" style="transform: rotate(5deg);">
                </router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-auto-close="inside" data-bs-target="#mainNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="mainNav">
                    <ul class="navbar-nav align-items-center h6 ms-auto me-0">
                        
                        <li class="nav-item">
                            <router-link class="nav-link text-dark" to="/">
                                <i class="bi bi-house-fill opacity-50"></i> Inicio
                            </router-link>
                        </li>

                        <li v-if="!authStore.isAuthenticated" class="nav-item">
                            <router-link class="nav-link text-dark" to="/login">
                                <i class="bi bi-person-fill opacity-75"></i> Ingresar como Entrenador
                            </router-link>
                        </li>

                        <li v-if="authStore.isAuthenticated" class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown"><i class="bi bi-person-fill opacity-50"></i> Hola, {{ authStore.user.email.split('@')[0] }} <i class="bi bi-chevron-down ms-1"></i></a>
                            <ul class="dropdown-menu dropdown-menu-end border-0 box-shadow">
                                <li>
                                    <router-link class="dropdown-item py-2" to="/matches/new-match">
                                        <i class="bi bi-plus-circle me-1"></i> Crear partido
                                    </router-link>
                                </li>
                                <li>
                                    <router-link class="dropdown-item py-2" to="/trainers/edit-trainer">
                                        <i class="bi bi-person-fill opacity-75 me-1"></i> Perfil del Entrenador
                                    </router-link>
                                </li>
                                <li><hr class="dropdown-divider"></li>
                                <li>
                                    <button class="dropdown-item py-2" @click="handleLogout"><i class="bi bi-box-arrow-right me-1"></i> Salir</button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>

</template>

<script setup>

    /*
    * Utilidades reactivas utilizadas por el layout.
    */

    import { computed } from 'vue'
    import { useRouter } from 'vue-router'
    import { useAuthStore } from '@/features/auth/stores/auth.store'
    import { useTrainerStore } from '@/features/trainers/stores/trainers.store'

    const router = useRouter()

    const trainerStore = useTrainerStore()

    const authStore = useAuthStore()

    /***************************************** */

    const handleLogout = async () => {

        try {

            await authStore.logoutUser()

            trainerStore.clearTrainer()

            await router.push('/login')

        } catch (error) {

            console.error(
                'handleLogout: Error al cerrar sesión:',
                error
            )

        }

    }

</script>