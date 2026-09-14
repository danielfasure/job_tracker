import PG from "pg"
const {Pool} = PG


const pool = new Pool({
    user: "daniel",
    host: "localhost",
    database: "job_tracker_db",
    password: "Ayomikun12!",
    port: 5432
});

export default pool;