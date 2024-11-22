export interface GeneralAuditField {
    isActive: boolean
    createdAt: number
    updatedAt: number
}

export type HealthUnitEntity = GeneralAuditField & {
    id: string
    nameReference: string
    healthCareCapacity: number
}

export type HealthUnitHasSpecialtiesEntity = {
    unitId: string
    specialtyId: string
    isActive: boolean
}

export type MedicalSpecialtiesEntity = GeneralAuditField & {
    id: string
    specialty: string
}