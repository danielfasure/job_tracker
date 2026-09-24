import "dotenv/config";
import pool from "../db.js";

export async function getAllJobs() {

    const result = await pool.query(
        'SELECT * FROM "JobTracker"'
    );

    return result.rows;
}

export async function getUserJobs(id) {
  
    const result = await pool.query(
        'SELECT * FROM "JobTracker" WHERE "Jobuserid"=$1',[id]
    );

    return result.rows;
}


export async function CreateJobs(
    CompanyName,
    jobdescription,
    JobTitle,
    companydateapplied,
    Userid
){
    

    const result =  await pool.query(
        'INSERT INTO "JobTracker" ("JobTitle","JobDescription","DateCreated","CompanyName","Jobuserid")  VALUES ($1, $2, $3, $4,$5)  RETURNING * ' ,[JobTitle,jobdescription,companydateapplied,CompanyName,Userid]
    )
    return result.rows
}


