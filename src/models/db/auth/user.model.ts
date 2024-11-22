import { DataTypes, Model, type Optional, type Sequelize } from 'sequelize'
import { type RolEntity, type UserEntity } from '../../entities/auth.entity'

interface UserInputModel extends Optional<UserEntity, 'email' | 'username' | 'password' | 'createdAt'> { }

export class UserModel extends Model<UserEntity, UserInputModel> implements UserEntity {
  declare id: string
  declare email: string
  declare username: string
  declare  type: string
  declare password: string
  declare passwordExpiredIn: number
  declare isExpired: boolean
  declare isRoot: boolean
  declare isActive: boolean
  declare createdAt: number
  declare updatedAt: number
  declare personId: string
  declare userRol?: Pick<RolEntity, 'rol'> | undefined

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
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        type: {
          type: DataTypes.ENUM('admin_staff', 'medical_staff', 'patient'),
          allowNull: false,
          defaultValue: 'admin_staff'
        },
        isRoot: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        isExpired: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        passwordExpiredIn: {
          type: DataTypes.BIGINT,
          allowNull: false
        },
        personId: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: 'person',
            key: 'id',
          },
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
          field: 'person_id'
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
        modelName: 'user'
      })
    }
  }
}
