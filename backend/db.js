import PG from "pg"
const {Pool} = PG


/*const pool = new Pool({
    user: "daniel",
    host: "localhost",
    database: "job_tracker_db",
    password: "Ayomikun12!",
    port: 5432
});
*/
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});



export default pool;