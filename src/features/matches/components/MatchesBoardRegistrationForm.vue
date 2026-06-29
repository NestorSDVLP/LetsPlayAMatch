<template>

    <section>
        <div class="text-center">
            <h3 class="h3 mb-2">Inscribite para participar</h3>
            <p class="opacity-75 mb-4">Completa el siguiente formulario con tu datos.</p>
        </div>
        <form  novalidate @submit.prevent="onSubmit">
            <div class="row g-3">
                <div class="col-6">
                    <div class="form-floating">
                        <input type="text" class="form-control" :class="{ 'is-invalid': errors.matchPlayerName }" placeholder="Nombre" v-model="matchPlayerName">
                        <label>Nombre</label>
                    </div>
                    <div class="invalid-feedback d-block mt-1">
                        {{ errors.matchPlayerName }}
                    </div>
                </div>
                <div class="col-6">
                    <div class="form-floating">
                        <input type="number" class="form-control" :class="{ 'is-invalid': errors.matchPlayerPhone }" placeholder="Teléfono" v-model="matchPlayerPhone">
                        <label>Teléfono</label>
                    </div>
                    <div class="invalid-feedback d-block mt-1">
                        {{ errors.matchPlayerPhone }}
                    </div>
                </div>
            </div>
            <div class="text-end mt-3">
                <button class="btn btn-primary px-5 py-2" type="submit" :disabled="loading">

                    <template v-if="loading">
                        <span class="spinner-border spinner-border-sm me-2"></span>
                        Inscribiendo...
                    </template>

                    <template v-else>
                        <i class="bi bi-check-circle-fill opacity-75 me-1"></i> Inscribirme
                    </template>
                    
                </button>
            </div>
        </form>
    </section>

</template>

<script setup>

    import { ref } from 'vue'

    import { 
        useForm,
        useField 
        } from 'vee-validate'

    import Swal from 'sweetalert2'

    import { useMatchesPlayersStore } from '@/features/matches/stores/matches.players.store'
    import { createEmptyMatchPlayer } from '@/features/matches/models/matches.players.model'
    import { matchesPlayersSchema } from '@/features/matches/schemas/matches.players.schema'

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

    const loading = ref(false); // Para el spinner del botón

    const matchesPlayersStore = useMatchesPlayersStore()

    /****************************************** */

    const initialValues = {
        ...createEmptyMatchPlayer(),
        ...props.initialData
    }

    const { handleSubmit, errors, resetForm } = useForm({
        matchesPlayersSchema,
        initialValues
    })

    /****************************************** */

    const { value: matchPlayerName } = useField('matchPlayerName')
    const { value: matchPlayerPhone } = useField('matchPlayerPhone')

    /****************************************** */

    const onSubmit = handleSubmit(async values => {

        try {

            loading.value = true

            console.log('ENTRO AL SUBMIT')
            console.log(values)

            await matchesPlayersStore.createRegistration({
                ...values,
                matchPlayerMatchId: props.match.id
            })

            await matchesPlayersStore.fetchPlayers(props.match.id)

            resetForm()

            await Swal.fire({
                icon: 'success',
                title: 'Fuiste inscripto/a al partido con éxito',
                timer: 2000,
                showConfirmButton: false
            })


        } catch(error) {

            console.error(error)

            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo generar tu inscripción al partido'
            })

        } finally {

            loading.value = false

        }

    })

</script>