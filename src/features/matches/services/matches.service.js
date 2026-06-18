import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/shared/services/firebase'

/**
 * Verifica si el entrenador tiene perfil en Firestore.
 * Si no existe, lo crea con los campos iniciales vacíos.
 */

export const checkAndCreateMatch = async (authUser) => {

    // Referencia al documento usando el UID de autenticación como ID
    
    const trainerRef = doc(db, 'matches', authUser.uid)
    
    // Consultamos si ya existe el documento

    const docSnap = await getDoc(trainerRef)

    if (docSnap.exists()) {

        // Si existe, retornamos los datos actuales

        return docSnap.data()

    } else {

        // Si no existe, creamos el "molde" inicial

        const newTrainerData = {
            uid: authUser.uid,
            trainerUserName: authUser.email,
            trainerFirstName: '',
            trainerLastName: '',
            trainerAvatar: '',
            profileCompleted: false, // Bandera para obligar a completar perfil
            createdAt: new Date().getTime()
        }

        // Creamos el documento en la colección 'trainers'

        await setDoc(trainerRef, newTrainerData)
        
        return newTrainerData
    }
}

/************************ */

export const updateTrainer = async (uid, trainerData) => {

    const trainerRef = doc(db, 'trainers', uid)

    await setDoc(
        trainerRef,
        trainerData,
        { merge: true }
    )

}