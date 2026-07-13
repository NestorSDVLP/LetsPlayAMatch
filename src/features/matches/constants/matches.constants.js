import volleyIcon from '@/assets/images/activity_icons/vvo.png'
import futbolIcon from '@/assets/images/activity_icons/fbl.png'
import basketIcon from '@/assets/images/activity_icons/bkb.png'
import handballIcon from '@/assets/images/activity_icons/hbl.png'
import hockeyIcon from '@/assets/images/activity_icons/hoc.png'

export const MATCH_ACTIVITIES = [
    { 
        id: "volley", 
        label: "Volley", 
        icon: volleyIcon 
    },
    { 
        id: "futbol", 
        label: "Fútbol", 
        icon: futbolIcon 
    },
    { 
        id: "basket", 
        label: "Basket", 
        icon: basketIcon 
    },
    { 
        id: "handball", 
        label: "Handball", 
        icon: handballIcon 
    },
    { 
        id: "hockey", 
        label: "Hockey", 
        icon: hockeyIcon 
    },
]

export const MATCH_TYPES = [
    { id: 'recreativo', label: 'Recreativo' },
    { id: 'competitivo', label: 'Competitivo' }
];

export const MATCH_GENDERS = [
    { id: 'masculino', label: 'Masculino' },
    { id: 'femenino', label: 'Femenino' },
    { id: 'mixto', label: 'Mixto' }
];

export const MATCH_LEVELS = [
    { id: 'principiante', label: 'Principiante' },
    { id: 'intermedio', label: 'Intermedio' },
    { id: 'avanzado', label: 'Avanzado' }
];
