<template>

    <section>
        <div class="container">
            <div class="bg-g8 text-w box-shadow px-4 py-5 p-sm-5">

                <h2 class="fs-10 fs-sm-12 mb-4">Listado de Partidos</h2>

                <AppRecordsEmptyState v-if="!matchesStore.matches.length"/>

                <div v-else>

                    <div class="accordion" id="accordionMatchesList">

                        <div 
                            class="accordion-item"
                            v-for="(match, index) in matchesStore.matches"
                            :key="match.id">

                                <MatchesListItem 
                                    :match="match"
                                    :is-first="index === 0"/>
                                
                        </div>

                    </div>

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