<template>

    <section class="bg-g3">
        <div class="row m-0">
            <div class="col-12 bg-g7 text-w p-3">
                <h6 class="text-capitalize text-center m-0">{{ match.matchActivityId }}</h6>
            </div>
            <div class="col-6 p-3">
                <h6 class="small m-0">Fecha y Hora:</h6>
                <div class="row g-3">
                    <div class="col-6">
                        <span class="small opacity-75">Comienzo:</span>
                        <h6 class="m-0">{{ formatDateTime(match.matchStartAt) }} <sup>hs</sup></h6>
                    </div>
                    <div class="col-6">
                        <span class="small opacity-75">Finalización:</span>
                        <h6 class="m-0">{{ formatDateTime(match.matchEndAt) }} <sup>hs</sup></h6>
                    </div>
                </div>
            </div>
            <div class="col-6 p-3">
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
            <div class="col-6 p-3">
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
            <div class="col-6 p-3">
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
        <div class="px-3">
            <div class="row g-3">
                <div class="col-8">
                    <span class="small opacity-75">URL:</span>
                    <h6 class="m-0">{{ match.matchURL }}</h6>
                </div>
                <div class="col-4">
                    <span class="small opacity-75">Pin:</span>
                    <h6 class="m-0">{{ match.matchPin }}</h6>
                </div>
            </div>
        </div>
        <div class="p-3">
            <div class="row g-0 m-0 justify-content-end">
                <div class="col-6 border-start">
                    <div class="btn-group btn-group-sm  w-100">
                        <button type="button" class="btn btn-outline-dark"><i class="bi bi-pencil-square"></i> Participantes</button>
                        <button type="button" class="btn btn-outline-dark"><i class="bi bi-pencil-square"></i> Editar</button>
                        <button type="button" class="btn btn-outline-dark"><i class="bi bi-trash3"></i> Eliminar</button>
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