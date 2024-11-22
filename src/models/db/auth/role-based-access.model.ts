import { DataTypes, Model, type Sequelize } from 'sequelize'
import { RoleBasedAccessEntity } from '../../entities/dba.entity'

export class RoleBasedAccessModel extends Model<RoleBasedAccessEntity> implements RoleBasedAccessEntity {
  declare roleId: string
  declare permissionId: string
  declare moduleId: string

  static initialize (sequelize: Sequelize): void {
    if (!this.sequelize) {
      this.init({
        roleId: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'rol',
            key: 'id'
          },
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
          field: 'role_id'
        },
        permissionId: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'permission',
            key: 'id'
          },
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
          field: 'permission_id'
        }, 
        moduleId: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'module',
            key: 'id'
          },
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
          field: 'module_id'
        }
      }, {
        sequelize,
        modelName: 'role_based_access'
      })
    }
  }
}
