import { defineStore } from 'pinia'
import { 
    updateMatch
} from '@/features/matches/services/matches.service'

export const useMatchesStore = defineStore('matches', {
    
    state: () => ({
        match: null, // Acá guardamos el Match completo
    }),

    actions: {

        clearMatch() {
            this.match = null
        }

    }
})