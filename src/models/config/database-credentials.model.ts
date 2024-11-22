export interface DatabaseConnectionCredentials {
  user: string
  password: string
  database: string
  host: string
  schema?: string
  port?: string
  logging?: boolean
}
