import * as yup from 'yup'

export const validationSchema = yup.object({
    matchActivityId: yup
        .string()
        .trim()
        .required('La Actividad es obligatoria'),
        
    matchPlace: yup
        .string()
        .trim()
        .required('La Sede es obligatoria'),
        
    matchPlaceAddress: yup
        .string()
        .trim()
        .required('La Dirección es obligatoria'),
        
    matchStartAt: yup
        .date()
        .transform((value, originalValue) =>
            originalValue === '' ? null : new Date(originalValue)
        )
        .nullable()
        .required('La Fecha y Hora de inicio es obligatoria'),
        
    matchEndAt: yup
        .date()
        .transform((value, originalValue) =>
            originalValue === '' ? null : new Date(originalValue)
        )
        .nullable()
        .required('La Fecha y Hora de finalización es obligatoria'),
        
    matchTypeId: yup
        .string()
        .trim()
        .required('El Tipo de partido es obligatorio'),
        
    matchGenderId: yup
        .string()
        .trim()
        .required('El Género del partido es obligatorio'),
        
    matchLevelId: yup
        .string()
        .trim()
        .required('El Nivel del partido es obligatorio'),
        
    matchMinPlayers: yup
        .number()
        .transform((value, originalValue) =>
            originalValue === '' ? null : Number(originalValue)
        )
        .nullable()
        .required('La Cantidad mínima de jugadores es obligatoria'),
        
    matchMaxPlayers: yup
        .number()
        .transform((value, originalValue) =>
            originalValue === '' ? null : Number(originalValue)
        )
        .nullable()
        .required('La Cantidad máxima de jugadores es obligatoria'),
        
    matchMinAge: yup
        .number()
        .transform((value, originalValue) =>
            originalValue === '' ? null : Number(originalValue)
        )
        .nullable()
        .required('La Edad mínima es obligatoria'),
        
    matchMaxAge: yup
        .number()
        .transform((value, originalValue) =>
            originalValue === '' ? null : Number(originalValue)
        )
        .nullable()
        .required('La Edad máxima es obligatoria'),
        
    matchURL: yup
        .string()
        .matches(/^match-[a-z0-9-]+$/, 'Formato de URL de coincidencia no válido')
        .trim()
        .required('La URL del partido es obligatoria'),
        
    matchPin: yup
        .string()
        .trim()
        .required('El Pin del partido es obligatorio'),
})