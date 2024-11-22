import { type DatabaseConnectionCredentials } from '../models/config/database-credentials.model'
import { SequelizeInstance } from './sequelize.instance'
import { SequelizeAdapter } from './sequelize.adapter'
import { type MigrationType } from '../../src/models'

export interface IDatabaseOrchestrator {
  initialize: (conn: DatabaseConnectionCredentials, alterModels?: boolean) => Promise<SequelizeAdapter | never>
}

export class DatabaseOrchestratror implements IDatabaseOrchestrator {
  private static instance: DatabaseOrchestratror

  private constructor() { }

  public static newOrchestrator(): DatabaseOrchestratror {
    if (!DatabaseOrchestratror.instance) {
      DatabaseOrchestratror.instance = new DatabaseOrchestratror()
    }

    return DatabaseOrchestratror.instance
  }

  async initialize(conn: DatabaseConnectionCredentials, alterModels?: boolean): Promise<SequelizeAdapter> {
    try {
      /** Instanciar Sequelize con las credenciales de conexion a la bd */
      SequelizeInstance.initInstance(conn)

      /** isntanciar el adaptador de sequelize*/
      const seqAdapter = new SequelizeAdapter()

      /** verificar la conexion */
      await seqAdapter.connect()
      /** Sincronizar los modelos si fuese necesario */
      await seqAdapter.syncModels(alterModels ?? false)

      return seqAdapter
    } catch (error) {
      console.log("error capturado: ", error)
      throw new Error('Database initialization failed')
    }
  }

  async migrations(seqAdapter: SequelizeAdapter, schema: string, type: MigrationType): Promise<void> {
    try {

      /**Validar schema, sin generar el esquema en caso de no encontrarlo */
      await seqAdapter.validateSchema({
        schema,
        createIfNotExists: false
      })
      
      /** Migrar las semillas de las entidades segun el tipo de migracion */
      await seqAdapter.migrateSeeds(schema, type)

    } catch (error) {
      throw new Error(String(error))
    }
  }
}
