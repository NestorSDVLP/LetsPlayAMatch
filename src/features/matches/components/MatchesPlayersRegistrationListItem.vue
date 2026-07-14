<template>

    <li class="fs-2 fs-sm-4 text-light px-0 py-2">
        <div class="row align-items-center">
            <div class="col-8">
                <h6 class="fs-2 fs-sm-4 m-0">{{ player.matchPlayerName  }}</h6>
            </div>
            <div v-if="props.mode === 'trainer'" class="col-4">
                <div class="btn-group btn-group-sm w-100">

                    <button 
                        class="btn btn-outline-light" 
                        type="button"
                        data-bs-toggle="modal"
                        :data-bs-target="`#matchPlayerRegistrationListItemModal-${player.id}`"
                        title="Ver información del jugador">
                        <i class="bi bi-person-fill"></i>
                    </button>

                    <button 
                        class="btn btn-outline-light" 
                        type="button"
                        @click="removePlayer"
                        title="Anular incripción">
                            <i class="bi bi-x-lg"></i>
                    </button>

                </div>

                <MatchesPlayersRegistrationListItemPlayerInfoModal :player="player"/>

            </div>
        </div>
    </li>

</template>

<script setup>

    import Swal from 'sweetalert2'

    import { useMatchesPlayersStore } from '@/features/matches/stores/matches.players.store'

    import MatchesPlayersRegistrationListItemPlayerInfoModal from '@/features/matches/components/MatchesPlayersRegistrationListItemPlayerInfoModal.vue'

    const matchesPlayersStore = useMatchesPlayersStore()

    const props = defineProps({
        player: {
            type: Object,
            required: true
        },
        matchId: {
            type: String,
            required: true
        },
        mode: {
            type: String,
            default: "player"
        }
    })

    /************************************* */

    const removePlayer = async () => {

        const confirmOne = await Swal.fire({

            icon: 'warning',
            title: 'Desvincular jugador',
            text: `¿Querés desvincular a ${props.player.matchPlayerName} de este partido?`,

            showCancelButton: true,
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar'

        })

        if (!confirmOne.isConfirmed) return

        const confirmTwo = await Swal.fire({

            icon: 'error',
            title: 'Acción irreversible',

            text: 'Esta inscripción será eliminada definitivamente. ¿Estás seguro?',

            showCancelButton: true,
            confirmButtonText: 'Eliminar inscripción',
            cancelButtonText: 'Cancelar'

        })

        if (!confirmTwo.isConfirmed) return

        await matchesPlayersStore.removeRegistration(
            props.player.id,
            props.matchId
        )
    }

</script>