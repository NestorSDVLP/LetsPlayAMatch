import { defineStore } from 'pinia'

import { 
    createMatchPlayer,
    getPlayersByMatchId,
    playerAlreadyRegistered,
    deleteMatchPlayer
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

            const exists = await playerAlreadyRegistered(
                matchId,
                matchPlayerData.matchPlayerPhone
            )

            if (exists) {
                throw new Error('PLAYER_ALREADY_REGISTERED')
            }

            return await createMatchPlayer({
                ...matchPlayerData,
                matchPlayerMatchId: matchId
            })

        },

        async fetchPlayers(matchId) {
            this.playersByMatch[matchId] = await getPlayersByMatchId(matchId)
        },

        async removeRegistration(matchPlayerId, matchId) {

            await deleteMatchPlayer(matchPlayerId)

            await this.fetchPlayers(matchId)

        },

    }

})