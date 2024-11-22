export interface GeneralAuditField {
  isActive: boolean
  createdAt: number
  updatedAt: number
}

export type UserEntity = GeneralAuditField & {
  id: string
  username: string
  email: string
  password: string
  passwordExpiredIn: number
  type: string // 'employee' | 'medical_staff' | 'patient'
  isExpired: boolean
  isRoot: boolean
  personId: string
  userRol?: Pick<RolEntity, 'rol'>
}

export type RolEntity = GeneralAuditField & {
  id: string
  rol: string
  users?: Array<Pick<UserEntity, 'id' | 'email' | 'username'>>
}

export type PermissionEntity = GeneralAuditField & {
  id: string
  permission: string
  description: string
}

export interface UserHasRoleEntity {
  userId: string
  roleId: string
}

