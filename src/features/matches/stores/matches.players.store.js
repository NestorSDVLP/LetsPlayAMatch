import { defineStore } from 'pinia'

import { createMatchPlayer } from '@/features/matches/services/matches.players.service'

export const useMatchesPlayersStore = defineStore('matches-players', {

    actions: {

        async createRegistration(MatchesPlayersData) {

            try {

                const newMatchPlayer = await createMatchPlayer({
                    ...MatchesPlayersData
                })

                this.newMatchPlayer = newMatchPlayer

                return newMatchPlayer

            } catch(error) {

                console.error(
                    'createRegistration:',
                    error
                )

                throw error

            }
        }

    }

})