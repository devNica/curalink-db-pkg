import { DataTypes, Model, type Optional, type Sequelize } from 'sequelize'
import { PersonEntity } from '../../entities/person.entity'

interface PersonInputModel extends Optional<PersonEntity, 'firstname' | 'firstsurname' | 'dni' | 'address' | 'age' | 'birthdate'> { }

export class PersonModel extends Model<PersonEntity, PersonInputModel> implements PersonEntity {

    declare id: string
    declare firstname: string
    declare secondname: string
    declare firstsurname: string
    declare secondsurname: string
    declare dni: string
    declare email: string
    declare numberPhone: string
    declare address: string
    declare age: number
    declare birthdate: string
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
                firstname: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: false
                },
                secondname: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    unique: false
                },
                firstsurname: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    unique: false
                },
                secondsurname: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    unique: false
                },
                dni: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    unique: true
                },
                address: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: false
                },
                age: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                },
                birthdate: {
                    type: DataTypes.DATEONLY,
                    allowNull: false,
                },
                numberPhone: {
                    type: DataTypes.STRING,
                    allowNull: true,
                    unique: false
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
                modelName: 'person'
            })
        }
    }
}
