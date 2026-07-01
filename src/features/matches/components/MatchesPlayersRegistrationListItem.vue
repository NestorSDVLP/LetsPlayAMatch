<template>

    <li class="text-light px-0 py-2">
        <h6 class="m-0">{{ player.matchPlayerName  }}</h6>
        
        <div v-if="props.mode === 'trainer'" class="input-group input-group-sm mt-2 w-100">
            <input type="text" class="form-control" placeholder="Teléfono" :value="player.matchPlayerPhone" readonly>
            
            <button class="btn btn-dark" type="button">
                <i class="bi bi-copy"></i>
            </button>

            <button class="btn btn-dark" type="button">
                <i class="bi bi-x-lg"></i>
            </button>
        </div>
    </li>

</template>

<script setup>

    const props = defineProps({
        player: {
            type: Object,
            required: true
        },
        mode: {
            type: String,
            default: "player"
        }
    })

</script>