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
                        <h6 class="small mb-1">Participantes:</h6>
                        <div class="row g-3">
                            <div class="col-6">
                                <span class="small opacity-75">Confirmados:</span>
                                <ol>
                                    <li><strong>Mateo González:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 2345-6789</a></li>
                                    <li><strong>Valentina Rodríguez:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 3456-7890</a></li>
                                    <li><strong>Santiago Fernández:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 4567-8901</a></li>
                                    <li><strong>Martina López:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 5678-9012</a></li>
                                    <li><strong>Benjamín Martínez:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 6789-0123</a></li>
                                    <li><strong>Sofía Pérez:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 7890-1234</a></li>
                                    <li><strong>Tomás Gómez:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 8901-2345</a></li>
                                    <li><strong>Isabella Díaz:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 9012-3456</a></li>
                                    <li><strong>Joaquín Romero:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 2123-4567</a></li>
                                    <li><strong>Catalina Álvarez:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 3234-5678</a></li>
                                    <li><strong>Lucas Torres:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 4345-6789</a></li>
                                    <li><strong>Emilia Ruiz:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 5456-7890</a></li>
                                    <li><strong>Bautista Flores:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 6567-8901</a></li>
                                    <li><strong>Delfina Acosta:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 7678-9012</a></li>
                                    <li><strong>Felipe Benítez:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 8789-0123</a></li>
                                    <li><strong>Julieta Silva:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 9890-1234</a></li>
                                    <li><strong>Ignacio Castro:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 2234-5678</a></li>
                                    <li><strong>Lucía Molina:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 3345-6789</a></li>
                                    <li><strong>Matías Ortiz:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 4456-7890</a></li>
                                    <li><strong>Morena Suárez:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 5567-8901</a></li>
                                    <li><strong>Agustín Morales:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 6678-9012</a></li>
                                </ol>
                            </div>
                            <div class="col-6">
                                <span class="small opacity-75">Lista de Espera:</span>
                                <ol>
                                    <li><strong>Renata Vázquez:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 7789-0123</a></li>
                                    <li><strong>Facundo Giménez:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 8890-1234</a></li>
                                    <li><strong>Clara Herrera:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 9901-2345</a></li>
                                    <li><strong>Nicolás Medina:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 2012-3456</a></li>
                                    <li><strong>Pilar Cabrera:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 3123-4567</a></li>
                                    <li><strong>Franco Rivas:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 4234-5678</a></li>
                                    <li><strong>Abril Pereyra:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 5345-6789</a></li>
                                    <li><strong>Bruno Navarro:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 6456-7890</a></li>
                                    <li><strong>Victoria Domínguez:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 7567-8901</a></li>
                                    <li><strong>Thiago Peralta:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 8678-9012</a></li>
                                    <li><strong>Alma Sosa:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 9789-0123</a></li>
                                    <li><strong>Lautaro Ibarra:</strong> <a href="#" class="text-light text-decoration-none opacity-75">+54 9 11 2098-7654</a></li>
                                </ol>
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