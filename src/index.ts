import { DatabaseOrchestratror } from './core/database.orchestrator'
import { DatabaseConnectionCredentials } from './models'

export * as curaLinkCore from './core/index'
export * as curalinkModels from './models'


async function testPackage() {
    const db = DatabaseOrchestratror.newOrchestrator()

    const conn: DatabaseConnectionCredentials = {
        database: "curalink_db",
        host: "localhost",
        password: "windows",
        user: "postgres",
        logging: false,
        schema: 'develop'
    }

    try {

        await db.initialize(conn, true)

        // await db.migrations(seqAdapter, 'public', 'auth')

    } catch (error) {
        console.log(error)
    }

}


testPackage()