<template>

    <section>
        <div class="text-center">
            <h3 class="h3 mb-2">Inscribite para participar</h3>
            <p class="opacity-75 mb-4">Completa el siguiente formulario con tu datos.</p>
        </div>
        <form  novalidate @submit.prevent="onSubmit">
            <div class="input-group">
                <div class="form-floating">
                    <input type="text" class="form-control" :class="{ 'is-invalid': errors.matchPlayerName }" placeholder="Nombre" v-model="matchPlayerName">
                    <label>Nombre</label>
                </div>
                <div class="invalid-feedback d-block mt-1">
                    {{ errors.matchPlayerName }}
                </div>
                <div class="form-floating">
                    <input type="tel" class="form-control" :class="{ 'is-invalid': errors.matchPlayerPhone }" placeholder="Teléfono" v-model="matchPlayerPhone">
                    <label>Teléfono</label>
                </div>
                <div class="invalid-feedback d-block mt-1">
                    {{ errors.matchPlayerPhone }}
                </div>
                
                <button class="btn btn-primary px-4" type="submit" :disabled="loading">

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
    import { useRouter } from 'vue-router'

    import { 
        useForm,
        useField 
        } from 'vee-validate'

    import Swal from 'sweetalert2'

    import { useMatchesPlayersStore } from '@/features/matches/stores/matches.players.store'
    import { createEmptyMatchPlayer } from '@/features/matches/models/matches.players.model'
    import { validationSchema } from '@/features/matches/validations/matches.players.schema'

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

    const { handleSubmit, errors } = useForm({
        validationSchema,
        initialValues
    })

    /****************************************** */

    const { value: matchPlayerName } = useField('matchPlayerName')
    const { value: matchPlayerPhone } = useField('matchPlayerPhone')

    /****************************************** */

    const router = useRouter()

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

            await Swal.fire({
                icon: 'success',
                title: 'Fuiste inscripto/a al partido con éxito',
                timer: 2000,
                showConfirmButton: false
            })

            router.push(`/matches/view-board/${props.match.id}`)

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