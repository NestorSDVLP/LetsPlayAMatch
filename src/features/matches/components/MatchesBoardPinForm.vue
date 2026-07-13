<template>

    <section>
        <div class="container">
            <div class="bg-g8 text-w box-shadow px-4 py-5 p-sm-5 mb-3">
                <div class="row g-3 align-items-end">
                    <div class="col-sm-5 text-center text-sm-start">
                        <div class=" m-0">
                            <i class="bi bi-box-arrow-in-right opacity-50 fs-28"></i>
                        </div>
                        <h2 class="h2 mb-2">Ingresá el Pin</h2>
                        <p class="opacity-75 mb-3mb-sm-0">Este código de 6 dígitos numéricos <br class="d-none d-sm-block">fue asignado por tu entrenador/a</p>
                    </div>
                    <div class="col-sm-7">
                        <form novalidate @submit="validatePin">
                            <div class="input-group">
                                <div class="form-floating">
                                    <input
                                        v-model="matchPlayerPin"
                                        type="text"
                                        inputmode="numeric"
                                        class="form-control"
                                        :class="{ 'is-invalid': errors.matchPlayerPin }"
                                        v-maska 
                                        data-maska="######" 
                                        placeholder="Pin"/> 
                                    <label>Pin</label>
                                </div>
                                                                   

                                <button class="btn btn-primary px-4" type="submit">
                                        <i class="bi bi-check-circle-fill opacity-75 me-1"></i> Ingresar
                                </button>
                            </div>
                            <div class="invalid-feedback d-block mt-1">
                                {{ errors.matchPlayerPin }}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script setup>

    import { 
        useForm,
        useField 
        } from 'vee-validate'

    import Swal from 'sweetalert2'

    import { matchesPlayersPinSchema } from '@/features/matches/schemas/matches.players.pin.schema'

    const props = defineProps({
        match: {
            type: Object,
            required: true
        }
    })

    /*********************************** */

    const emit = defineEmits(['validated'])

    /*********************************** */

    const { errors, handleSubmit } = useForm({
        validationSchema: matchesPlayersPinSchema
    })

    /*********************************** */

    const validatePin = handleSubmit(async values => {

        if (!props.match.matchPin) {
            emit('validated')
            return
        }

        if (values.matchPlayerPin == props.match.matchPin) {
            emit('validated')

            await Swal.fire({
                icon: 'success',
                title: 'Pin correcto',
                text: 'Podés inscribirte con ese Pin',
                timer: 2500,
                showConfirmButton: false
            })

        } else {
            await Swal.fire({
                icon: 'error',
                title: 'Pin incorrecto',
                text: 'No podés inscribirte con ese Pin'
            })
        }

    })

    /*********************************** */

    const { value: matchPlayerPin } = useField('matchPlayerPin')

</script>