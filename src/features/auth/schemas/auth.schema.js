import * as yup from 'yup'

export const validationSchema = yup.object({

    email: yup
        .string()
        .trim()
        .email('Ingresá un e-mail válido.')
        .required('El e-mail es requerido.'),

    password: yup
        .string()
        .required('La contraseña es requerida.')
        .min(6, 'Debe tener al menos 6 caracteres.')

})