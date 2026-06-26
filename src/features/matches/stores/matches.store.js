import { defineStore } from 'pinia'

import { useTrainerStore } from '@/features/trainers/stores/trainers.store'

import {
    createMatch,
    updateMatch,
    getMatchById,
    getMatchByURL,
    getMatchesByTrainerId
} from '@/features/matches/services/matches.service'

export const useMatchesStore = defineStore('matches', {

    state: () => ({
        match: null,
        matches: []
    }),

    actions: {

        async fetchMatchByURL(URL) {

            console.log('fetchMatchByURL')

            try {

                this.match = await getMatchByURL(URL)

                console.log('match:', this.match)

                return this.match

            } catch(error) {

                console.error(
                    'fetchMatch:', id,
                    error
                )

                throw error

            }

        },

        async fetchMatchById(id) {

            console.log('fetchMatchById')

            try {

                this.match = await getMatchById(id)

                console.log('match:', this.match)

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

                console.log('trainerStore.trainer')
                console.log(trainerStore.trainer)

                const trainerId = trainerStore.trainer.uid

                console.log('trainerId')
                console.log(trainerId)

                this.matches = await getMatchesByTrainerId(
                    trainerId
                )

                console.log('matchesStore.matches')
                console.log(this.matches)

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
        }

    }

})