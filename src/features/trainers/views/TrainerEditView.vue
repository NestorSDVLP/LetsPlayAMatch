<template>

    <TrainerForm
        v-if="trainerStore.trainer"
        :initial-data="trainerStore.trainer"
    />

</template>

<script setup>

    import TrainerForm from '@/features/trainers/components/TrainerForm.vue'
    import { useTrainerStore } from '@/features/trainers/stores/trainers.store'

    const trainerStore = useTrainerStore()

</script>