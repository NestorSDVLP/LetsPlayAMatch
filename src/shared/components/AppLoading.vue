<template>
    <div v-if="uiStore.isLoading" class="app-loading-backdrop">
        <div class="app-loading-spinner spinner-border spinner-border text-primary"></div>
    </div>
</template>

<script setup>

    import { useUiStore } from '@/shared/stores/ui.store'

    const uiStore = useUiStore()

</script>