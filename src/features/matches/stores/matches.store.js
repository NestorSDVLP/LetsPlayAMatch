import { defineStore } from 'pinia'
import {
    createMatch,
    updateMatch
} from '@/features/matches/services/matches.service'

export const useMatchesStore = defineStore('matches', {

    state: () => ({
        match: null
    }),

    actions: {

        async createMatch(matchData) {

            try {

                const newMatch = await createMatch(matchData)

                this.match = newMatch

                return newMatch

            } catch(error) {

                console.error(
                    'createMatch:',
                    error
                )

                throw error

            }

        },

        async updateMatch(matchId, newData) {

            try {

                const updatedMatch = {
                    ...this.match,
                    ...newData,
                    updatedAt: Date.now()
                }

                await updateMatch(
                    matchId,
                    updatedMatch
                )

                this.match = updatedMatch

            } catch(error) {

                console.error(
                    'updateMatch:',
                    error
                )

                throw error

            }

        },

        clearMatch() {
            this.match = null
        }

    }

})