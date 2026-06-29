import * as yup from 'yup'

export const matchesSchema = yup.object({
    matchActivityId: yup
        .string()
        .trim()
        .required('La Actividad es requerida'),
        
    matchPlace: yup
        .string()
        .trim()
        .required('La Sede es requerida'),
        
    matchPlaceAddress: yup
        .string()
        .trim()
        .required('La Dirección es requerida'),
        
    matchStartAt: yup
        .date()
        .transform((value, originalValue) =>
            originalValue === '' ? null : new Date(originalValue)
        )
        .nullable()
        .required('La Fecha y Hora de inicio es requerida'),
        
    matchEndAt: yup
        .date()
        .transform((value, originalValue) =>
            originalValue === '' ? null : new Date(originalValue)
        )
        .nullable()
        .required('La Fecha y Hora de finalización es requerida'),
        
    matchTypeId: yup
        .string()
        .trim()
        .required('El Tipo de partido es requerido'),
        
    matchGenderId: yup
        .string()
        .trim()
        .required('El Género del partido es requerido'),
        
    matchLevelId: yup
        .string()
        .trim()
        .required('El Nivel del partido es requerido'),
        
    matchMinPlayers: yup
        .number()
        .transform((value, originalValue) =>
            originalValue === '' ? null : Number(originalValue)
        )
        .nullable()
        .required('La Cantidad mínima de jugadores es requerida'),
        
    matchMaxPlayers: yup
        .number()
        .transform((value, originalValue) =>
            originalValue === '' ? null : Number(originalValue)
        )
        .nullable()
        .required('La Cantidad máxima de jugadores es requerida'),
        
    matchMinAge: yup
        .number()
        .transform((value, originalValue) =>
            originalValue === '' ? null : Number(originalValue)
        )
        .nullable()
        .required('La Edad mínima es requerida'),
        
    matchMaxAge: yup
        .number()
        .transform((value, originalValue) =>
            originalValue === '' ? null : Number(originalValue)
        )
        .nullable()
        .required('La Edad máxima es requerida'),
        
    matchURL: yup
        .string()
        .matches(/^match-[a-z0-9-]+$/, 'Formato de URL de coincidencia no válido')
        .trim()
        .required('La URL del partido es requerida'),
        
    matchPin: yup
        .string()
        .trim()
        .required('El Pin del partido es requerido'),
})