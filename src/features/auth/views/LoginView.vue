<template>

  <section class="has-padding-top mt-3">
    <div class="container">
      <div class="row g-5 align-items-center justify-content-center">
        <div class="col-sm-8 col-lg-8">
          <div class="bg-g8 text-w box-shadow px-4 py-5 p-sm-5 mb-5">
            
            <p v-if="errorFirebase" class="alert alert-danger text-center mb-4 small " role="alert">
              <i class="bi bi-exclamation-circle opacity-75 me-1"></i>
              {{ errorFirebase }}
            </p>

            <form novalidate @submit.prevent="handleLogin">
              <h1 class="h3 text-center mb-2">Ingresá como entrenador para administrar tu próximo partido</h1>
              <p class="text-center opacity-75 mb-4">Completá tus datos de ingreso</p>
              
              <div class="form-floating mb-3">
                <input 
                  v-model="email" 
                  type="email" 
                  class="form-control" 
                  :class="{ 'is-invalid': errors.email }"
                  id="inputEmail" 
                  placeholder="E-mail *"
                  autocomplete="email">
                <label for="inputEmail">E-mail *</label>
                <div class="invalid-feedback d-block mt-1">
                    {{ errors.email }}
                </div>
              </div>

              <div class="form-floating mb-2">
                <input 
                  v-model="password" 
                  type="password" 
                  class="form-control" 
                  :class="{ 'is-invalid': errors.password }"
                  id="inputPassword" 
                  placeholder="Contraseña *"
                  autocomplete="current-password">
                <label for="inputPassword">Contraseña *</label>
                <div class="invalid-feedback d-block mt-1">
                    {{ errors.password }}
                </div>
              </div>

              <p class="small opacity-75 mb-3">(*) Datos requeridos</p>

              <div class="row justify-content-center">
                <div class="col-lg-8 text-center">

                  <button class="btn btn-primary w-100" type="submit" :disabled="loading">

                    <template v-if="loading">
                      <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Ingresando...
                    </template>

                    <template v-else>
                      Ingresar <i class="bi bi-chevron-right ms-1"></i>
                    </template>

                  </button>
                </div>
              </div>

            </form>

          </div>
        </div>

      </div>
    </div>
  </section>

</template>

<script setup>

  import { ref } from 'vue'

  import { useForm, useField } from 'vee-validate'

  import { validationSchema } from '../schemas/auth.schema'

  import { useRouter } from 'vue-router'

  import { useAuthStore } from '../stores/auth.store'

  import { useTrainerStore } from '@/features/trainers/stores/trainers.store'

  console.log('***** LOGINVIEW NUEVO *****')
  console.log(import.meta.url)

  /************************************************ */

  const router = useRouter()

  const authStore = useAuthStore()

  const trainerStore = useTrainerStore()

  const loading = ref(false)

  const errorFirebase = ref('')

  /************************************************ */

  const { handleSubmit, errors } = useForm({

      validationSchema

  })
  
  /************************************************ */

  const { value: email } = useField('email')

  const { value: password } = useField('password')

  /************************************************ */

  const handleLogin = handleSubmit(async (values) => {

    console.log('VERSIÓN NUEVA DEL HANDLE LOGIN')

    loading.value = true
    errorFirebase.value = ''

    try {

        const result = await authStore.loginUser(
            values.email,
            values.password
        )

        console.log('LOGIN OK:', result.user)

        await trainerStore.initializeTrainer(result.user)

        console.log('TRAINER OK:', trainerStore.trainer)

        console.log('router:', router)
        console.log('typeof router.push:', typeof router.push)

        console.log('ANTES DEL PUSH')

        if (trainerStore.trainer.profileCompleted) {
            await router.push('/')
        } else {
            await router.push('/trainers/edit-trainer')
        }

        console.log('DESPUÉS DEL PUSH')

    } catch (error) {

        console.error('ERROR COMPLETO')
        console.error(error)
        console.error(error.stack)

    } finally {

        loading.value = false

    }

  })

</script>