<template>

    <section>

        <section v-if="match">
            <div class="container">
                <div class="bg-g8 text-light box-shadow p-3 p-sm-5">

                    <div class="mb-4">
                        <div class="row g-3 align-items-end">
                            <div class="col-4 text-center">
                                <img :src="'/src/assets/images/activity_icons/vvo.png'" class="w-50 opacity-50 mb-3" style="filter: invert(1);">
                                <h2 class="h3 text-capitalize m-0">{{ match.matchActivityId }}</h2>
                            </div>
                            <div class="col-8">
                                <div class="d-flex mb-4">
                                    <div class="flex-shrink-0 me-4">
                                        <i class="bi bi-calendar2-week h2 opacity-75 mb-0"></i>
                                    </div>
                                    <div class="flex-grow-1">
                                        <h6 class="m-0">Fecha y Hora:</h6>
                                        <div class="row g-3">
                                            <div class="col-6">
                                                <span class="small opacity-75">Comienzo:</span>
                                                <h5 class="m-0">{{ formatDateTime(match.matchStartAt) }} <sup>hs</sup></h5>
                                            </div>
                                            <div class="col-6">
                                                <span class="small opacity-75">Finalización:</span>
                                                <h5 class="m-0">{{ formatDateTime(match.matchEndAt) }} <sup>hs</sup></h5>
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
                                            <div class="col-4">
                                                <span class="small opacity-75">Sede:</span>
                                                <h6 class="m-0">{{ match.matchPlace }}</h6>
                                            </div>
                                            <div class="col-8">
                                                <span class="small opacity-75">Dirección:</span>
                                                <h6 class="m-0">{{ match.matchPlaceAddress }}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="accordion accordion-flush mb-4" id="accordionMatchBoardInfo">
                        <div class="accordion-item">
                            <div class="accordion-header">
                                <button class="accordion-button collapsed border-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                    <h6 class="mb-0">Información sobre el Partido</h6>
                                </button>
                            </div>
                            <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionMatchBoardInfo">
                                <div class="accordion-body">
                                    <div class="row g-3 align-items-center">
                                        <div class="col-8">
                                            <div class="mb-4">
                                                <h6 class="small mb-1">Partido:</h6>
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
                                        <div class="col-4">
                                            <div class="card bg-transparent text-light border-0">
                                                <div class="card-body text-center">
                                                    <h6 class="small opacity-75 mb-1">Pronóstico para la fecha</h6>
                                                    <i class="bi bi-cloud-sun-fill display-3 opacity-50"></i>
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

                    <div class="bg-g7 p-3 p-sm-5 mb-4">
                        <MatchesBoardRegistrationForm/>
                    </div>

                    <div class="bg-g7 p-3 p-sm-5">
                        <h4 class="mb-3">Participantes:</h4>
                        <hr class="mb-3">
                        <div class="row g-3">
                            <div class="col-6">
                                <h6 class="d-block mb-2">Confirmados <span class="badge text-bg-dark">21</span></h6>
                                <ol class="mb-0">
                                    <li>Mateo González</li>
                                    <li>Valentina Rodríguez</li>
                                    <li>Santiago Fernández</li>
                                    <li>Martina López</li>
                                    <li>Benjamín Martínez</li>
                                    <li>Sofía Pérez</li>
                                    <li>Tomás Gómez</li>
                                    <li>Isabella Díaz</li>
                                    <li>Joaquín Romero</li>
                                    <li>Catalina Álvarez</li>
                                    <li>Lucas Torres</li>
                                    <li>Emilia Ruiz</li>
                                    <li>Bautista Flores</li>
                                    <li>Delfina Acosta</li>
                                    <li>Felipe Benítez</li>
                                    <li>Julieta Silva</li>
                                    <li>Ignacio Castro</li>
                                    <li>Lucía Molina</li>
                                    <li>Matías Ortiz</li>
                                    <li>Morena Suárez</li>
                                    <li>Agustín Morales</li>
                                </ol>
                            </div>
                            <div class="col-6">
                                <h6 class="d-block mb-2">Lista de Espera <span class="badge text-bg-dark">12</span></h6>
                                <ol class="mb-0">
                                    <li>Renata Vázquez</li>
                                    <li>Facundo Giménez</li>
                                    <li>Clara Herrera</li>
                                    <li>Nicolás Medina</li>
                                    <li>Pilar Cabrera</li>
                                    <li>Franco Rivas</li>
                                    <li>Abril Pereyra</li>
                                    <li>Bruno Navarro</li>
                                    <li>Victoria Domínguez</li>
                                    <li>Thiago Peralta</li>
                                    <li>Alma Sosa</li>
                                    <li>Lautaro Ibarra</li>
                                </ol>
                            </div>
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

    defineProps({
        match: {
            type: Object
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