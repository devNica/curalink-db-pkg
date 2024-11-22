export type MigrationType = 'full' | 'auth' | 'catalog'

export type ValidateSchemaParams = {
    schema: string
    createIfNotExists: boolean
}