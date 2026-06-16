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
                    <ul class="navbar-nav align-items-center fw-strong ms-auto me-0">

                        <li v-if="!authStore.isAuthenticated" class="nav-item">
                            <router-link class="nav-link text-dark" to="/login">
                                <i class="bi bi-person-fill opacity-75"></i> Ingresar como entrenador
                            </router-link>
                        </li>

                        <li v-if="authStore.isAuthenticated" class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown"><i class="bi bi-person-fill opacity-50"></i> Hola, {{ authStore.user.email.split('@')[0] }} <i class="bi bi-chevron-down ms-1"></i></a>
                            <ul class="dropdown-menu dropdown-menu-end border-0 box-shadow">
                                <li>
                                    <router-link class="dropdown-item" to="/login">
                                        <i class="bi bi-calendar3 me-1"></i> Panel de Entrenador
                                    </router-link>
                                </li>
                                <li>
                                    <router-link class="dropdown-item" to="/matches/new-match">
                                        <i class="bi bi-plus-circle me-1"></i> Crear partido
                                    </router-link>
                                </li>
                                <li><hr class="dropdown-divider"></li>
                                <li>
                                    <button class="dropdown-item" @click="handleLogout"><i class="bi bi-box-arrow-right me-1"></i> Salir</button>
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
    import { useAuthStore } from '@/features/auth/stores/auth.store'

    const authStore = useAuthStore()

    const handleLogout = async () => {
        await authStore.logoutUser()
    }

</script>