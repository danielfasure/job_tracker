import pool from "../db.js";

export async function getAllJobs() {

    const result = await pool.query(
        "SELECT * FROM jobs"
    );

    return result.rows;
}