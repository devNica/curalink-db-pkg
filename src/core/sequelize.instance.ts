import { Sequelize } from 'sequelize'
import { type DatabaseConnectionCredentials } from '../models/config/database-credentials.model'
import { type PostgresConfigOptions } from '../models/config/postgres-options.model'

export class SequelizeInstance {
  private static instance: Sequelize | null = null

  private constructor () { }

  static initInstance (conn: DatabaseConnectionCredentials): Sequelize {
    if (!SequelizeInstance.instance) {
      const db: PostgresConfigOptions = {
        user: conn.user,
        password: conn.password,
        database: conn.database,
        options: {
          host: conn.host,
          schema: conn.schema ?? 'public',
          dialect: 'postgres',
          logging: conn.logging ? (...msg: any) => { console.log(msg) } : false,
          dialectOptions: {
            multipleStatements: true
          },
          timezone: '-06:00',
          define: {
            freezeTableName: true,
            timestamps: false,
            underscored: true
          }
        }
      }

      SequelizeInstance.instance = new Sequelize(
        db.database,
        db.user,
        db.password,
        db.options
      )
    }

    return SequelizeInstance.instance
  }

  static getInstance (): Sequelize {
    if (!SequelizeInstance.instance) {
      throw new Error('Sequelize instance has not been initialized. Call initInstance first.')
    }
    return SequelizeInstance.instance
  }
}
