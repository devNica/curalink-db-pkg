import { DataTypes, Model, type Sequelize } from 'sequelize'
import { UserBasedAccessEntity } from '../../entities/dba.entity'

export class UserBasedAccessModel extends Model<UserBasedAccessEntity> implements UserBasedAccessEntity {
  declare moduleId: string
  declare permissionId: string
  declare userId: string

  static initialize (sequelize: Sequelize): void {
    if (!this.sequelize) {
      this.init({
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'user',
            key: 'id'
          },
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
          field: 'user_id'
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
        modelName: 'user_based_access'
      })
    }
  }
}
