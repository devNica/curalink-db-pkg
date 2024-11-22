export type SystemVersionEntity = {
    id: string
    version: string
    created_at: number
}

export type ModuleEntity = {
    id: string
    name: string
    description: string
    isActive: boolean
    createdAt: number
    updatedAt: number
}


export type ModuleMigrationsEntity = {
    id: string
    module_id: string
    version: string
    migrated_at: number
    done: boolean
    deprecated: boolean
}

export type RoleHasModuleEntity = {
    roleId: string
    moduleId: string
}

export interface RoleBasedAccessEntity {
    roleId: string
    permissionId: string
    moduleId: string
}

export interface UserBasedAccessEntity {
    userId: string
    permissionId: string
    moduleId: string
}