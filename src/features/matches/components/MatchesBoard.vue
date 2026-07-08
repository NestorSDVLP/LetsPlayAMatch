<template>

    <section>

        <MatchesBoardPinForm
            v-if="match && !pinValidated"
            :match="match"
            @validated="pinValidated = true"/>

        <MatchesBoardInfo
            v-if="match"
            :match="match"
            :pin-validated="pinValidated"/>

    </section>

</template>

<script setup>

    import { ref } from 'vue'

    const pinValidated = ref(false)

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