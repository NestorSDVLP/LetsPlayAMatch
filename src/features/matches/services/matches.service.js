import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where
} from 'firebase/firestore'

import { db } from '@/shared/services/firebase'

export const getMatchesByTrainerId = async (trainerId) => {

    console.log('getMatchesByTrainerId:', trainerId)

    const matchesRef = collection(db, 'matches')

    const q = query(
        matchesRef,
        where('teamTrainerId', '==', trainerId)
    )

    const snapshot = await getDocs(q)

    const matches = snapshot.docs.map(doc => doc.data())

    console.log('matches encontrados:', matches)

    return matches
}

/************************ */

export const createMatch = async (matchData) => {

    const matchRef = doc(collection(db, 'matches'))

    const newMatch = {
        ...matchData,
        id: matchRef.id,
        matchStatusId: 'open',
        createdAt: Date.now()
    }

    await setDoc(matchRef, newMatch)

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