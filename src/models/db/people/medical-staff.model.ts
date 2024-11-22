import { DataTypes, Model, type Sequelize } from 'sequelize'
import { MedicalStaffEntity } from '../../entities/person.entity'

export class MedicalStaffModel extends Model<MedicalStaffEntity> implements MedicalStaffEntity {
    declare id: string
    declare personId: string
    declare employeeNumber: string
    declare medicalLicense: string
    declare unitId: string

    static initialize(sequelize: Sequelize): void {
        if (!this.sequelize) {
            this.init({
                id: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    primaryKey: true,
                    unique: true,
                    defaultValue: DataTypes.UUIDV4
                },
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
                unitId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    primaryKey: true,
                    references: {
                        model: 'health_unit',
                        key: 'id'
                    },
                    onDelete: 'RESTRICT',
                    onUpdate: 'CASCADE',
                    field: 'unit_id'
                },
                employeeNumber: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                medicalLicense: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                }
            }, {
                sequelize,
                modelName: 'medical_staff'
            })
        }
    }
}
