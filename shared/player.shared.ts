// ENUMS
export enum Region {
    AMERICA = "America",
    EUROPE = "Europe",
    ASIA  = "Asia",
    TW_HK_MO = "TW, HK, MO"
}

// TYPES
export type Player = {
    id: string,
    userId: string,
    name: string, 
    uid: string,
    region: Region    
}