import { DataTypes, Model, type Optional, type Sequelize } from 'sequelize'
import { HealthUnitEntity } from 'src/models/entities/organization'

interface HealthUnitInputModel extends Optional<HealthUnitEntity, 'nameReference' | 'createdAt'> { }

export class HealthUnitModel extends Model<HealthUnitEntity, HealthUnitInputModel> implements HealthUnitEntity {

    declare id: string
    declare nameReference: string
    declare healthCareCapacity: number
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
                nameReference: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                healthCareCapacity: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0
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
                modelName: 'health_unit'
            })
        }
    }
}
