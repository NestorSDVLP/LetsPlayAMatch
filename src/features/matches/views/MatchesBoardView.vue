<template>

    <section class="has-padding-top">

        <MatchesBoard :match="matchesStore.match" />

    </section>

</template>

<script setup>

    import { onMounted } from 'vue'

    import { useRoute } from 'vue-router'

    import { useMatchesStore } from '@/features/matches/stores/matches.store'

    import { useMatchesPlayersStore } from '@/features/matches/stores/matches.players.store'

    import MatchesBoard from '@/features/matches/components/MatchesBoard.vue'

    const route = useRoute()

    const matchesStore = useMatchesStore()

    const playersStore = useMatchesPlayersStore()

    onMounted(async () => {

        await matchesStore.fetchMatchByURL(route.params.matchURL)

        await playersStore.fetchPlayers(matchesStore.match.id)

    })

</script>