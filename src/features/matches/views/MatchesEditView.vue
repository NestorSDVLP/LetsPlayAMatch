<template>

    <MatchesForm
        v-if="match"
        :initial-data="match"/>

</template>

<script setup>

    import { ref, onMounted } from 'vue'

    import { useRoute } from 'vue-router'

    import { useMatchesStore } from '@/features/matches/stores/matches.store'

    import { useMatchesStore } from '@/features/matches/stores/matches.store'

    import MatchesForm from '@/features/matches/components/MatchesForm.vue'

    const route = useRoute()
    const matchesStore = useMatchesStore()

    const match = ref(null)

    onMounted(async () => {
        match.value = await matchesStore.fetchMatchById(route.params.id)
    })

</script>