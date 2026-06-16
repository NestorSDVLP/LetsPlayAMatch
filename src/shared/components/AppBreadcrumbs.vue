<template>

    <nav>

        <ol class="breadcrumb align-items-center m-0">

            <li v-for="item in items" :key="item.label" class="breadcrumb-item">

                <router-link v-if="item.to" :to="item.to">
                    {{ item.label }}
                </router-link>

                <span v-else>
                    {{ item.label }}
                </span>

            </li>

        </ol>

    </nav>

</template>

<script setup>

    defineProps({

        items: {
            type: Array,
            default: () => []
        }

    })

</script>