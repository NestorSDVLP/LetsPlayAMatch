import { defineStore } from 'pinia'

import { useTrainerStore } from '@/features/trainers/stores/trainers.store'

import {
    createMatch,
    updateMatch,
    getMatchById,
    getMatchByURL,
    getMatchesByTrainerId,
    deleteMatch,
    subscribeMatch
} from '@/features/matches/services/matches.service'

export const useMatchesStore = defineStore('matches', {

    state: () => ({
        match: null,
        matches: [],
        unsubscribeMatch: null
    }),

    actions: {

        async fetchMatchByURL(URL) {

            try {

                this.match = await getMatchByURL(URL)

                return this.match

            } catch(error) {

                console.error(
                    'fetchMatch:',
                    error
                )

                throw error

            }

        },

        async fetchMatchById(id) {

            try {

                this.match = await getMatchById(id)

                return this.match

            } catch(error) {

                console.error(
                    'fetchMatch:', id,
                    error
                )

                throw error

            }

        },

        async fetchTrainerMatches() {

            try {

                const trainerStore = useTrainerStore()

                const trainerId = trainerStore.trainer.uid

                this.matches = await getMatchesByTrainerId(
                    trainerId
                )

            } catch(error) {

                console.error(
                    'fetchTrainerMatches:',
                    error
                )

                throw error

            }

        },

        async createMatch(matchData) {

            try {

                const trainerStore = useTrainerStore()

                const newMatch = await createMatch({
                    ...matchData,
                    teamTrainerId: trainerStore.trainer.uid
                })

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
        },

        async removeMatch(matchId) {

            try {

                await deleteMatch(matchId)

                this.matches = this.matches.filter(
                    match => match.id !== matchId
                )

            } catch(error) {

                console.error(
                    'removeMatch:',
                    error
                )

                throw error

            }

        },

        subscribeToMatch(matchId) {

            if (this.unsubscribeMatch) {
                this.unsubscribeMatch()
            }

            this.unsubscribeMatch = subscribeMatch(
                matchId,
                (match) => {

                    this.match = match

                }
            )

        },

        unsubscribeFromMatch() {

            if (this.unsubscribeMatch) {

                this.unsubscribeMatch()

                this.unsubscribeMatch = null

            }

        },

    }

})