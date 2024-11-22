export type { PostgresConfigOptions } from '../models/config/postgres-options.model'
export type { DatabaseConnectionCredentials } from '../models/config/database-credentials.model'

export type { MigrationType, ValidateSchemaParams } from '../models/shared/migration.model'

// auth models 
export { UserModel } from './db/auth/user.model'
export { RolModel } from './db/auth/rol.model'
export { PermissionModel } from './db/auth/permission.model'
export { UserHasRoleModel } from './db/auth/user-has-role.model'
export { RoleBasedAccessModel } from './db/auth/role-based-access.model'
export { UserBasedAccessModel } from './db/auth/user-based-access.model'
export { ModuleModel } from './db/auth/module.model'

// people models
export { PersonModel } from './db/people/person.model'
export { MedicalStaffModel } from './db/people/medical-staff.model'
export { AdministrativeStaffModel } from './db/people/administrative-staff.model'
export { PatientModel } from './db/people/patient.model'

// ctgs models
export { MedicalSpecialtiesModel } from './db/ctgs/medical-specialties.model'

// organizations models 
export { HealthUnitModel } from './db/org/health-units.model'
export { HealthUnitHasSpecialtiesModel } from './db/org/health-unit-has-specialties.model'