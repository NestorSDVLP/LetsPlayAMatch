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
    import { useRouter } from 'vue-router'
    import { useMatchesStore } from '@/features/matches/stores/matches.store'
    import MatchesBoardPinForm from '@/features/matches/components/MatchesBoardPinForm.vue'
    import MatchesBoardInfo from '@/features/matches/components/MatchesBoardInfo.vue'

    const matchesStore = useMatchesStore()

    const route = useRoute()

    onMounted(async () => {

        console.log('MatchesBoardView mounted')

        await matchesStore.fetchMatchById(route.params.id)

    })

</script>