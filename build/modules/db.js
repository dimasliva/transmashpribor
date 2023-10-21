import pg from "pg";
const db = new pg.Pool({
    user: 'nodejs_uesj_user',
    password: 'dull3XoC7AiXD3gJFGLFXnQwrMPPq6vC',
    host: 'dpg-ckp92q7kc2qc73e6abu0-a.oregon-postgres.render.com',
    port: 5432,
    database: 'nodejs_uesj',
    ssl: true
});
export default db;
//# sourceMappingURL=db.js.map