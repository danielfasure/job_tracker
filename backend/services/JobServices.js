import pool from "../db.js";

export async function getAllJobs() {

    const result = await pool.query(
        "SELECT * FROM jobinfo"
    );

    return result.rows;
}

export async function CreateJob(jobname,jobdescripton,datewhenapplied){

    
    const result =  await pool.query(
        "INSERT INTO jobinfo (jobname,jobdescripton,datewhenapplied)  VALUES ($1, $2, $3) ",[jobname,jobdescripton,datewhenapplied]
    )
    return result.rows[0]
}