import { DataTypes, Model, type Sequelize } from 'sequelize'
import { PatientEntity } from '../../entities/person.entity'

export class PatientModel extends Model<PatientEntity> implements PatientEntity {
    declare id: string
    declare personId: string
    declare medicalRecordNumber: string

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
                medicalRecordNumber: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                }
            }, {
                sequelize,
                modelName: 'patient'
            })
        }
    }
}
