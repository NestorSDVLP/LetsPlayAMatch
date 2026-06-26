<template>

    <section>

    <MatchesBoardPinForm/>

    <MatchesBoardInfo
        v-if="match"
        :match="match"/>

    </section>

</template>

<script setup>

    const props = defineProps({
        match: {
            type: Object,
            required: true
        },
        initialData: {
            type: Object,
            default: () => ({})
        }
    })

    import MatchesBoardPinForm from '@/features/matches/components/MatchesBoardPinForm.vue'
    import MatchesBoardInfo from '@/features/matches/components/MatchesBoardInfo.vue'

</script>