<template>

    <section class="py-5">
        <div class="container">
            <h1 class="h2">Perfil del Entrenador</h1>
            <hr class="mb-4">

            <div class="bg-light text-dark box-shadow p-3 p-sm-5">
                <form novalidate @submit.prevent="handleSubmit">

                    <h2 class="h5"><i class="bi bi-person-fill opacity-50 me-1"></i> Datos Personales</h2>
                    <hr class="mb-4">
                    <div class="row g-3">
                        <div class="col-6">
                            <label class="h6">Usuario *</label>
                            <input type="text" class="form-control" placeholder="Usuario" readonly required v-model="formData.trainerUserName">
                        </div>
                        <div class="col-3">
                            <label class="h6">Nombre *</label>
                            <input type="text" class="form-control" placeholder="Nombre" required v-model="formData.trainerFirstName">
                        </div>
                        <div class="col-3">
                            <label class="h6">Apellido *</label>
                            <input type="text" class="form-control" placeholder="Apellido" required v-model="formData.trainerLastName">
                        </div>
                        <div class="col-6">
                            <label class="h6">Avatar (URL) *</label>
                            <input type="text" class="form-control" placeholder="Avatar (URL)" required v-model="formData.trainerAvatar">
                        </div>
                    </div>

                    <p class="small opacity-75 my-3">(*) Datos requeridos</p>

                    <div class="text-center">
                        
                        <!-- Mostrar un spiner mientras se procesa el loging -->

                        <button class="btn btn-primary rounded-pill px-5 py-2" type="submit" :disabled="loading">

                            <template v-if="loading">
                                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
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
    import { useTrainerStore } from '@/features/trainers/stores/trainers.store'
    import { useRouter } from 'vue-router'

    const trainerStore = useTrainerStore()

    const router = useRouter()

    // Define el estado inicial

    const initialState = {
        trainerUserName: '',
        trainerFirstName: '',
        trainerLastName: '',
        trainerAvatar: '',
        createdAt: '',
    };

    const props = defineProps({
        initialData: {
            type: Object,
            default: () => ({})
        }
    });

    /* 
    * Mejorar la inicialización para que siempre 
    * combine ambos, asegurando que si falta algo 
    * en initialData, el estado tenga un 
    * valor por defecto:
    */ 

    const formData = ref({ 
        ...initialState, 
        ...props.initialData 
    });

    const loading = ref(false); // Para el spinner del botón

    /****************************************** */

    const handleSubmit = async () => {

        try {

            loading.value = true

            await trainerStore.updateTrainerProfile(formData.value)

            await router.push('/matches/new-match')

        } catch(error) {

            console.error(
                'handleSubmit: Error al guardar el perfil:',
                error
            )

        } finally {

            loading.value = false

        }

    }

</script>