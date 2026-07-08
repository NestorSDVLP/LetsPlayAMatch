import Swal from 'sweetalert2'

import {
    MATCH_ACTIVITIES,
    MATCH_TYPES,
    MATCH_GENDERS,
    MATCH_LEVELS,
} from "@/features/matches/constants/matches.constants";

export const getMatchActivity = (id) =>
    MATCH_ACTIVITIES.find((item) => item.id === id);

export const getMatchType = (id) =>
    MATCH_TYPES.find((item) => item.id === id);

export const getMatchGender = (id) =>
    MATCH_GENDERS.find((item) => item.id === id);

export const getMatchLevel = (id) =>
    MATCH_LEVELS.find((item) => item.id === id);

/*********************************************** */

export const copyMatchURL = async (matchURL) => {

    const url = `${window.location.origin}/matches/view-board/${matchURL}`

    await navigator.clipboard.writeText(url)

    await Swal.fire({
        icon: 'success',
        title: 'URL copiada',
        timer: 1200,
        showConfirmButton: false
    })

}

/*********************************************** */

export const copyMatchPin = async (matchPin) => {

    await navigator.clipboard.writeText(matchPin)

    await Swal.fire({
        icon: 'success',
        title: 'PIN copiado',
        timer: 1200,
        showConfirmButton: false
    })

}

/*********************************************** */

export const copyMatchURLPin = async (matchURL, matchPin) => {

    const text = `Let's Play A Match: Esta es la información sobre el próximo partido y sus datos de acceso e inscripción.

Partido:
${window.location.origin}/matches/view-board/${matchURL}

PIN:
${matchPin}`

    await navigator.clipboard.writeText(text)

    await Swal.fire({
        icon: 'success',
        title: 'Invitación copiada',
        timer: 1200,
        showConfirmButton: false
    })

}