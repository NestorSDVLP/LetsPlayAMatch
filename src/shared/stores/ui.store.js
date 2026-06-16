/*
* Dependencias para construir el store de UI.
*/

import { defineStore } from 'pinia'
import { ref } from 'vue'

/*
* Store para el manejo de estados globales de la interfaz (UI).
*/

export const useUiStore = defineStore('ui', () => {

    /*
    * Estado reactivo que determina si hay una navegación en curso.
    */

    const isLoading = ref(false)

    /*
    * Modifica el estado del loader global.
    */
   
    const setLoading = (status) => {
        isLoading.value = status
    }

    return {
        isLoading,
        setLoading
    }
})