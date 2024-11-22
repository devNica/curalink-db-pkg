import { DataTypes, Model, type Sequelize } from 'sequelize'
import { type UserHasRoleEntity } from '../../entities/auth.entity'

export class UserHasRoleModel extends Model<UserHasRoleEntity> implements UserHasRoleEntity {
  declare userId: string
  declare roleId: string

  static initialize(sequelize: Sequelize): void {
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
        },
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
        }
      }, {
        sequelize,
        modelName: 'user_has_role'
      })
    }
  }
}
