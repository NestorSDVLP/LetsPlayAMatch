<template>

    <section class="has-padding-top">
        <div class="container">
            <div class="bg-g8 text-w box-shadow px-4 py-5 p-sm-5">
                <h1 class="h2 mb-5">Editar Entrenador</h1>

                <form novalidate @submit.prevent="onSubmit">

                    <h2 class="h5">Datos Personales</h2>
                    <hr class="mb-4">
                    <div class="row">
                        <div class="col-sm-8">
                            <label class="h6">Usuario *</label>
                            <input type="text" class="form-control mb-3" :class="{ 'is-invalid': errors.trainerUserName }" placeholder="Usuario" readonly v-model="trainerUserName">
                            <div class="invalid-feedback d-block mt-1">
                                {{ errors.trainerUserName }}
                            </div>
                        </div>
                    </div>
                    <div class="row g-3">
                        <div class="col-sm-6 col-lg-3">
                            <label class="h6">Nombre *</label>
                            <input type="text" class="form-control" :class="{ 'is-invalid': errors.trainerFirstName }" placeholder="Nombre" v-model="trainerFirstName">
                            <div class="invalid-feedback d-block mt-1">
                                {{ errors.trainerFirstName }}
                            </div>
                        </div>
                        <div class="col-sm-6 col-lg-3">
                            <label class="h6">Apellido *</label>
                            <input type="text" class="form-control" :class="{ 'is-invalid': errors.trainerLastName }" placeholder="Apellido" v-model="trainerLastName">
                            <div class="invalid-feedback d-block mt-1">
                                {{ errors.trainerLastName }}
                            </div>
                        </div>
                        <div class="col-12">
                            <label class="h6">Avatar (URL) *</label>
                            <input type="text" class="form-control" :class="{ 'is-invalid': errors.trainerAvatar }" placeholder="Avatar (URL)" v-model="trainerAvatar">
                            <div class="invalid-feedback d-block mt-1">
                                {{ errors.trainerAvatar }}
                            </div>
                        </div>
                    </div>

                    <p class="small opacity-75 my-3">(*) Datos requeridos</p>

                    <div class="text-center">

                        <button class="btn btn-primary px-5 py-2" type="submit" :disabled="loading">

                            <template v-if="loading">
                                <span class="spinner-border spinner-border-sm me-2"></span>
                                Guardando...
                            </template>

                            <template v-else>
                                <i class="bi bi-check-circle-fill opacity-75 me-1"></i> Guardar Cambios
                            </template>

                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>

</template>

<script setup>

    /*
    * Dependencias
    */

    import { ref } from 'vue';
    import { useRoute } from 'vue-router'
    import { 
        useForm,
        useField 
        } from 'vee-validate'
    import Swal from 'sweetalert2'
    import { useTrainerStore } from '@/features/trainers/stores/trainers.store'
    import { trainersSchema } from '@/features/trainers/schemas/trainers.schema'

    const trainerStore = useTrainerStore()

    const route = useRoute()

    const props = defineProps({
        initialData: {
            type: Object,
            default: () => ({})
        }
    });

    const loading = ref(false); // Para el spinner del botón

    /****************************************** */

    const initialValues = {
        trainerUserName: '',
        trainerFirstName: '',
        trainerLastName: '',
        trainerAvatar: '',
        ...props.initialData
    }

    const { handleSubmit, errors } = useForm({
        trainersSchema,
        initialValues
    })

    /****************************************** */

    const { value: trainerUserName } = useField('trainerUserName')
    const { value: trainerFirstName } = useField('trainerFirstName')
    const { value: trainerLastName } = useField('trainerLastName')
    const { value: trainerAvatar } = useField('trainerAvatar')

    /****************************************** */

    const onSubmit = handleSubmit(async values => {

        try {

            loading.value = true

            await trainerStore.updateTrainerProfile(values)

            await Swal.fire({
                icon: 'success',
                title: 'Perfil actualizado',
                timer: 2000,
                showConfirmButton: false
            })

            router.push('/matches/new-match')

        } catch(error) {

            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo guardar el perfil'
            })

        } finally {

            loading.value = false

        }

    })

</script>