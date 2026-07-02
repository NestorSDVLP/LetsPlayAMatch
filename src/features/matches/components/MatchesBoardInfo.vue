<template>

    <section>

        <section v-if="match">
            <div class="container">
                <div class="bg-g8 text-w box-shadow px-4 py-5 p-sm-5">

                    <div class="mb-4">
                        <div class="row g-3 align-items-end">
                            <div class="col-sm-4 text-center">
                                <img :src="getMatchActivity(match.matchActivityId)?.icon" class="d-none d-sm-inline-block w-50 opacity-50 mb-3" style="filter: invert(1);">
                                <h2 class="h3 m-0">{{ getMatchActivity(match.matchActivityId)?.label }}</h2>
                            </div>
                            <div class="col-sm-8">
                                <div class="d-flex mb-4">
                                    <div class="flex-shrink-0 me-4">
                                        <i class="bi bi-calendar2-week h2 opacity-75 mb-0"></i>
                                    </div>
                                    <div class="flex-grow-1">
                                        <h6 class="small mb-1">Fecha y Hora:</h6>
                                        <div class="row g-3">
                                            <div class="col-sm-6">
                                                <span class="small opacity-75">Comienzo:</span>
                                                <h6 class="fs-2 fs-sm-4 m-0">{{ formatDateTime(match.matchStartAt) }} <sup>hs</sup></h6>
                                            </div>
                                            <div class="col-sm-6">
                                                <span class="small opacity-75">Finalización:</span>
                                                <h6 class="fs-2 fs-sm-4 m-0">{{ formatDateTime(match.matchEndAt) }} <sup>hs</sup></h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex">
                                    <div class="flex-shrink-0 me-4">
                                        <i class="bi bi-geo-alt-fill h2 opacity-75 mb-0"></i>
                                    </div>
                                    <div class="flex-grow-1">
                                        <h6 class="small mb-1">Sede y Direción:</h6>
                                        <div class="row g-3">
                                            <div class="col-sm-4">
                                                <span class="small opacity-75">Sede:</span>
                                                <h6 class="fs-2 fs-sm-4 m-0">{{ match.matchPlace }}</h6>
                                            </div>
                                            <div class="col-sm-8">
                                                <span class="small opacity-75">Dirección:</span>
                                                <h6 class="fs-2 fs-sm-4 m-0">{{ match.matchPlaceAddress }}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="accordion mb-4" id="accordionMatchBoardInfo">
                        <div class="accordion-item">
                            <div class="accordion-header">
                                <button class="accordion-button collapsed border-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                    <h6 class="mb-0">Sobre el Partido</h6>
                                </button>
                            </div>
                            <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionMatchBoardInfo">
                                <div class="accordion-body">
                                    <div class="row g-3 align-items-center">
                                        <div class="col-sm-6 col-lg-8">
                                            <div class="mb-4">
                                                <h6 class="small mb-1">Partido:</h6>
                                                <div class="row g-3">
                                                    <div class="col-6 col-lg-4">
                                                        <span class="small opacity-75">Tipo:</span>
                                                        <h6 class="m-0">{{ getMatchType(match.matchTypeId)?.label }}</h6>
                                                    </div>
                                                    <div class="col-6 col-lg-4">
                                                        <span class="small opacity-75">Género:</span>
                                                        <h6 class="m-0">{{ getMatchGender(match.matchGenderId)?.label }}</h6>
                                                    </div>
                                                    <div class="col-lg-4">
                                                        <span class="small opacity-75">Nivel:</span>
                                                        <h6 class="m-0">{{ getMatchLevel(match.matchLevelId)?.label }}</h6>
                                                    </div>
                                                </div>
                                            </div>
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
                                        <div class="col-sm-6 col-lg-4">
                                            <div class="card bg-transparent text-light border-0">
                                                <div class="card-body text-center">
                                                    <h6 class="small opacity-75 mb-1">Pronóstico para la fecha</h6>
                                                    <i class="bi bi-cloud-sun-fill fs-28 opacity-50"></i>
                                                    <p class="small lh-sm mt-1 mb-2">Parcialmente nublado</p>
                                                    <h6 class="lh-sm m-0">11ºC <sup>mín</sup> / 21ºC <sup>máx</sup></h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <MatchesBoardRegistrationForm 
                        v-if="pinValidated"
                        :match="match"/>

                    <h4 class="fs-6 fs-sm-8 mt-0 mb-4">Participantes:</h4>
                    <div class="row g-4">
                        <div class="col-sm-6">
                            
                            <MatchesPlayersRegistrationList
                                listType='confirmed'
                                title='Confirmados'
                                :matchId="match.id"
                                :playersLimit=match.matchMaxPlayers
                                mode='player'/>

                        </div>
                        <div class="col-sm-6">

                            <MatchesPlayersRegistrationList
                                listType='waiting'
                                title='En Espera'
                                :matchId="match.id"
                                :playersLimit=match.matchMaxPlayers
                                mode='player'/>

                        </div>
                    </div>

                    <div class="text-center">
                        <p class="small opacity-75 mb-0 mt-3">Última actualización: 23/06/2026 17:54 <sup>hs</sup></p>
                    </div>

                </div>

            </div>
        </section>

    </section>

</template>

<script setup>

    import MatchesBoardRegistrationForm from '@/features/matches/components/MatchesBoardRegistrationForm.vue'

    import MatchesPlayersRegistrationList from '@/features/matches/components/MatchesPlayersRegistrationList.vue'

    const props = defineProps({
        match: {
            type: Object,
            required: true
        },
        pinValidated: {
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