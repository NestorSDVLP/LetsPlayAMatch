<template>

    <nav class="mt-4">
        <ul class="pagination justify-content-center">

            <!-- Previous -->

            <li class="page-item" :class="{ disabled: filters.page === 1 }">
                <button class="page-link" @click="goPrev">
                    <i class="bi bi-arrow-left-short"></i>
                </button>
            </li>

            <!-- Pages -->

            <li v-for="page in pages" :key="page" class="page-item" :class="{ active: page === filters.page }">
                <button class="page-link" @click="updateFilters({ page })">
                    {{ page }}
                </button>
            </li>

            <!-- Next -->

            <li class="page-item" :class="{ disabled: filters.page === totalPages }">
                <button class="page-link" @click="goNext">
                    <i class="bi bi-arrow-right-short"></i>
                </button>
            </li>

        </ul>
    </nav>

</template>

<script setup>

    /*
    *
    *
    * XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    *
    *
    */

    import { computed } from 'vue'
    import { usePetFilters } from '@/features/pets/composables/usePetsFilters'

    /*
    *
    *
    * XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    *
    *
    */

    const {
        filters,
        updateFilters,
        totalPages
    } = usePetFilters()

    /*
    *
    *
    * XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    *
    *
    */

    const pages = computed(() => {

        return Array.from(
            { length: totalPages.value },
            (_, i) => i + 1
        )

    })

    /*
    *
    *
    * XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    *
    *
    */

    const goPrev = () => {

        if (filters.value.page > 1) {

            updateFilters({
                page: filters.value.page - 1
            })

        }

    }

    /*
    *
    *
    * XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    *
    *
    */

    const goNext = () => {

        if (
            filters.value.page <
            totalPages.value
        ) {

            updateFilters({
                page: filters.value.page + 1
            })

        }

    }

</script>