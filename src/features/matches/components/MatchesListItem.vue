<template>

    <section>
        <div class="row m-0">
            <div class="col-12 bg-light p-3 border-bottom">
                <h5 class="text-capitalize text-center m-0">{{ match.matchActivityId }}</h5>
            </div>
            <div class="col-6 p-3 border-bottom border-start border-end">
                <h6 class="small m-0">Fecha y Hora:</h6>
                <div class="row g-3">
                    <div class="col-6">
                        <span class="small opacity-75">Comienzo:</span>
                        <h6 class="m-0">{{ match.matchStartAt }} <sup>hs</sup></h6>
                    </div>
                    <div class="col-6">
                        <span class="small opacity-75">Finalización:</span>
                        <h6 class="m-0">{{ match.matchEndAt }} <sup>hs</sup></h6>
                    </div>
                </div>
            </div>
            <div class="col-6 p-3 border-bottom border-end">
                <h6 class="small m-0">Partido:</h6>
                <div class="row g-3">
                    <div class="col-4">
                        <span class="small opacity-75">Tipo:</span>
                        <h6 class="text-capitalize m-0">{{ match.matchTypeId }}</h6>
                    </div>
                    <div class="col-4">
                        <span class="small opacity-75">Género:</span>
                        <h6 class="text-capitalize m-0">{{ match.matchGenderId }}</h6>
                    </div>
                    <div class="col-4">
                        <span class="small opacity-75">Nivel:</span>
                        <h6 class="text-capitalize m-0">{{ match.matchLevelId }}</h6>
                    </div>
                </div>
            </div>
            <div class="col-6 p-3 border-bottom border-start border-end">
                <div class="row g-3">
                    <div class="col-6">
                        <h6 class="small m-0">Cupos:</h6>
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
                        <h6 class="small m-0">Edad:</h6>
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
            <div class="col-6 p-3 border-bottom border-end">
                <h6 class="small m-0">Sede y Direción:</h6>
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
        </div>
    </section>

</template>

<script setup>

    import { createEmptyMatch } from '@/features/matches/models/matches.model'

    defineProps({
        match: {
            type: Object,
            default: createEmptyMatch
        }
    })

</script>