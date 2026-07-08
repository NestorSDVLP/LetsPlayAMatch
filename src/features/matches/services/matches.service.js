import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    where,
    deleteDoc,
    onSnapshot
} from 'firebase/firestore'

import { db } from '@/shared/services/firebase'

/************************ */

export const getMatchByURL = async (URL) => {

    const matchRef = query(
        collection(db,"matches"),
        where("matchURL","==",URL)
        )

    const snapshot = await getDocs(matchRef)

    if (snapshot.empty) {

        return null
    }

    const match = snapshot.docs[0].data()

    return match
}

/************************ */

export const getMatchById = async (id) => {

    const matchRef = doc(db, 'matches', id)

    const snapshot = await getDoc(matchRef)

    if (!snapshot.exists()) {

        return null
    }

    const match = snapshot.data()

    return match
}

/************************ */

export const getMatchesByTrainerId = async (trainerId) => {

    const matchesRef = collection(db, 'matches')

    const q = query(
        matchesRef,
        where('teamTrainerId', '==', trainerId)
    )

    const snapshot = await getDocs(q)

    const matches = snapshot.docs.map(doc => doc.data())

    return matches
}

/************************ */

export const createMatch = async (matchData) => {

    const matchRef = doc(collection(db, 'matches'))

    const now = Date.now()

    const newMatch = {
        ...matchData,
        id: matchRef.id,
        matchStatusId: 'open',
        createdAt: now,
        updatedAt: now
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

/************************ */

export const subscribeMatch = (matchId, callback) => {

    const matchRef = doc(db, 'matches', matchId)

    return onSnapshot(matchRef, (snapshot) => {

        if (!snapshot.exists()) {
            callback(null)
            return
        }

        callback(snapshot.data())

    })

}