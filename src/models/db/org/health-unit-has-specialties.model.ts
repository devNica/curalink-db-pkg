import { DataTypes, Model, type Sequelize } from 'sequelize'
import { HealthUnitHasSpecialtiesEntity } from 'src/models/entities/organization'

export class HealthUnitHasSpecialtiesModel extends Model<HealthUnitHasSpecialtiesEntity> implements HealthUnitHasSpecialtiesEntity {
    declare unitId: string
    declare specialtyId: string
    declare isActive: boolean

    static initialize(sequelize: Sequelize): void {
        if (!this.sequelize) {
            this.init({
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
                },
                specialtyId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    primaryKey: true,
                    references: {
                        model: 'medical_specialties',
                        key: 'id'
                    },
                    onDelete: 'RESTRICT',
                    onUpdate: 'CASCADE',
                },
                isActive: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false
                },
            }, {
                sequelize,
                modelName: 'healt_unit_has_specialties'
            })
        }
    }
}
