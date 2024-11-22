import { type Dialect } from 'sequelize'

export interface PostgresConfigOptions {
  user: string
  password: string
  database: string
  options: {
    schema?: string
    dialect: Dialect
    host: string
    dialectOptions: {
      multipleStatements: boolean
    }
    logging: boolean | ((sql: string, timing?: number) => void)
    timezone: '-06:00' | '06:00'
    define: {
      freezeTableName: boolean
      timestamps: boolean
      underscored: boolean
    }
  }
}
