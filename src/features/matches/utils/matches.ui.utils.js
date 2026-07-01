import {
    MATCH_ACTIVITIES,
    MATCH_TYPES,
    MATCH_GENDERS,
    MATCH_LEVELS,
} from "@/features/matches/constants/matches.constants";

export const getMatchActivity = (id) =>
    MATCH_ACTIVITIES.find((item) => item.id === id);

export const getMatchType = (id) =>
    MATCH_TYPES.find((item) => item.id === id);

export const getMatchGender = (id) =>
    MATCH_GENDERS.find((item) => item.id === id);

export const getMatchLevel = (id) =>
    MATCH_LEVELS.find((item) => item.id === id);