import { DataTypes, Model, type Optional, type Sequelize } from 'sequelize'
import { MedicalSpecialtiesEntity } from 'src/models/entities/organization'

interface MedicalSpecialtiesInputModel extends Optional<MedicalSpecialtiesEntity, 'specialty'> { }

export class MedicalSpecialtiesModel extends Model<MedicalSpecialtiesEntity, MedicalSpecialtiesInputModel> implements MedicalSpecialtiesEntity {

    declare id: string
    declare specialty: string
    declare isActive: boolean
    declare createdAt: number
    declare updatedAt: number
    declare personId: string

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
                specialty: {
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
                modelName: 'medical_specialties'
            })
        }
    }
}
