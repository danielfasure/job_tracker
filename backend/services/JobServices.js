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


export async function CreateMinimumJob(
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




export async function AddJobDetail({JobApplicationid,ApplicationRound,Status,RoundType}){
 const result =  await pool.query(
        'INSERT INTO "JobTrackerExtra" ("ApplicationRound","RoundType","Status","JobApplicationid")  VALUES ($1, $2, $3, $4,$5)   ' ,[ApplicationRound??1,RoundType??"pending",Status??"pending",JobApplicationid]
    )
}

export async function AlterJobDetail ({JobApplicationid,ApplicationRound,Status,RoundType}){
    const query = `
    UPDATE "JobTrackerExtra"
    SET
        "RoundType" = COALESCE($1, "JobTitle"),
        "ApplicationRound" = COALESCE($2, "CompanyName"),
        "Status" = COALESCE($3, "Status")
    WHERE "JobApplicationid"= $4
`;
await pool.query(query,[RoundType??null,ApplicationRound??null,Status??null,
    JobApplicationid
])

}


