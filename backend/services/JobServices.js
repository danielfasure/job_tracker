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
export async function getextrajobs(id) {
console.log("msss ",id)
      const result = await pool.query(
    'SELECT * FROM "JobTrackerExtra" WHERE "userid"=$1',[id])
    console.log(result.rows[0])
    return result.rows
}


export async function CreateMinimumJob(
    CompanyName,
    jobdescription,
    JobTitle,
    companydateapplied,
    Userid,hourtype,jobtype
){
    

    const result =  await pool.query(
        'INSERT INTO "JobTracker" ("JobTitle","JobDescription","DateCreated","CompanyName","Jobuserid","hourtype","jobtype")  VALUES ($1, $2, $3, $4,$5,$6,$7)  RETURNING * ' ,[JobTitle,jobdescription,companydateapplied,CompanyName,Userid,hourtype,jobtype]
    )
    return result.rows[0]
}
export async function editMinimumJob({
    CompanyName,
    jobdescription,
    JobTitle,
    companydateapplied,
    applicationnumber,hourtype,jobtype}
){
    console.log("added ",hourtype)
   await pool.query(
        `UPDATE "JobTracker"
         SET
            "CompanyName" = COALESCE($1, "CompanyName"),
            "JobTitle" = COALESCE($2, "JobTitle"),
            "DateCreated" = COALESCE($3, "DateCreated"),
            "JobDescription"= COALESCE($4, "JobDescription"),
            "hourtype"= COALESCE($6, "hourtype"),
            "jobtype"= COALESCE($7, "jobtype")

         WHERE "id" = $5`,
        [CompanyName, JobTitle, companydateapplied, jobdescription,applicationnumber,hourtype,jobtype]
    );

   
}


export async function Deletejob({applicationid}){
    const result = await pool.query(
        'DELETE FROM "JobTrackerExtra" WHERE "JobApplicationid"=$1 ',[applicationid]
    )
    const result2 = await pool.query(
        'DELETE FROM "JobTracker" WHERE "id"=$1 ',[applicationid]
    )
}



export async function AddJobDetail({
    JobApplicationid,
    ApplicationRound,
    Status,
    RoundType,userid
}) {
  
    console.log("AddJobDetail values:", {
        JobApplicationid,
        ApplicationRound,
        Status,
        RoundType
    });
  

    const result = await pool.query(
        `INSERT INTO "JobTrackerExtra"
        ("ApplicationRound", "RoundType", "Status", "JobApplicationid","userid")
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [
            ApplicationRound ?? 1,
            RoundType ?? "pending",
            Status ?? "pending",
            JobApplicationid,userid
        ]
    );

    console.log("ADDED DETAIL:", result.rows[0]);

    return result.rows[0];
}

export async function AlterJobDetail ({JobApplicationid,ApplicationRound,Status,RoundType}){
 /*   const query = `
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
*/
console.log(JobApplicationid,Status,RoundType)
 await pool.query(
        `UPDATE "JobTrackerExtra"
         SET
            "Status" = COALESCE($1, "Status"),
            "ApplicationRound" = COALESCE($2, "ApplicationRound"),
            "RoundType" = COALESCE($3, "RoundType")
         WHERE "JobApplicationid" = $4`,
        [Status, ApplicationRound, RoundType, JobApplicationid]
    );
}


