import * as yup from 'yup'

export const trainersSchema = yup.object({
    trainerUserName: yup
        .string(),

    trainerFirstName: yup
        .string()
        .trim()
        .required('El nombre es requerido'),

    trainerLastName: yup
        .string()
        .trim()
        .required('El apellido es requerido'),

    trainerAvatar: yup
        .string()
        .trim()
        .url('Debe ser una URL válida')
        .required('El avatar es requerido')
})