<template>

    <section>

        <h2 class="accordion-header">
            <button class="accordion-button" :class="{ collapsed: !isFirst }" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse-' + match.id ">
                <div class="w-100">
                    <div class="row align-items-center m-0">
                        <div class="col-4">
                            <h3 class="m-0">{{ getMatchActivity(match.matchActivityId)?.label }}</h3>
                        </div>
                        <div class="col-8">
                            <h6 class="small m-0">Fecha y Hora:</h6>
                            <div class="row g-3">
                                <div class="col-6">
                                    <span class="small opacity-75">Comienzo:</span>
                                    <h6 class="m-0"><i class="bi bi-clock-fill opacity-75 me-1"></i> {{ formatDateTime(match.matchStartAt) }} <sup>hs</sup></h6>
                                </div>
                                <div class="col-6">
                                    <span class="small opacity-75">Finalización:</span>
                                    <h6 class="m-0"><i class="bi bi-clock-fill opacity-75 me-1"></i> {{ formatDateTime(match.matchEndAt) }} <sup>hs</sup></h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </button>
        </h2>
        <div :id="'collapse-' + match.id " class="accordion-collapse collapse" :class="{ show: isFirst }" data-bs-parent="#accordionMatchesList">
            <div class="accordion-body">

                <div class="row g-3">
                    <div class="col-6">
                        <h6 class="small mb-1">Partido:</h6>
                        <div class="row g-3">
                            <div class="col-4">
                                <span class="small opacity-75">Tipo:</span>
                                <h6 class="m-0">{{ getMatchType(match.matchTypeId)?.label }}</h6>
                            </div>
                            <div class="col-4">
                                <span class="small opacity-75">Género:</span>
                                <h6 class="m-0">{{ getMatchGender(match.matchGenderId)?.label }}</h6>
                            </div>
                            <div class="col-4">
                                <span class="small opacity-75">Nivel:</span>
                                <h6 class="m-0">{{ getMatchLevel(match.matchLevelId)?.label }}</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <h6 class="small mb-1">Sede y Direción:</h6>
                        <div class="row g-3">
                            <div class="col-6">
                                <span class="small opacity-75">Sede:</span>
                                <h6 class="m-0">{{ match.matchPlace }}</h6>
                            </div>
                            <div class="col-6">
                                <span class="small opacity-75">Dirección:</span>
                                <h6 class="m-0">{{ match.matchPlaceAddress }}</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-5">
                        <div class="row g-3">
                            <div class="col-6">
                                <h6 class="small mb-1">Cupos:</h6>
                                <div class="row g-3">
                                    <div class="col-6">
                                        <span class="small opacity-75">Mínimo:</span>
                                        <h6 class="m-0">{{ match.matchMinPlayers }}</h6>
                                    </div>
                                    <div class="col-6">
                                        <span class="small opacity-75">Máximo:</span>
                                        <h6 class="m-0">{{ match.matchMaxPlayers }}</h6>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <h6 class="small mb-1">Edad:</h6>
                                <div class="row g-3">
                                    <div class="col-6">
                                        <span class="small opacity-75">Mínima:</span>
                                        <h6 class="m-0">{{ match.matchMinAge }}</h6>
                                    </div>
                                    <div class="col-6">
                                        <span class="small opacity-75">Máxima:</span>
                                        <h6 class="m-0">{{ match.matchMaxAge }}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-7">
                        <h6 class="small mb-1">Accesos:</h6>
                        <div class="row g-3">
                            <div class="col-8">
                                <span class="small opacity-75">URL:</span>
                                <div class="d-flex align-items-center">
                                    <div class="flex-grow-1">
                                        <h6 class="clamp-1 m-0">{{ match.matchURL }}</h6>
                                    </div>
                                    <div class="flex-shrink-0">
                                        <button class="btn btn-outline-light border-0 py-0" type="button">
                                            <i class="bi bi-copy opacity-75"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4">
                                <span class="small opacity-75">Pin:</span>
                                <div class="d-flex align-items-center">
                                    <div class="flex-grow-1">
                                        <h6 class="m-0">{{ match.matchPin }}</h6>
                                    </div>
                                    <div class="flex-shrink-0">
                                        <button class="btn btn-outline-light border-0 py-0" type="button">
                                            <i class="bi bi-copy opacity-75"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div :id="'collapseParticipants-' + match.id " class="collapse">
                    <div class="pt-3">
                        <h5 class="mb-4">Participantes:</h5>
                        <div class="row g-4">
                            <div class="col-6">
                                
                                <MatchesPlayersRegistrationList
                                    listType='confirmed'
                                    title='Confirmados'
                                    :matchId="match.id"
                                    :playersLimit=match.matchMaxPlayers
                                    mode='trainer'/>

                            </div>
                            <div class="col-6">

                                <MatchesPlayersRegistrationList
                                    listType='waiting'
                                    title='En Espera'
                                    :matchId="match.id"
                                    :playersLimit=match.matchMaxPlayers
                                    mode='trainer'/>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="pt-3">
                    <button type="button" class="btn btn-outline-light btn-sm px-4" data-bs-toggle="collapse" :data-bs-target="'#collapseParticipants-' + match.id ">
                        <i class="bi bi-people-fill opacity-75 me-1"></i> Participantes
                    </button>
                </div>

                <div class="text-end">
                    <div class="btn-group btn-group-lg">

                        <router-link  class="btn btn-dark" title="Editar" :to="{ name: 'edit-match', params: { id: match.id } }">
                            <i class="bi bi-pencil-square"></i>
                        </router-link>
                        <!--<button type="button" class="btn btn-dark" title="Eliminar">
                            <i class="bi bi-trash3"></i>
                        </button>-->
                    </div>
                </div>
                
            </div>
        </div>

    </section>

</template>

<script setup>

    import { createEmptyMatch } from '@/features/matches/models/matches.model'

    import MatchesPlayersRegistrationList from '@/features/matches/components/MatchesPlayersRegistrationList.vue'

    defineProps({
        match: {
            type: Object,
            default: createEmptyMatch
        },
        isFirst: {
            type: Boolean,
            default: false
        }
    })

    /************************************* */

    import {
        getMatchActivity,
        getMatchType,
        getMatchGender,
        getMatchLevel
    } from "@/features/matches/utils/matches.ui.utils";

    // Formateo fechas desde Firestore:

    const formatDateTime = (timestamp) => {
        if (!timestamp) return '-'

        const date = timestamp.toDate()

        return new Intl.DateTimeFormat('es-AR', {
            dateStyle: 'short',
            timeStyle: 'short',
            hour12: false
        }).format(date)
    }

</script>