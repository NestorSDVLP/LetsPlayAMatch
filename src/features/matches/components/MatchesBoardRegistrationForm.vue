<template>

    <section>
        <div class="text-center">
            <h3 class="h3 mb-2">Inscribite para participar</h3>
            <p class="opacity-75 lh-2 mb-4">Completa el siguiente formulario con tu datos.</p>
        </div>
        <form  novalidate @submit.prevent="onSubmit" class="mb-5 mb-sm-3">
            <div class="row g-3">
                <div class="col-sm-6">
                    <div class="form-floating">
                        <input type="text" class="form-control" :class="{ 'is-invalid': errors.matchPlayerName }" placeholder="Nombre" v-model="matchPlayerName">
                        <label>Nombre</label>
                    </div>
                    <div class="invalid-feedback d-block mt-1">
                        {{ errors.matchPlayerName }}
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-floating">
                        <input type="number" class="form-control" :class="{ 'is-invalid': errors.matchPlayerPhone }" placeholder="Teléfono" v-model="matchPlayerPhone">
                        <label>Teléfono</label>
                    </div>
                    <div class="invalid-feedback d-block mt-1">
                        {{ errors.matchPlayerPhone }}
                    </div>
                </div>
            </div>
            <div class="text-center text-sm-end mt-3">
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
        validationSchema: matchesPlayersSchema,
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

            await matchesPlayersStore.createRegistration(
                props.match.id,
                values
            )

            await matchesPlayersStore.fetchPlayers(props.match.id)

            resetForm()

            await Swal.fire({
                icon: 'success',
                title: 'Estás inscripto/a al partido',
                timer: 2000,
                showConfirmButton: false
            })


        } catch(error) {

            if (error.message === 'PLAYER_ALREADY_REGISTERED') {

                await Swal.fire({
                    icon: 'warning',
                    title: 'Ya estás inscripto',
                    text: 'Ese número de teléfono ya se encuentra registrado para este partido.'
                })

                return
            }

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