// Formateo fechas (Firestore Timestamp o Date)

export const formatDateTime = (value) => {

    if (!value) return '-'

    let date

    if (typeof value?.toDate === 'function') {
        date = value.toDate()          // Firestore Timestamp
    } else if (value instanceof Date) {
        date = value                   // Date
    } else {
        date = new Date(value)         // string o número
    }

    return new Intl.DateTimeFormat('es-AR', {
        dateStyle: 'short',
        timeStyle: 'short',
        hour12: false
    }).format(date)

}