<template>

    <li>
        
        {{ player.matchPlayerName  }}

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