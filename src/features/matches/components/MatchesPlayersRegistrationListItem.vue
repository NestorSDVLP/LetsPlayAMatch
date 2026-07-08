<template>

    <li class="fs-2 fs-sm-4 text-light px-0 py-2">
        <h6 class="fs-2 fs-sm-4 m-0">{{ player.matchPlayerName  }}</h6>
        
        <div v-if="props.mode === 'trainer'" class="input-group input-group-sm mt-2 w-100">
            <input type="text" class="form-control" placeholder="Teléfono" :value="player.matchPlayerPhone" readonly>
            
            <button 
                class="btn btn-outline-light" 
                type="button"
                @click="copyPlayerPhone(player.matchPlayerPhone)">
                <i class="bi bi-copy"></i>
            </button>

            <button 
                class="btn btn-outline-light" 
                type="button"
                @click="removePlayer">
                    <i class="bi bi-x-lg"></i>
            </button>

        </div>
    </li>

</template>

<script setup>

    import Swal from 'sweetalert2'

    import { useMatchesPlayersStore } from '@/features/matches/stores/matches.players.store'

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

    /************************************* */

    const copyPlayerPhone = async (playerPhone) => {

        await navigator.clipboard.writeText(playerPhone)

        await Swal.fire({
            icon: 'success',
            title: 'Teléfono copiado',
            timer: 1200,
            showConfirmButton: false
        })

    }

</script>