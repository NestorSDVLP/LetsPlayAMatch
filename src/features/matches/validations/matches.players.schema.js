import * as yup from 'yup'

export const validationSchema = yup.object({
    matchPlayerName: yup
        .string()
        .trim()
        .required('El Nombre es requerido'),
    matchPlayerPhone: yup
        .number()
        .transform((value, originalValue) =>
            originalValue === '' ? null : Number(originalValue)
        )
        .nullable()
        .required('El Teléfono es requerido'),
})