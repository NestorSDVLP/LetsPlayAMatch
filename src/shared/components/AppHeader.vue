<template>

    <header id="mainHeader" class="bg-transparent position-absolute top-0 w-100">
        <nav class="my-4 my-sm-5">
            <div class="container">
                <div class="row align-items-start">
                    <div class="col-6 col-sm-3 col-lg-4">
                    <router-link to="/">
                        <img src="@/assets/images/logo.svg" class="logo w-100">
                    </router-link>
                    </div>
                    <div class="col-6 col-sm-5 offset-sm-4 col-lg-4 offset-lg-4 text-end">
                        <div class="d-flex justify-content-end">

                            <div v-if="!authStore.isAuthenticated">
                                <router-link class="btn btn-primary ps-sm-4 pe-5" to="/login">
                                    <i class="bi bi-person-fill me-sm-1"></i> 
                                    <span class="d-none d-sm-inline">Entrenadores</span>
                                    <i class="bi bi-chevron-right ms-sm-1"></i>
                                </router-link>
                            </div>

                            <div v-if="authStore.isAuthenticated" class="dropdown">
                                <a class="dropdown-toggle dropdown-toggle-trainer btn btn-primary pe-sm-4" href="#" data-bs-toggle="dropdown">

                                    <img 
                                        :src="trainerAvatar"
                                        class="trainer-avatar me-2"
                                        alt="Avatar entrenador"/>

                                    <span class="d-none d-sm-inline-block ms-2">
                                        Hola, 
                                        <h6 class="d-inline text-capitalize m-0">
                                            {{ authStore.user.email.split('@')[0] }}
                                        </h6>
                                    </span>

                                    <i class="bi bi-chevron-down ms-1"></i>

                                </a>
                                <ul class="dropdown-menu dropdown-menu-end border-0 box-shadow">
                                    <li><h6 class="dropdown-header">Partidos</h6></li>
                                    <li>
                                        <router-link class="dropdown-item py-2" to="/matches/new-match">
                                            <i class="bi bi-plus-circle me-1"></i> Crear Partido
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link class="dropdown-item py-2" to="/matches/view-list">
                                            <i class="bi bi-list-ul me-1"></i> Listado de Partidos
                                        </router-link>
                                    </li>

                                    <li><h6 class="dropdown-header">Tableros de Partidos</h6></li>

                                    <li v-if="!matchesStore.matches.length">
                                        <p class="dropdown-item opacity-75 m-0">No existen partidos</p>
                                    </li>

                                    <li v-for="(match, index) in matchesStore.matches" :key="match.id">
                                        <router-link class="dropdown-item py-2" :to="`/matches/view-board/${ match.matchURL }`">
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 me-2">
                                                    <i class="bi bi-people-fill opacity-50"></i>
                                                </div>
                                                <div class="flex-grow-1">
                                                    <p class="lh-sm m-0">
                                                        {{ formatDateTime(match.matchStartAt) }} <sup>hs</sup><br>
                                                        <small class="opacity-75">{{ match.matchPlace }}</small>
                                                    </p>
                                                </div>
                                            </div>
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

    import { computed, watch } from 'vue'
    import { useRouter } from 'vue-router'
    import { useAuthStore } from '@/features/auth/stores/auth.store'
    import { useTrainerStore } from '@/features/trainers/stores/trainers.store'
    import { useMatchesStore } from '@/features/matches/stores/matches.store'

    import { formatDateTime } from "@/shared/utils/ui.utils";

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

    /***************************************** */

    const matchesStore = useMatchesStore()

    watch(
        () => trainerStore.trainer?.uid,
        async (uid) => {

            if (!uid) return

            await matchesStore.fetchTrainerMatches()

        },
        {
            immediate: true
        }
    )

    /***************************************** */

    import defaultAvatar from '@/assets/images/default_avatar.png'

    const trainerAvatar = computed(() => {
        return trainerStore.trainer?.trainerAvatar || defaultAvatar
    })

</script>