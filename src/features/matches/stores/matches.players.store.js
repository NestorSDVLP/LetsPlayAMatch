import { defineStore } from 'pinia'

import { 
    createMatchPlayer,
    getPlayersByMatchId 
} from '@/features/matches/services/matches.players.service'

export const useMatchesPlayersStore = defineStore('matches-players', {

    state: () => ({
        playersByMatch: {}
    }),

    /************************************* */
    
    getters: {

        /************************************* */

        confirmed: (state) => (matchId, limit) => {

            const players = state.playersByMatch[matchId] ?? []

            return players.slice(0, limit)
        },

        /************************************* */

        waiting: (state) => (matchId, limit) => {

            const players = state.playersByMatch[matchId] ?? []

            return players.slice(limit)
        },

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
            this.playersByMatch[matchId] = await getPlayersByMatchId(matchId)
        },

    }

})