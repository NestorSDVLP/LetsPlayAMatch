import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    where,
    deleteDoc
} from 'firebase/firestore'

import { db } from '@/shared/services/firebase'

/************************ */

export const getMatchByURL = async (URL) => {

    console.log('getMatchByURL:', URL)

    const matchRef = query(
        collection(db,"matches"),
        where("matchURL","==",URL)
        )

    const snapshot = await getDocs(matchRef)

    if (snapshot.empty) {

        console.log('No existe el partido')

        return null
    }

    const match = snapshot.docs[0].data()

    console.log('match:', match)

    return match
}

/************************ */

export const getMatchById = async (id) => {

    console.log('getMatchById:', id)

    const matchRef = doc(db, 'matches', id)

    const snapshot = await getDoc(matchRef)

    if (!snapshot.exists()) {

        console.log('No existe el partido')

        return null
    }

    const match = snapshot.data()

    console.log('match:', match)

    return match
}

/************************ */

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

/************************ */

export const deleteMatch = async (matchId) => {

    const matchRef = doc(
        db,
        'matches',
        matchId
    )

    await deleteDoc(matchRef)

}