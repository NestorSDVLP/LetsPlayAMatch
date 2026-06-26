<template>

    <section class="has-padding-top">

        <MatchesBoard 
            :match="matchesStore.currentMatch"/>

    </section>

</template>

<script setup>

    import { useRoute } from 'vue-router'

    import { useMatchesStore } from '@/features/matches/stores/matches.store'

    import MatchesBoard from '@/features/matches/components/MatchesBoard.vue'

    const route = useRoute()

    const matchesStore = useMatchesStore()

    await matchesStore.loadMatchByUrl(route.params.matchURL)

</script>