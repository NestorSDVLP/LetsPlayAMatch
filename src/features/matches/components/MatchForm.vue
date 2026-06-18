<template>

    <section class="has-padding-top">
        <div class="container">
            <div class="bg-light text-dark rounded box-shadow p-3 p-sm-5">
                <form novalidate>
                    <input type="hidden" v-model="formData.teamTrainerId">

                    <h1 class="h1 mb-5"><i class="bi bi-plus-circle me-1"></i> Crear Partido</h1>

                    <h2 class="h4">Actividad</h2>
                    <hr class="mb-4">
                    <div class="row">
                        <div class="col-12">
                            <label class="h6 d-block">Actividad *</label>
                            <div class="btn-group-match-activity btn-group w-100 mb-5">

                                <div class="btn-check-wrapper"  v-for="act in MATCH_ACTIVITIES" :key="act.id" :value="act.id">
                                    <input type="radio" class="btn-check" name="radio-match-activity" :id="`btnradio-${act.id}`" autocomplete="off" v-model="formData.matchActivityId">
                                    <label class="btn btn-outline-dark py-2" :for="`btnradio-${act.id}`">
                                        <img :src="act.icon" class="icon mb-2" :alt="act.label">
                                        <h6 class="m-0">{{ act.label }}</h6>
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>
                    <h2 class="h5">Sede y Dirección</h2>
                    <hr class="mb-4">
                    <div class="row g-3">
                        <!--<div class="col-4">
                            <label class="h6">Actividad *</label>
                            <select class="form-select" v-model="formData.matchActivityId">
                                <option value="" selected disabled>Seleccionar</option>
                                <option v-for="act in MATCH_ACTIVITIES" :key="act.id" :value="act.id">
                                    {{ act.label }}
                                </option>
                            </select>
                        </div>-->
                        <div class="col-4">
                            <label class="h6">Lugar *</label>
                            <input type="text" class="form-control" placeholder="Lugar" required v-model="formData.matchPlace">
                        </div>
                        <div class="col-8">
                            <label class="h6">Dirección *</label>
                            <input type="text" class="form-control" placeholder="Dirección" required v-model="formData.matchPlaceAddress">
                        </div>
                    </div>

                    <h2 class="h5 mt-5">Fecha y Hora</h2>
                    <hr class="mb-4">
                    <div class="row g-3">
                        <div class="col-5">
                            <label class="h6">Comienzo *</label>
                            <input type="text" class="form-control" placeholder="Fecha y Hora" v-model="formData.matchStartAt" required>
                            
                        </div>
                        <div class="col-5">
                            <label class="h6">Finalización *</label>
                            <input type="text" class="form-control" placeholder="Fecha y Hora" v-model="formData.matchEndAt" required>
                        </div>
                    </div>

                    <h2 class="h5 mt-5">Sobre el Partido</h2>
                    <hr class="mb-4">
                    <div class="row g-3 align-items-end">
                        <div class="col-4">
                            <label class="h6">Cantidad mínima <br>de jugadores *</label>
                            <input type="text" class="form-control" placeholder="Mínimo" required v-model="formData.matchMinPlayers">
                        </div>
                        <div class="col-4">
                            <label class="h6">Cantidad máxima <br>de jugadores *</label>
                            <input type="text" class="form-control" placeholder="Máximo" required v-model="formData.matchMaxPlayers">
                        </div>
                        <div class="col-4">
                            <label class="h6">Tipo *</label>
                            <select class="form-select" required v-model="formData.matchTypeId">
                                <option value="" selected disabled>Seleccionar</option>
                                <option v-for="type in MATCH_TYPES" :key="type.id" :value="type.id">
                                    {{ type.label }}
                                </option>
                            </select>
                        </div>
                        <div class="col-4">
                            <label class="h6">Genero/s *</label>
                            <select class="form-select" required v-model="formData.matchGenderId">
                                <option value="" selected disabled>Seleccionar</option>
                                <option v-for="gender in MATCH_GENDERS" :key="gender.id" :value="gender.id">
                                    {{ gender.label }}
                                </option>
                            </select>
                        </div>
                        <div class="col-4">
                            <label class="h6">Nivel *</label>
                            <select class="form-select" required v-model="formData.matchLevelId">
                                <option value="" selected disabled>Seleccionar</option>
                                <option v-for="level in MATCH_LEVELS" :key="level.id" :value="level.id">
                                    {{ level.label }}
                                </option>
                            </select>
                        </div>
                        <div class="col-4">
                            <label class="h6">Edad mínima <br>de los jugadores *</label>
                            <input type="text" class="form-control" placeholder="Mínimo" required v-model="formData.matchMinAge">
                        </div>
                        <div class="col-4">
                            <label class="h6">Edad máxima <br>de los jugadores *</label>
                            <input type="text" class="form-control" placeholder="Máximo" required v-model="formData.matchMaxAge">
                        </div>
                    </div>

                    <h2 class="h5 mt-5">Accesos al Partido</h2>
                    <hr class="mb-4">
                    <div class="row g-3 align-items-end">
                        <div class="col-8">
                            <label class="h6">URL *</label>
                            <div class="input-group">
                                <button class="btn btn-secondary" type="button" @click="generatePin">Generar URL</button>
                                <input type="text" class="form-control" placeholder="URL" readonly required v-model="formData.matchURL">
                            </div>
                        </div>
                        <div class="col-4">
                            <label class="h6">Pin de Acceso *</label>
                            <div class="input-group">
                                <button class="btn btn-secondary" type="button" @click="generatePin">Generar Pin</button>
                                <input type="text" class="form-control" placeholder="Pin" readonly required v-model="formData.matchPin">
                            </div>
                        </div>
                    </div>

                    <p class="small opacity-75 my-3">(*) Datos requeridos</p>

                    <div class="text-center">
                        <!-- Mostrar un spiner mientras se procesa el loging -->
                        <button class="btn btn-primary rounded-pill px-5 py-2" type="submit" :disabled="loading">

                            <template v-if="loading">
                                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Creando...
                            </template>

                            <template v-else>
                                <i class="bi bi-check-circle-fill opacity-75 me-1"></i> Crear Partido
                            </template>

                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>

</template>

<script setup>

    import { 
        MATCH_ACTIVITIES, 
        MATCH_TYPES,
        MATCH_GENDERS,
        MATCH_LEVELS 
    } from '@/features/matches/constants/matches.constants'

    import { ref } from 'vue';

    // Define el estado inicial

    const initialState = {
        id: '',
        teamTrainerId: '',
        matchActivityId: '',
        matchPlace: '',
        matchPlaceAddress: '',
        matchStartAt: '',
        matchEndAt: '',
        matchMinPlayers: '',
        matchMaxPlayers: '',
        matchTypeId: '',
        matchGenderId: '',
        matchLevelId: '',
        matchMinAge: '',
        matchMaxAge: '',
        matchStatusId: '',
        matchPin: '',
        matchURL: '',
        createdAt: '',
    };

    const formData = ref({ ...initialState });

    const loading = ref(false); // Para el spinner del botón

    // Genera un número de 6 dígitos aleatorio

    const generatePin = () => {
        formData.value.matchPin = Math.floor(100000 + Math.random() * 900000).toString();
    };

    const emit = defineEmits(['create-match']);

    const submitForm = () => {
        loading.value = true;
        emit('create-match', { ...formData.value });
        // loading.value = false; // Esto lo manejarás cuando recibas la respuesta del servicio
    };

</script>