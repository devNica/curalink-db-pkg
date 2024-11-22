import { DataTypes, Model, type Optional, type Sequelize } from 'sequelize'
import { type PermissionEntity } from '../../entities/auth.entity'

interface PermissionInputModel extends Optional<PermissionEntity, 'permission'> { }

export class PermissionModel extends Model<PermissionEntity, PermissionInputModel> implements PermissionEntity {
  declare id: string
  declare permission: string
  declare description: string
  declare isActive: boolean
  declare createdAt: number
  declare updatedAt: number

  // Metodo de inicializacion, solo se ejecuta cuando es necesario.
  static initialize (sequelize: Sequelize): void {
    if (!this.sequelize) { // Solo se inicializa sino se ha hecho antes
      this.init({
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          unique: true,
          defaultValue: DataTypes.UUIDV4
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        permission: {
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
        modelName: 'permission'
      })
    }
  }
}
