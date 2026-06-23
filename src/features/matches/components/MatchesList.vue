<template>

    <section>
        <div class="container">
            <div class="bg-g8 text-light box-shadow p-3 p-sm-5">

                <h4>Listado de Partidos</h4>
                <hr class="mb-4">

                <AppRecordsEmptyState v-if="!matchesStore.matches.length"/>

                <div v-else>

                    <ul class="list-group list-group-flush">

                        <li
                            v-for="match in matchesStore.matches"
                            :key="match.id"
                            class="list-group-item border-0 p-0 mb-3">

                            <MatchesListItem :match="match"/>

                        </li>

                    </ul>

                </div>

            </div>
        </div>
    </section>

</template>

<script setup>

    import { onMounted } from 'vue'
    import { useMatchesStore } from '@/features/matches/stores/matches.store'
    import MatchesListItem from '@/features/matches/components/MatchesListItem.vue'
    import AppRecordsEmptyState from '@/shared/components/AppRecordsEmptyState.vue'

    const matchesStore = useMatchesStore()

    onMounted(async () => {

        console.log('MatchesList mounted')

        await matchesStore.fetchTrainerMatches()

    })

</script>