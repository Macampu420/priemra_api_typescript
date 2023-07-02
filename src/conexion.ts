import {Pool} from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    password: 'macampu123',
    database: 'ts_crud',
    port: 5432 
});

export default pool;