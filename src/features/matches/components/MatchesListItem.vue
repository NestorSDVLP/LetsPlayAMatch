<template>

    <section>

        <h2 class="accordion-header">
            <button class="accordion-button ps-2 pe-4 px-sm-3" :class="{ collapsed: !isFirst }" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse-' + match.id ">
                <div class="w-100">
                    <div class="row align-items-center m-0">
                        <div class="col-lg-4">
                            <h3 class="fs-6 fs-sm-10 mt-0 mb-2 mb-lg-1">{{ getMatchActivity(match.matchActivityId)?.label }}</h3>
                            <h6 class="fs-2 fs-sm-4 opacity-50 m-0"><i class="bi bi-geo-alt-fill me-1"></i> {{ match.matchPlace }}</h6>
                        </div>
                        <div class="col-lg-8">
                            <h6 class="small d-none d-sm-block mb-1">Fecha y Hora:</h6>
                            <div class="row g-2">
                                <div class="col-sm-6">
                                    <p class="small opacity-75 mb-1">Comienzo:</p>
                                    <h6 class="fs-2 fs-sm-4 m-0"><i class="bi bi-clock-fill opacity-75 me-1"></i> {{ formatDateTime(match.matchStartAt) }} <sup>hs</sup></h6>
                                </div>
                                <div class="col-sm-6">
                                    <p class="small opacity-75 mb-1">Finalización:</p>
                                    <h6 class="fs-2 fs-sm-4 m-0"><i class="bi bi-clock-fill opacity-75 me-1"></i> {{ formatDateTime(match.matchEndAt) }} <sup>hs</sup></h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </button>
        </h2>
        
        <div :id="'collapse-' + match.id " class="accordion-collapse collapse" :class="{ show: isFirst }" data-bs-parent="#accordionMatchesList">
            <div class="accordion-body">

                <div class="row g-3 align-items-end">
                    <div class="col-lg-6">
                        <h6 class="small mb-1">Partido:</h6>
                        <div class="row g-2">
                            <div class="col-6 col-sm-4">
                                <p class="small opacity-75 mb-1">Tipo:</p>
                                <h6 class="fs-2 fs-sm-4 m-0">{{ getMatchType(match.matchTypeId)?.label }}</h6>
                            </div>
                            <div class="col-6 col-sm-4">
                                <p class="small opacity-75 mb-1">Género:</p>
                                <h6 class="fs-2 fs-sm-4 m-0">{{ getMatchGender(match.matchGenderId)?.label }}</h6>
                            </div>
                            <div class="col-sm-4">
                                <p class="small opacity-75 mb-1">Nivel:</p>
                                <h6 class="fs-2 fs-sm-4 m-0">{{ getMatchLevel(match.matchLevelId)?.label }}</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <h6 class="small mb-1">Sede y Direción:</h6>
                        <div class="row g-2">
                            <div class="col-sm-6">
                                <p class="small opacity-75 mb-1">Sede:</p>
                                <h6 class="fs-2 fs-sm-4 m-0">{{ match.matchPlace }}</h6>
                            </div>
                            <div class="col-sm-6">
                                <p class="small opacity-75 mb-1">Dirección:</p>
                                <h6 class="fs-2 fs-sm-4 m-0">{{ match.matchPlaceAddress }}</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="row g-2">
                            <div class="col-sm-6">
                                <h6 class="small mb-1">Cupos:</h6>
                                <div class="row g-3">
                                    <div class="col-6">
                                        <p class="small opacity-75 mb-1">Mín:</p>
                                        <h6 class="fs-2 fs-sm-4 m-0">{{ match.matchMinPlayers }}</h6>
                                    </div>
                                    <div class="col-6">
                                        <p class="small opacity-75 mb-1">Máx:</p>
                                        <h6 class="fs-2 fs-sm-4 m-0">{{ match.matchMaxPlayers }}</h6>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <h6 class="small mb-1">Edad:</h6>
                                <div class="row g-3">
                                    <div class="col-6">
                                        <p class="small opacity-75 mb-1">Mín:</p>
                                        <h6 class="fs-2 fs-sm-4 m-0">{{ match.matchMinAge }}</h6>
                                    </div>
                                    <div class="col-6">
                                        <p class="small opacity-75 mb-1">Máx:</p>
                                        <h6 class="fs-2 fs-sm-4 m-0">{{ match.matchMaxAge }}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-lg-4">
                        <h6 class="small mb-2">Accesos:</h6>
                        <button class="btn btn-outline-light w-100" type="button" @click="copyMatchURLPin(match.matchURL, match.matchPin)">
                            <i class="bi bi-copy opacity-75 me-1"></i> Copiar Invitación
                        </button>
                    </div>
                    <div class="col-sm-6 col-lg-4">
                        <div class="btn-group w-100">

                            <router-link  class="btn btn-outline-light" title="Editar" :to="{ name: 'edit-match', params: { id: match.id } }">
                                <i class="bi bi-pencil-square opacity-75 me-1"></i> Editar
                            </router-link>

                            <button 
                                type="button" 
                                class="btn btn-outline-light"
                                title="Eliminar"
                                @click="removeMatch">
                                <i class="bi bi-trash3 opacity-75 me-1"></i> Eliminar
                            </button>

                        </div>
                    </div>
                </div>
                
                <hr class="my-3">
                <h5 class="fs-6 fs-sm-8 mt-0 mb-4">Participantes</h5>
                <div class="row g-4">
                    <div class="col-sm-6">
                        
                        <MatchesPlayersRegistrationList
                            listType='confirmed'
                            title='Confirmados'
                            :matchId="match.id"
                            :playersLimit=match.matchMaxPlayers
                            mode='trainer'/>

                    </div>
                    <div class="col-sm-6">

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

    </section>

</template>

<script setup>

import Swal from 'sweetalert2'

    import { useMatchesStore } from '@/features/matches/stores/matches.store'
    import { deleteMatchPlayersByMatchId } from '@/features/matches/services/matches.players.service'

    import { createEmptyMatch } from '@/features/matches/models/matches.model'

    import MatchesPlayersRegistrationList from '@/features/matches/components/MatchesPlayersRegistrationList.vue'

    import { copyMatchURLPin } from '@/features/matches/utils/matches.ui.utils'

    const matchesStore = useMatchesStore()

    const props = defineProps({
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

    /************************************* */

    import { formatDateTime } from "@/shared/utils/ui.utils";

    /****************************************** */

    const removeMatch = async () => {


        const firstConfirm = await Swal.fire({

            icon: 'warning',
            title: 'Eliminar partido',

            text: 'Estás eliminando este partido completo. ¿Querés continuar?',

            showCancelButton: true,
            confirmButtonText: 'Sí, continuar',
            cancelButtonText: 'Cancelar'

        })


        if (!firstConfirm.isConfirmed) return



        const secondConfirm = await Swal.fire({

            icon: 'error',
            title: 'Acción irreversible',

            text: 'Se eliminará el partido y todas sus inscripciones definitivamente.',

            showCancelButton: true,
            confirmButtonText: 'Eliminar partido',
            cancelButtonText: 'Cancelar'

        })


        if (!secondConfirm.isConfirmed) return



        try {

            await deleteMatchPlayersByMatchId(
                props.match.id
            )


            await matchesStore.removeMatch(
                props.match.id
            )


            await Swal.fire({

                icon: 'success',
                title: 'Partido eliminado',
                timer: 1500,
                showConfirmButton: false

            })


        } catch(error) {

            console.error(error)

            Swal.fire({

                icon: 'error',
                title: 'Error',
                text: 'No se pudo eliminar el partido'

            })

        }

    }

</script>