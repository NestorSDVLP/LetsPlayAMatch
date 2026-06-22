<template>

    <section>
        <div class="container">
            <div class="bg-g8 text-light box-shadow p-3 p-sm-5">

                <h2>Listado de Partidos</h2>
                <hr class="mb-4">

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
    </section>

</template>

<script setup>

    import { onMounted } from 'vue'
    import { useMatchesStore } from '@/features/matches/stores/matches.store'
    import MatchesListItem from '@/features/matches/components/MatchesListItem.vue'

    const matchesStore = useMatchesStore()

    onMounted(async () => {

        console.log('MatchesList mounted')

        await matchesStore.fetchTrainerMatches()

    })

</script>