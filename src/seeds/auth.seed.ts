export const clearPermissionsAndUserAuth = (schema: string): string => `
DELETE FROM ${schema}.rol WHERE true;`

export const hydratePermissionsAndUserAuht = (schema: string): string => `
    INSERT INTO ${schema}.rol
    (id, rol, is_active, created_at, updated_at)
    VALUES(uuid_generate_v4(), 'admin', true, :created_at, 0);

    INSERT INTO ${schema}.rol
    (id, rol, is_active, created_at, updated_at)
    VALUES(uuid_generate_v4(), 'doctors', true, :created_at, 0);

    INSERT INTO ${schema}.rol
    (id, rol, is_active, created_at, updated_at)
    VALUES(uuid_generate_v4(), 'nurses', true, :created_at, 0);

    INSERT INTO ${schema}.rol
    (id, rol, is_active, created_at, updated_at)
    VALUES(uuid_generate_v4(), 'administrative', true, :created_at, 0);

    INSERT INTO ${schema}.rol
    (id, rol, is_active, created_at, updated_at)
    VALUES(uuid_generate_v4(), 'patients', true, :created_at, 0);

`
