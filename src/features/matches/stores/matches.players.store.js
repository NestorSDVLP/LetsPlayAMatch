import { defineStore } from 'pinia'

import { 
    createMatchPlayer,
    getPlayersByMatchId 
} from '@/features/matches/services/matches.players.service'

export const useMatchesPlayersStore = defineStore('matches-players', {

    state: () => ({
        players: []
    }),

    /************************************* */
    
    getters: {

        confirmed: (state) => (limit) => {
            return state.players.slice(0, limit)
        },

        waiting: (state) => (limit) => {
            return state.players.slice(limit)
        }

    },

    actions: {

        async createRegistration(matchId, matchPlayerData) {

            try {

                return await createMatchPlayer({
                    ...matchPlayerData,
                    matchPlayerMatchId: matchId
                })

            } catch (error) {

                console.error('createRegistration:', error)
                throw error

            }

        },

        async fetchPlayers(matchId) {
            this.players = await getPlayersByMatchId(matchId)
        },

    }

})