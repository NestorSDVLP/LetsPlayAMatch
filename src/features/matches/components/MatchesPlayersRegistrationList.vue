<template>

    <section>

        <h6 class="d-block mb-2">
            {{ props.title }}
            <span class="badge text-bg-dark">{{ matchesPlayersList.length }}</span>
        </h6>
        <ol class="ps-3 mb-0">

            <MatchesPlayersRegistrationListItem
                v-for="player in matchesPlayersList"
                :key="player.id"
                :player="player"
                :mode="mode"/>

        </ol>

    </section>    

</template>

<script setup>

    import { computed, onMounted } from 'vue'

    import { useMatchesPlayersStore } from '@/features/matches/stores/matches.players.store'

    import MatchesPlayersRegistrationListItem from '@/features/matches/components/MatchesPlayersRegistrationListItem.vue'

    const props = defineProps({
        listType: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        matchId: {
            type: String,
            required: true
        },
        playersLimit: {
            type: Number,
            required: true,
        },
        mode: {
            type: String,
            default: "player",
        },
    })

    /************************************* */

    const playersStore = useMatchesPlayersStore()

    /************************************* */

    onMounted(async () => {

        console.log("RegistrationList mounted:", props.matchId)

        if (!playersStore.playersByMatch[props.matchId]) {
            await playersStore.fetchPlayers(props.matchId)
        }

        console.log(playersStore.playersByMatch)

    })

    const matchesPlayersList = computed(() => {

        if (props.listType === "confirmed") {

            return playersStore.confirmed(
                props.matchId,
                props.playersLimit
            )

        }

        return playersStore.waiting(
            props.matchId,
            props.playersLimit
        )
    })
    
</script>