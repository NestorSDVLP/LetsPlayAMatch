/*
 * Convierte un string con formato:
 *
 * dd/mm/yyyy hh:mm
 *
 * en un objeto Date.
 *
 * Retorna:
 * - Date si es válido.
 * - null si es inválido.
 */

export function parseDateTime(value) {

    if (!value)
        return null

    const regex = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})$/

    const match = value.match(regex)

    if (!match)
        return null

    const [, day, month, year, hour, minute] = match

    const date = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour),
        Number(minute)
    )

    const valid =
        date.getFullYear() === Number(year) &&
        date.getMonth() === Number(month) - 1 &&
        date.getDate() === Number(day) &&
        date.getHours() === Number(hour) &&
        date.getMinutes() === Number(minute)

    return valid ? date : null

}


/*************************************************** */

export function formatDateTime(value) {

    if (!value)
        return ''

    const date = value instanceof Date
        ? value
        : value.toDate
            ? value.toDate()
            : new Date(value)

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    const hour = String(date.getHours()).padStart(2, '0')
    const minute = String(date.getMinutes()).padStart(2, '0')

    return `${day}/${month}/${year} ${hour}:${minute}`

}


/*
 * Indica si una fecha/hora es válida.
 */

export function isValidDateTime(value) {

    return parseDateTime(value) !== null

}

/*
 * Valida que el rango sea correcto.
 *
 * La fecha/hora de fin debe ser posterior
 * a la fecha/hora de inicio.
 */

export function isValidDateRange(startValue, endValue) {

    const start = parseDateTime(startValue)
    const end = parseDateTime(endValue)

    if (!start || !end)
        return false

    return end > start

}