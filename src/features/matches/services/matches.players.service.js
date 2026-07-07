import {
    collection,
    doc,
    setDoc,
    getDocs,
    query,
    where,
    deleteDoc
} from 'firebase/firestore'

import { db } from '@/shared/services/firebase'

/************************ */

export const createMatchPlayer = async (matchPlayerData) => {

    const matchPlayerRef = doc(collection(db, 'matchPlayers'))

    const newMatchPlayer = {
        ...matchPlayerData,
        id: matchPlayerRef.id,
        matchPlayerCreatedAt: Date.now()
    }

    await setDoc(matchPlayerRef, newMatchPlayer)

    return newMatchPlayer
}

/************************ */

export const getPlayersByMatchId = async (matchId) => {

    const q = query(
        collection(db, 'matchPlayers'),
        where('matchPlayerMatchId', '==', matchId)
    )

    const snapshot = await getDocs(q)

    return snapshot.docs
        .map(doc => doc.data())
        .sort((a, b) => a.matchPlayerCreatedAt - b.matchPlayerCreatedAt)
}

/************************ */

export const playerAlreadyRegistered = async (matchId, phone) => {

    const q = query(
        collection(db, 'matchPlayers'),
        where('matchPlayerMatchId', '==', matchId),
        where('matchPlayerPhone', '==', phone)
    )

    const snapshot = await getDocs(q)

    return !snapshot.empty

}

/************************ */

export const deleteMatchPlayer = async (matchPlayerId) => {

    const matchPlayerRef = doc(
        db,
        'matchPlayers',
        matchPlayerId
    )

    await deleteDoc(matchPlayerRef)

}