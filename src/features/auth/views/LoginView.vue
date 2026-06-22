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
                  :class="{ 'is-invalid': emailError }"
                  id="inputEmail" 
                  placeholder="E-mail *"
                  autocomplete="email"
                >
                <label for="inputEmail">E-mail *</label>
                <div class="invalid-feedback">{{ emailError }}</div>
              </div>

              <div class="form-floating mb-2">
                <input 
                  v-model="password" 
                  type="password" 
                  class="form-control" 
                  :class="{ 'is-invalid': passwordError }"
                  id="inputPassword" 
                  placeholder="Contraseña *"
                  autocomplete="current-password"
                >
                <label for="inputPassword">Contraseña *</label>
                <div class="invalid-feedback">{{ passwordError }}</div>
              </div>

              <p class="small opacity-75 mb-3">(*) Datos requeridos</p>

              <div class="row justify-content-center">
                <div class="col-lg-8 text-center">
                  <!-- Mostrar un spiner mientras se procesa el loging -->
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

        <!--
        <div class="col-sm-4">
            <div class="text-center">
              <h4 class="h4 mb-1">Ingresá a LetsPlayAMatch&reg; usando tu cuenta de Google&reg;</h4>
              <p class="lh-sm opacity-75 mb-4">Te recordamos que no recopilaremos ninguna información sobre tu cuenta. Este modo de ingreso es para validar tu usuario en Google&reg;</p>
              <button 
                class="btn btn-primary btn-lg w-100 p-0"
                @click="handleGoogleLogin">
                    <h5 class="py-3 m-0"><i class="bi bi-google opacity-50 me-2"></i> Iniciar con Google&reg;</h5>
              </button>
            </div>
        </div>
        -->

      </div>
    </div>
  </section>

</template>

<script setup>

  import { ref, computed } from 'vue'
  import { useAuthStore } from '@/features/auth/stores/auth.store'
  import { useTrainerStore } from '@/features/trainers/stores/trainers.store'
  import { useRouter } from 'vue-router'

  /*
  *
  * Inicialización de dependencias y servicios
  * 
  */

  const authStore = useAuthStore() // Instancia del store global de Pinia
  const router = useRouter()       // Instancia del enrutador de Vue Router
  const trainerStore = useTrainerStore()

  /*
  *
  * Estado reactivo local (estado del formulario)
  * 
  */

  const email = ref('trainer@letsplayamatch.com')   // Almacena el texto que escribe el usuario en el input de email
  const password = ref('123456')                    // Almacena la contraseña escrita
  const enviado = ref(false)                        // Controla si el usuario ya intentó clickear el botón "Ingresar"
  const errorFirebase = ref('')                     // Almacena los mensajes de error que regresan del backend (Firebase)

  // Expresión regular estándar para verificar estructuras válidas de correo (ej: usuario@dominio.com)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  /*
  *
  * Propiedades computadas (validación en tiempo real)
  * 
  */

  /*
  * Evaluación del dato E-mail.
  * Escucha los cambios de 'enviado' y 'email'. Si hay fallas, retorna el string con el error.
  */

  const emailError = computed(() => {
      if (!enviado.value) return '' // No molestamos al usuario con errores rojos apenas entra a la vista
      if (!email.value.trim()) return 'Ingresá un E-mail.' // Validación de dato vacío
      if (!emailRegex.test(email.value)) return 'Ingresá un E-mail válido.' // Validación de formato técnico
      return '' // Si pasa todos los filtros, no hay error
  })

  /*
  *
  * Evaluación del dato Contraseña.
  * Verifica reglas mínimas de seguridad en el cliente antes de procesar el login.
  * 
  */

  const passwordError = computed(() => {
      if (!enviado.value) return '' // Oculto hasta que se intente el primer envío
      if (!password.value) return 'Tu contraseña es un dato requerido.' // Validación de dato vacío
      if (password.value.length < 6) return 'La contraseña debe tener al menos 6 caracteres.' // Regla mínima de Firebase
      return '' // Sin errores
  })

  /*
  *
  * Lógica de control y envío (método principal)
  * 
  */

  const loading = ref(false)

  const handleLogin = async () => {
      enviado.value = true       // Activamos el flag de envío para que las computed muestren los errores si los hay
      loading.value = true
      errorFirebase.value = ''   // Limpiamos cualquier error de Firebase de intentos fallidos anteriores

      /*
      * Primera línea de defensa (front-end / cliente)
      * Si alguna de las propiedades computadas devuelve texto de error, frenamos la ejecución.
      * De esta manera evitamos hacer peticiones de red innecesarias a Firebase con datos que ya sabemos que están mal.
      */

      if (emailError.value || passwordError.value) {
          loading.value = false
          return
      }

      /*
      * Segunda línea de defensa (back-end / servidor)
      * Si el formulario local es válido, procedemos a comunicarnos con el store de Pinia.
      */

      try {
          // Despachamos la acción asíncrona hacia el servicio que maneja el SDK de Firebase Auth
        
          const result = await authStore.loginUser(email.value, password.value)

          console.log('LOGIN OK:', result.user)

          await trainerStore.initializeTrainer(result.user)

          console.log('TRAINER OK:', trainerStore.trainer)
          
          if (trainerStore.trainer.profileCompleted) {
              router.push('/')
          } else {
              router.push('/trainers/edit-trainer')
          }
          
      } catch (error) {

          // Si las credenciales fallan, Firebase arroja una excepción que atrapamos en este bloque catch
          console.error('LOGIN ERROR:', error.code, error.message)
          
          /*
          * Traductor de códigos de error
          * Mapeamos las respuestas técnicas nativas de Firebase ('error.code')
          * a cadenas de texto amigables en español para que el usuario sepa qué pasó.
          */

          switch (error.code) {
              case 'auth/invalid-credential':
                  errorFirebase.value = 'El E-mail o la contraseña son incorrectos.'
                  break;
              case 'auth/user-disabled':
                  errorFirebase.value = 'Esta cuenta ha sido deshabilitada por el administrador.'
                  break;
              case 'auth/too-many-requests':
                  errorFirebase.value = 'Demasiados intentos fallidos. Intentá de nuevo más tarde.'
                  break;
              default:
                  errorFirebase.value = 'Ocurrió un error al intentar ingresar. Revisá tu conexión.'
          }
      } finally {
          loading.value = false
      }
      
  }

  const handleGoogleLogin = async () => {
      try {
          await authStore.loginUserWithGoogle()
          // Redirigir al usuario al home tras el éxito
          router.push({ name: 'home' }) 
      } catch (error) {
          // Aquí puedes mostrar un mensaje de error visual al usuario
          alert("Hubo un problema iniciando con Google: " + error.message)
      }
  }

</script>