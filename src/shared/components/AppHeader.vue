<template>

    <header id="mainHeader" class="bg-transparent position-absolute top-0 w-100">
        <nav class="my-5">
            <div class="container">
                <div class="row align-items-start">
                    <div class="col-4">
                    <router-link to="/">
                        <img src="@/assets/images/logo.svg" class="logo w-100">
                    </router-link>
                    </div>
                    <div class="col-4 offset-4 text-end">
                        <div class="d-flex justify-content-end">
                            <div v-if="!authStore.isAuthenticated">
                                <router-link class="btn btn-primary ps-4 pe-5" to="/login">
                                    <i class="bi bi-person-fill opacity-75 me-1"></i> Entrenadores <i class="bi bi-chevron-right ms-1"></i>
                                </router-link>
                            </div>

                            <div v-if="authStore.isAuthenticated" class="dropdown">
                                <a class="dropdown-toggle btn btn-primary px-4" href="#" data-bs-toggle="dropdown">
                                    <i class="bi bi-person-fill opacity-75"></i> Hola, <h6 class="d-inline text-capitalize m-0">{{ authStore.user.email.split('@')[0] }}</h6> <i class="bi bi-chevron-down ms-1"></i>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end border-0 box-shadow">
                                    <li><h6 class="dropdown-header">Partidos</h6></li>
                                    <li>
                                        <router-link class="dropdown-item py-2" to="/matches/view-list">
                                            <i class="bi bi-table me-1"></i> Ver partidos
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link class="dropdown-item py-2" to="/matches/new-match">
                                            <i class="bi bi-plus-circle me-1"></i> Crear partido
                                        </router-link>
                                    </li>
                                    <li><h6 class="dropdown-header">Entrenadores</h6></li>
                                    <li>
                                        <router-link class="dropdown-item py-2" to="/trainers/edit-trainer">
                                            <i class="bi bi-pencil-square opacity-75 me-1"></i> Editar
                                        </router-link>
                                    </li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li>
                                        <button class="dropdown-item py-2" @click="handleLogout"><i class="bi bi-box-arrow-right me-1"></i> Salir</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
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