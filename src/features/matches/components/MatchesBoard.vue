<template>

    <section>

    <MatchesBoardPinForm/>

    <MatchesBoardInfo
        v-if="matchesStore.match"
        :match="matchesStore.match"/>

    </section>

</template>

<script setup>

    import { onMounted } from 'vue'
    import { useMatchesStore } from '@/features/matches/stores/matches.store'
    import MatchesBoardPinForm from '@/features/matches/components/MatchesBoardPinForm.vue'
    import MatchesBoardInfo from '@/features/matches/components/MatchesBoardInfo.vue'

    const matchesStore = useMatchesStore()

    console.log('MatchesBoardView mounted')

    onMounted(async () => {

        console.log('MatchesBoardView mounted')

        await matchesStore.fetchMatchById("engfRmfamYo2ObfPXqxj")

    })

</script>