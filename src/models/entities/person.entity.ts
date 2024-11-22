export interface GeneralAuditField {
    isActive: boolean
    createdAt: number
    updatedAt: number
}

export type SexCtgEntity = {
    id: number
    /** 
     * [
         { sex: 'Male', lang: 'en' }, 
        {sex: 'Hombre', lang: 'es'}
        ] 
    */
    translations: string
    abbrv: 'M' | 'F' | 'U'
}

export type PersonEntity = GeneralAuditField & {
    id: string
    firstname: string
    secondname: string
    firstsurname: string
    secondsurname: string
    dni: string
    email: string
    address: string
    numberPhone: string
    age: number
    birthdate: string
    // sexId: string
}

export type AdministrativeStaffEntity = {
    personId: string
    employeeNumber: string
}

export type MedicalStaffEntity = {
    id: string
    personId: string
    employeeNumber: string
    medicalLicense: string
    unitId: string
}

export type PatientEntity = {
    id: string
    personId: string
    medicalRecordNumber: string
}