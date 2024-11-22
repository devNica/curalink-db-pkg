import { DataTypes, Model, type Optional, type Sequelize } from 'sequelize'
import { type RolEntity, type UserEntity } from '../../entities/auth.entity'

interface RolInputModel extends Optional<RolEntity, 'rol'> { }

export class RolModel extends Model<RolEntity, RolInputModel> implements RolEntity {
  declare id: string
  declare rol: string
  declare isActive: boolean
  declare createdAt: number
  declare updatedAt: number
  declare users?: Array<Pick<UserEntity, 'id' | 'email' | 'username'>>

  static initialize (sequelize: Sequelize): void {
    if (!this.sequelize) {
      this.init({
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          unique: true,
          defaultValue: DataTypes.UUIDV4
        },
        rol: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        createdAt: {
          type: DataTypes.BIGINT,
          allowNull: false
        },
        updatedAt: {
          type: DataTypes.BIGINT,
          allowNull: true
        }
      }, {
        sequelize,
        modelName: 'rol'
      })
    }
  }
}
