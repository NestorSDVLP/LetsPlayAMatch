import {
    collection,
    doc,
    setDoc
} from 'firebase/firestore'

import { db } from '@/shared/services/firebase'

import { useTrainerStore } from '@/features/trainers/stores/trainers.store'

export const createMatch = async (matchData) => {

    const trainerStore = useTrainerStore()

    if (!trainerStore.trainer) {
        throw new Error('Cannot create match: trainer profile not initialized')
    }

    const matchRef = doc(collection(db, 'matches'))

    const newMatch = {
        ...matchData,

        id: matchRef.id,

        teamTrainerId: trainerStore.trainer.uid,
        
        matchStatusId: 'open',
        createdAt: Date.now()
    }

    await setDoc(
        matchRef,
        newMatch
    )

    return newMatch
}

/************************ */

export const updateMatch = async (matchId, matchData) => {

    const matchRef = doc(
        db,
        'matches',
        matchId
    )

    await setDoc(
        matchRef,
        matchData,
        { merge: true }
    )

}