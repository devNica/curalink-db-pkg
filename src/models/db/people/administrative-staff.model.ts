import { DataTypes, Model, type Sequelize } from 'sequelize'
import { AdministrativeStaffEntity } from '../../entities/person.entity'

export class AdministrativeStaffModel extends Model<AdministrativeStaffEntity> implements AdministrativeStaffEntity {
  declare personId: string
  declare employeeNumber: string

  static initialize(sequelize: Sequelize): void {
    if (!this.sequelize) {
      this.init({
        personId: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          references: {
            model: 'person',
            key: 'id'
          },
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
        },
        employeeNumber: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        }
      }, {
        sequelize,
        modelName: 'administrative_staff'
      })
    }
  }
}
