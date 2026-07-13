/*************************************************** */

export function normalizeWhatsappPhone(phone) {

    return phone
        .replace(/\D/g, '')
        .replace(/^54/, '')
        .replace(/^/, '549')

}