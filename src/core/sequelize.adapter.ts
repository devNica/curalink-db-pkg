import { type Sequelize, QueryTypes } from 'sequelize'
import { SequelizeInstance } from './sequelize.instance'
import { type MigrationType, type ValidateSchemaParams, AdministrativeStaffModel, HealthUnitHasSpecialtiesModel, HealthUnitModel, MedicalSpecialtiesModel, MedicalStaffModel, ModuleModel, PatientModel, PermissionModel, PersonModel, RoleBasedAccessModel, RolModel, UserBasedAccessModel, UserHasRoleModel, UserModel } from '../models/index'
import { clearPermissionsAndUserAuth, hydratePermissionsAndUserAuht } from '../../src/seeds/auth.seed'
import { fetchAllSchemas } from '../../src/queries/schema.queries'

export interface ISequelizeAdapter {
  connect: () => Promise<void>
  initModels: () => Promise<void>
  validateSchema: (data: ValidateSchemaParams) => Promise<void>
  migrateSeeds: (schema: string, type: MigrationType) => Promise<void>
  syncModels?: (alter: boolean) => Promise<void>
}

export class SequelizeAdapter implements ISequelizeAdapter {
  private readonly sequelize: Sequelize

  constructor() {
    this.sequelize = SequelizeInstance.getInstance()
  }

  async connect(): Promise<void> {
    try {
      await this.sequelize.authenticate()

      console.log('Database connected success')
    } catch (error) {
      throw new Error('Database connection failed')
    }
  }

  async validateSchema(data: ValidateSchemaParams): Promise<void> {
    if (!data.schema || data.schema.trim().length < 1) throw new Error('Invalid schema name!')

    try {

      /** Recuperar los nombres de los schemas en la bd */
      const [raw] = await this.sequelize.query(fetchAllSchemas())
      /** Forzar la conversion de tipos */
      const schemas = raw as Array<{ schema_name: string }>

      if (schemas.length < 1) throw new Error("no schemas found in database")


      const schemaExists = schemas.some(item => item.schema_name === data.schema)

      /** comprobar si el schema existe en la base de datos */
      if (!schemaExists) {
        /** Crear solo si es necesario */
        if (data.createIfNotExists) {
          await this.sequelize.createSchema(data.schema, { logging: false })
        } else {
          throw new Error('Schema not found!')
        }
      }

    } catch (error) {
      throw error instanceof Error ? error : new Error(String(error))
    }
  }

  async migrateSeeds(schema: string, type: MigrationType): Promise<void> {
    if (type === 'auth') {
      this.migrateAuthSeeds(schema)
    } else if (type === 'catalog') {

    }
  }

  async syncModels(alter: boolean): Promise<void> {
    try {
      // INIT ALL MODELS
      await this.initModels()

      // ADMINISTRATIVE STAFF MODEL
      AdministrativeStaffModel.belongsTo(PersonModel, { foreignKey: 'personId' })

      // HEALTH UNIT MODEL
      HealthUnitModel.hasMany(HealthUnitHasSpecialtiesModel, { foreignKey: 'unitId' })
      HealthUnitModel.hasMany(MedicalStaffModel, { foreignKey: 'unitId' })

      // MEDICAL SPECIALTIES MODEL
      MedicalSpecialtiesModel.hasMany(HealthUnitHasSpecialtiesModel, { foreignKey: 'specialtyId' })

      // MEDICAL STAFF MODEL
      MedicalStaffModel.belongsTo(PersonModel, { foreignKey: 'personId' })
      MedicalStaffModel.belongsTo(HealthUnitModel, { foreignKey: 'unitId' })

      // MODULE MODEL
      ModuleModel.hasMany(RoleBasedAccessModel, { foreignKey: 'moduleId' })
      ModuleModel.hasMany(UserBasedAccessModel, { foreignKey: 'moduleId' })

      // PATIENT MODEL
      PatientModel.belongsTo(PersonModel, { foreignKey: 'personId' })

      // PERSON MODEL
      PersonModel.hasOne(UserModel, { foreignKey: 'personId' })
      PersonModel.hasMany(PatientModel, { foreignKey: 'personId' })
      PersonModel.hasMany(MedicalStaffModel, { foreignKey: 'personId' })
      PersonModel.hasMany(AdministrativeStaffModel, { foreignKey: 'personId' })


      // PERMISSION MODEL
      PermissionModel.hasMany(RoleBasedAccessModel, { foreignKey: 'permissionId' })
      PermissionModel.hasMany(UserBasedAccessModel, { foreignKey: 'permissionId' })

      // ROL MODEL
      RolModel.hasMany(UserHasRoleModel, { foreignKey: 'roleId' })
      RolModel.hasMany(RoleBasedAccessModel, { foreignKey: 'roleId' })
      RolModel.belongsToMany(UserModel, { through: 'user_has_role', foreignKey: 'roleId' })

      // ROLE_BASED_ACCESS MODEL
      RoleBasedAccessModel.belongsTo(RolModel, { foreignKey: 'roleId' })
      RoleBasedAccessModel.belongsTo(PermissionModel, { foreignKey: 'permissionId' })
      RoleBasedAccessModel.belongsTo(ModuleModel, { foreignKey: 'moduleId' })

      // USER MODEL
      UserModel.belongsTo(PersonModel, { foreignKey: 'personId' })
      UserModel.hasMany(UserHasRoleModel, { foreignKey: 'userId' })
      UserModel.hasMany(UserBasedAccessModel, { foreignKey: 'userId' })
      UserModel.belongsToMany(RolModel, { through: 'user_has_role', foreignKey: 'userId' })

      // USER_HAS_ROLE MODEL
      UserHasRoleModel.belongsTo(UserModel, { foreignKey: 'userId' })
      UserHasRoleModel.belongsTo(RolModel, { foreignKey: 'roleId' })


      // USER_BASED_ACCESS MODEL
      UserBasedAccessModel.belongsTo(UserModel, { foreignKey: 'userId' })
      UserBasedAccessModel.belongsTo(PermissionModel, { foreignKey: 'permissionId' })
      UserBasedAccessModel.belongsTo(ModuleModel, { foreignKey: 'moduleId' })

      if (alter) {
        await this.sequelize.sync({ alter })
        console.log('All database model has been migrated')
      }
    } catch (error) {
      throw new Error(String(error))
    }
  }

  private async migrateAuthSeeds(schema: string): Promise<void> {
    await this.sequelize.query(clearPermissionsAndUserAuth(schema), {
      type: QueryTypes.DELETE
    })

    await this.sequelize.query(hydratePermissionsAndUserAuht(schema), {
      type: QueryTypes.INSERT,
      replacements: {
        created_at: Date.now()
      }
    })
  }

  async initModels(): Promise<void> {

    MedicalSpecialtiesModel.initialize(this.sequelize)
    HealthUnitModel.initialize(this.sequelize)
    HealthUnitHasSpecialtiesModel.initialize(this.sequelize)

    PersonModel.initialize(this.sequelize)
    UserModel.initialize(this.sequelize)
    RolModel.initialize(this.sequelize)
    ModuleModel.initialize(this.sequelize)
    PermissionModel.initialize(this.sequelize)
    UserHasRoleModel.initialize(this.sequelize)
    RoleBasedAccessModel.initialize(this.sequelize)
    UserBasedAccessModel.initialize(this.sequelize)
    PatientModel.initialize(this.sequelize)
    MedicalStaffModel.initialize(this.sequelize)
    AdministrativeStaffModel.initialize(this.sequelize)
  }
}
