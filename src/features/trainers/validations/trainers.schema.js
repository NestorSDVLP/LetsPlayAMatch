import * as yup from 'yup'

export const validationSchema = yup.object({
    trainerUserName: yup
        .string(),

    trainerFirstName: yup
        .string()
        .trim()
        .required('El nombre es obligatorio'),

    trainerLastName: yup
        .string()
        .trim()
        .required('El apellido es obligatorio'),

    trainerAvatar: yup
        .string()
        .trim()
        .url('Debe ser una URL válida')
        .required('El avatar es obligatorio')
})