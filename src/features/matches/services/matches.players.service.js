import {
    collection,
    doc,
    setDoc
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