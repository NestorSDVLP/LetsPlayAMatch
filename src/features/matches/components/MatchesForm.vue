<template>

    <section class="has-padding-top">
        <div class="container">
            <div class="bg-g8 text-w box-shadow p-3 p-sm-5">

                <form novalidate @submit.prevent="onSubmit">
                    
                    <h1 class="h1 mb-5">Crear Partido</h1>

                    <h2 class="h4">Actividad</h2>
                    <hr class="mb-4">
                    <div class="row">
                        <div class="col-12">
                            <label class="h6 d-block">Actividad *</label>
                            <div class="mb-5">
                                <div class="btn-group-match-activity btn-group w-100">
                                    <div class="btn-check-wrapper"  v-for="act in MATCH_ACTIVITIES" :key="act.id">
                                        <input type="radio" class="btn-check" name="radio-match-activity" :id="`btnradio-${act.id}`" :value="act.id" autocomplete="off" v-model="matchActivityId">
                                        <label class="btn btn-outline-light py-3" :for="`btnradio-${act.id}`">
                                            <img :src="act.icon" class="icon mb-2" :alt="act.label">
                                            <h6 class="m-0">{{ act.label }}</h6>
                                        </label>
                                    </div>
                                </div>
                                <div class="invalid-feedback d-block mt-1">
                                    {{ errors.matchActivityId }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 class="h5">Sede y Dirección</h2>
                    <hr class="mb-4">
                    <div class="row g-3">
                        <div class="col-4">
                            <label class="h6">Sede *</label>
                            <input type="text" class="form-control" :class="{ 'is-invalid': errors.matchPlace }" placeholder="Sede" v-model="matchPlace">
                            <div class="invalid-feedback d-block mt-1">
                                {{ errors.matchPlace }}
                            </div>
                        </div>
                        <div class="col-8">
                            <label class="h6">Dirección *</label>
                            <input type="text" class="form-control" :class="{ 'is-invalid': errors.matchPlaceAddress }" placeholder="Dirección" v-model="matchPlaceAddress">
                            <div class="invalid-feedback d-block mt-1">
                                {{ errors.matchPlaceAddress }}
                            </div>
                        </div>
                    </div>

                    <h2 class="h5 mt-5">Fecha y Hora</h2>
                    <hr class="mb-4">
                    <div class="row g-3">
                        <div class="col-5">
                            <label class="h6">Comienzo *</label>
                            <VueDatePicker :class="{ 'is-invalid': errors.matchStartAt }" v-model="matchStartAt"></VueDatePicker>
                            <div class="invalid-feedback d-block mt-1">
                                {{ errors.matchStartAt }}
                            </div>                            
                        </div>
                        <div class="col-5">
                            <label class="h6">Finalización *</label>
                            <VueDatePicker :class="{ 'is-invalid': errors.matchEndAt }" v-model="matchEndAt"></VueDatePicker>
                            <div class="invalid-feedback d-block mt-1">
                                {{ errors.matchEndAt }}
                            </div>
                        </div>
                    </div>

                    <h2 class="h5 mt-5">Sobre el Partido</h2>
                    <hr class="mb-4">
                    <div class="row g-3 align-items-end">
                        <div class="col-4">
                            <label class="h6">Tipo *</label>
                            <select class="form-select" v-model="matchTypeId">
                                <option value="" selected disabled>Seleccionar</option>
                                <option v-for="type in MATCH_TYPES" :key="type.id" :value="type.id">
                                    {{ type.label }}
                                </option>
                            </select>
                            <div class="invalid-feedback d-block mt-1">
                                {{ errors.matchTypeId }}
                            </div>
                        </div>
                        <div class="col-4">
                            <label class="h6">Genero/s *</label>
                            <select class="form-select" v-model="matchGenderId">
                                <option value="" selected disabled>Seleccionar</option>
                                <option v-for="gender in MATCH_GENDERS" :key="gender.id" :value="gender.id">
                                    {{ gender.label }}
                                </option>
                            </select>
                            <div class="invalid-feedback d-block mt-1">
                                {{ errors.matchGenderId }}
                            </div>
                        </div>
                        <div class="col-4">
                            <label class="h6">Nivel *</label>
                            <select class="form-select" v-model="matchLevelId">
                                <option value="" selected disabled>Seleccionar</option>
                                <option v-for="level in MATCH_LEVELS" :key="level.id" :value="level.id">
                                    {{ level.label }}
                                </option>
                            </select>
                            <div class="invalid-feedback d-block mt-1">
                                {{ errors.matchLevelId }}
                            </div>
                        </div>
                        <div class="col-3">
                            <label class="h6">Cantidad mínima <br>de jugadores *</label>
                            <input type="number" class="form-control" :class="{ 'is-invalid': errors.matchMinPlayers }" placeholder="Mínimo" v-model="matchMinPlayers">
                            <div class="invalid-feedback d-block mt-1">
                                {{ errors.matchMinPlayers }}
                            </div>
                        </div>
                        <div class="col-3">
                            <label class="h6">Cantidad máxima <br>de jugadores *</label>
                            <input type="number" class="form-control" :class="{ 'is-invalid': errors.matchMaxPlayers }" placeholder="Máximo" v-model="matchMaxPlayers">
                            <div class="invalid-feedback d-block mt-1">
                                {{ errors.matchMaxPlayers }}
                            </div>
                        </div>
                        <div class="col-3">
                            <label class="h6">Edad mínima <br>de los jugadores *</label>
                            <input type="number" class="form-control" :class="{ 'is-invalid': errors.matchMinAge }" placeholder="Mínimo" v-model="matchMinAge">
                            <div class="invalid-feedback d-block mt-1">
                                {{ errors.matchMinAge }}
                            </div>
                        </div>
                        <div class="col-3">
                            <label class="h6">Edad máxima <br>de los jugadores *</label>
                            <input type="number" class="form-control" :class="{ 'is-invalid': errors.matchMaxAge }" placeholder="Máximo" v-model="matchMaxAge">
                            <div class="invalid-feedback d-block mt-1">
                                {{ errors.matchMaxAge }}
                            </div>
                        </div>
                    </div>

                    <h2 class="h5 mt-5">Accesos al Partido</h2>
                    <hr class="mb-4">
                    <div class="row g-3 align-items-end">
                        <div class="col-12">
                            <label class="h6">URL *</label>
                            <div class="input-group">
                                <button class="btn btn-secondary pe-5" type="button" @click="generateURL">Generar URL <i class="bi bi-chevron-right ms-1"></i></button>
                                <input type="text" class="form-control" :class="{ 'is-invalid': errors.matchURL }" placeholder="URL" readonly v-model="matchURL">
                                <button class="btn btn-secondary" type="button" @click="generateURL"><i class="bi bi-copy"></i></button>
                            </div>
                            <div class="invalid-feedback d-block mt-1">
                                {{ errors.matchURL }}
                            </div>
                        </div>
                        <div class="col-6">
                            <label class="h6">Pin de Acceso *</label>
                            <div class="input-group">
                                <button class="btn btn-secondary pe-5" type="button" @click="generatePin">Generar Pin <i class="bi bi-chevron-right ms-1"></i></button>
                                <input type="text" class="form-control" :class="{ 'is-invalid': errors.matchPin }" placeholder="Pin" readonly v-model="matchPin">
                                <button class="btn btn-secondary" type="button" @click="generatePin"><i class="bi bi-copy"></i></button>
                            </div>
                            <div class="invalid-feedback d-block mt-1">
                                {{ errors.matchPin }}
                            </div>
                        </div>
                    </div>

                    <p class="small opacity-75 my-3">(*) Datos requeridos</p>

                    <div class="text-center">
                        <button class="btn btn-primary px-5 py-2" type="submit" :disabled="loading">

                            <template v-if="loading">
                                <span class="spinner-border spinner-border-sm me-2"></span>
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

    console.log('MATCH FORM CARGADO')

    import { 
        MATCH_ACTIVITIES, 
        MATCH_TYPES,
        MATCH_GENDERS,
        MATCH_LEVELS 
    } from '@/features/matches/constants/matches.constants'

    import { useRoute } from 'vue-router'

    import { VueDatePicker } from '@vuepic/vue-datepicker'
    import '@vuepic/vue-datepicker/dist/main.css'

    import { 
        useForm,
        useField 
        } from 'vee-validate'
    import Swal from 'sweetalert2'    

    import { useMatchesStore } from '@/features/matches/stores/matches.store'
    import { createEmptyMatch } from '@/features/matches/models/matches.model'

    import { matchesSchema } from '@/features/matches/schemas/matches.schema'

    import { ref } from 'vue';

    const props = defineProps({
        initialData: {
            type: Object,
            default: () => ({})
        }
    })

    const loading = ref(false); // Para el spinner del botón

    // Genera una URL para el match

    const generateURL = () => {
        matchURL.value = `match-${crypto.randomUUID()}`
    }

    // Genera un número de 6 dígitos aleatorio

    const generatePin = () => {
        matchPin.value = Math.floor(
            100000 + Math.random() * 900000
        ).toString()
    }

    const matchesStore = useMatchesStore()

    const route = useRoute()
    
    /****************************************** */

    const initialValues = {
        ...createEmptyMatch(),
        ...props.initialData
    }

    const { handleSubmit, errors } = useForm({
        matchesSchema,
        initialValues
    })

    /****************************************** */

    const { value: matchActivityId } = useField('matchActivityId')
    const { value: matchPlace } = useField('matchPlace')
    const { value: matchPlaceAddress } = useField('matchPlaceAddress')
    const { value: matchStartAt } = useField('matchStartAt')
    const { value: matchEndAt } = useField('matchEndAt')
    const { value: matchTypeId } = useField('matchTypeId')
    const { value: matchGenderId } = useField('matchGenderId')
    const { value: matchLevelId } = useField('matchLevelId')
    const { value: matchMinPlayers } = useField('matchMinPlayers')
    const { value: matchMaxPlayers } = useField('matchMaxPlayers')
    const { value: matchMinAge } = useField('matchMinAge')
    const { value: matchMaxAge } = useField('matchMaxAge')
    const { value: matchURL } = useField('matchURL')
    const { value: matchPin } = useField('matchPin')

    /****************************************** */

    const onSubmit = handleSubmit(async values => {

        try {

            loading.value = true

            console.log('ENTRO AL SUBMIT')
            console.log(values)

            await matchesStore.createMatch(values)

            await Swal.fire({
                icon: 'success',
                title: 'El partido fué creado con éxito',
                timer: 2000,
                showConfirmButton: false
            })

            router.push('/matches/view-list/')

        } catch(error) {

            console.error(error)

            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo guardar el partido'
            })

        } finally {

            loading.value = false

        }

    })

</script>