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
        .required('La Fecha y Hora de inicio es obligatoria'),
        
    matchEndAt: yup
        .date()
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
        .required('La Cantidad mínima de jugadores es obligatoria'),
        
    matchMaxPlayers: yup
        .number()
        .required('La Cantidad máxima de jugadores es obligatoria'),
        
    matchMinAge: yup
        .number()
        .required('La Edad mínima es obligatoria'),
        
    matchMaxAge: yup
        .number()
        .required('La Edad máxima es obligatoria'),
        
    matchURL: yup
        .string()
        .trim()
        .url()
        .required('La URL del partido es obligatoria'),
        
    matchPin: yup
        .string()
        .trim()
        .required('El Pin del partido es obligatorio'),
})