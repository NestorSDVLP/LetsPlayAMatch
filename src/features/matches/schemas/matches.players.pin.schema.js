import * as yup from 'yup'

export const matchesPlayersPinSchema = yup.object({
    matchPlayerPin: yup
        .number()
        .transform((value, originalValue) =>
            originalValue === '' ? null : Number(originalValue)
        )
        .nullable()
        .required('Ingresá el número de Pin'),
})