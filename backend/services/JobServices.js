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


export async function getUserJobsPaginated(
    userId,
    limit,
    offset
) {
    const result = await pool.query(
        `
        SELECT *
        FROM "JobTracker"
        WHERE "Jobuserid" = $1
        ORDER BY "DateCreated" DESC, id DESC
        LIMIT $2 OFFSET $3
        `,
        [userId, limit, offset]
    );

    return result.rows;
}


export async function countUserJobs(userId) {
    const result = await pool.query(
        `
        SELECT COUNT(*) AS total
        FROM "JobTracker"
        WHERE "Jobuserid" = $1
        `,
        [userId]
    );

    return Number(result.rows[0].total);
}


export async function getextrajobs(id) {

      const result = await pool.query(
    'SELECT * FROM "JobTrackerExtra" WHERE "userid"=$1',[id])

    return result.rows
}


export async function CreateMinimumJob({
    CompanyName,
    jobdescription,
    JobTitle,
    companydateapplied,
    Userid,hourtype,jobtype,jobcategory}
){
    

    const result =  await pool.query(
        'INSERT INTO "JobTracker" ("JobTitle","JobDescription","DateCreated","CompanyName","Jobuserid","hourtype","jobtype","JobCategory")  VALUES ($1, $2, $3, $4,$5,$6,$7,$8)  RETURNING * ' ,[JobTitle,jobdescription,companydateapplied,CompanyName,Userid,hourtype,jobtype,jobcategory]
    )
    return result.rows[0]
}



export async function editMinimumJob({
    CompanyName,
    jobdescription,
    JobTitle,
    companydateapplied,
    applicationnumber,hourtype,jobtype,jobcategory}
){
   
   await pool.query(
        `UPDATE "JobTracker"
         SET
            "CompanyName" = COALESCE($1, "CompanyName"),
            "JobTitle" = COALESCE($2, "JobTitle"),
            "DateCreated" = COALESCE($3, "DateCreated"),
            "JobDescription"= COALESCE($4, "JobDescription"),
            "hourtype"= COALESCE($6, "hourtype"),
            "jobtype"= COALESCE($7, "jobtype"),
            "JobCategory"= COALESCE($8, "JobCategory")

         WHERE "id" = $5`,
        [CompanyName, JobTitle, companydateapplied, jobdescription,applicationnumber,hourtype,jobtype,jobcategory]
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

const JOB_CATEGORIES = [
    "Technology & IT",
    "Data & Analytics",
    "Engineering",
    "Science & Research",
    "Finance & Accounting",
    "Business & Administration",
    "Customer Service & Support",
    "Sales & Business Development",
    "Marketing & Communications",
    "Retail & E-commerce",
    "Warehouse & Logistics",
    "Transport & Driving",
    "Operations & Supply Chain",
    "Healthcare & Social Care",
    "Education & Training",
    "Hospitality & Catering",
    "Construction & Trades",
    "Manufacturing & Production",
    "Human Resources & Recruitment",
    "Design & Creative",
    "Legal",
    "Property & Facilities",
    "Public Sector & Charity",
    "Other"
];


// Build shared search and filter conditions
function buildJobFilters(
    userId,
    { search = "", status = "", category = "" }
) {
    const values = [userId];

    const conditions = [
        `j."Jobuserid" = $1`
    ];

    // Search job title OR company name
    if (search.trim()) {
        values.push(`%${search.trim()}%`);

        const searchParam = `$${values.length}`;

        conditions.push(`
            (
                j."JobTitle" ILIKE ${searchParam}
                OR j."CompanyName" ILIKE ${searchParam}
            )
        `);
    }

    // Filter application status
    if (status) {
        values.push(status.toLowerCase());

        const statusParam = `$${values.length}`;

        conditions.push(`
            EXISTS (
                SELECT 1
                FROM "JobTrackerExtra" e
                WHERE e."JobApplicationid" = j.id
                  AND e."userid" = $1
                  AND LOWER(e."Status") = ${statusParam}
            )
        `);
    }

    // Filter job category
    if (category) {
        values.push(category);

        const categoryParam = `$${values.length}`;

        conditions.push(
            `j."JobCategory" = ${categoryParam}`
        );
    }

    return {
        where: conditions.join(" AND "),
        values
    };
}


// Get filtered applications for the current page
export async function getFilteredUserJobs(
    userId,
    filters,
    limit,
    offset
) {
    const { where, values } = buildJobFilters(
        userId,
        filters
    );

    const result = await pool.query(
        `
        SELECT j.*
        FROM "JobTracker" j
        WHERE ${where}
        ORDER BY j."DateCreated" DESC, j.id DESC
        LIMIT $${values.length + 1}
        OFFSET $${values.length + 2}
        `,
        [...values, limit, offset]
    );

    return result.rows;
}


// Count applications matching the SAME filters
export async function countFilteredUserJobs(
    userId,
    filters
) {
    const { where, values } = buildJobFilters(
        userId,
        filters
    );

    const result = await pool.query(
        `
        SELECT COUNT(*) AS total
        FROM "JobTracker" j
        WHERE ${where}
        `,
        values
    );

    return Number(result.rows[0].total);
}


// Export categories for use in the controller
export { JOB_CATEGORIES };
