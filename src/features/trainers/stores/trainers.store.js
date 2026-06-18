import { defineStore } from 'pinia'
import { 
    checkAndCreateTrainerProfile,
    updateTrainer 
} from '@/features/trainers/services/trainers.service'

export const useTrainerStore = defineStore('trainer', {
    
    state: () => ({
        trainer: null, // Acá guardamos el perfil completo
    }),

    actions: {
        async initializeTrainer(authUser) {
            try {
            
            // Llamamos al servicio para chequear o crear
            const profile = await checkAndCreateTrainerProfile(authUser)
            this.trainer = profile
            return profile

            } catch (error) {

            console.error("Error al inicializar el perfil del entrenador:", error)
            throw error

            }
        },

        // Una acción extra que vamos a necesitar pronto para cuando completen los datos

        async updateTrainerProfile(newData) {

            try {

                const updatedTrainer = {
                    ...this.trainer,
                    ...newData,
                    profileCompleted: true,
                    updatedAt: Date.now()
                }

                await updateTrainer(
                    this.trainer.uid,
                    updatedTrainer
                )

                this.trainer = updatedTrainer

            } catch(error) {

                console.error(
                    'updateTrainerProfile: Error al actualizar el perfil:',
                    error
                )

                throw error

            }

        },

        clearTrainer() {
            this.trainer = null
        }

    }
})