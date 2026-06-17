import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut, 
    GoogleAuthProvider, // Importar el proveedor
    signInWithPopup,    // Importar el método para abrir el popup
    signInWithRedirect
} from 'firebase/auth'

import { firebaseApp } from '@/shared/services/firebase'

export const auth = getAuth(firebaseApp)

/*
*   Instanciamos el proveedor de Google
*/
const googleProvider = new GoogleAuthProvider()

export const login = (email, password) => {

    return signInWithEmailAndPassword(auth, email, password)

}

/*
*   Nueva función para Google Auth
*/
export const loginWithGoogle = () => {
    /*
    *   Usamos signInWithPopup para una experiencia fluida dentro de la SPA
    */
    // return signInWithPopup(auth, googleProvider)

    /*
    * 2. Usamos redirect para evitar bloqueos del navegador
    */
    return signInWithRedirect(auth, googleProvider)
}

export const logout = () => {

    return signOut(auth)

}