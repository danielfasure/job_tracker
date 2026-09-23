import "dotenv/config";
import pool from "../db.js";




export async function setUserFirstStats(userid) {
    const result = await pool.query(
        'SELECT * FROM "JobUser" WHERE "id"= $1',[userid]
    )
    if (result.rows.length === 0) {
    return false;
}
const id = result.rows[0].id;
    
  
   

 
const result2 = await pool.query(
    `INSERT INTO "UserStats" ("MostJobsAppliedInADay","NumberOfInterviewsActive","TotalNumberOfApplication","ActiveApplication","userid","FirstLoginDate","LastLoginDate","TotalLoginDays","LoginStreak") VALUES (0,0,0,0,$1,CURRENT_DATE,CURRENT_DATE,1,1) RETURNING *` ,[id]
    
)
return result2.rows[0]
} 


export async function getUserStats(userid) {

    const result = await pool.query(
        'SELECT "TotalLoginDays","MostJobsAppliedInADay","NumberOfInterviewsActive","TotalNumberOfApplication","ActiveApplication","LoginStreak", "FirstLoginDate" FROM "UserStats" WHERE "userid"= $1 ',[userid]
    );

    return result.rows[0];
}

export async function increaseapplicationcount(userid){
    const result = await pool.query(
        'UPDATE "UserStats" SET "TotalNumberOfApplication" = "TotalNumberOfApplication" + 1 WHERE "userid" = $1 RETURNING *',[userid]
    );
    return result.rows[0];
}

export async function decreaseapplicationcount(userid){
    const result = await pool.query(
        'UPDATE "UserStats" SET "TotalNumberOfApplication" = "TotalNumberOfApplication" - 1 WHERE "userid" = $1 RETURNING *',[userid]
    );
    return result.rows[0];
}


export async function updateLoginStats(userid) {

    const Userid = parseInt(userid);

    console.log("Updating login stats for user ID:", Userid);

    const result = await pool.query(
        `SELECT 
            "FirstLoginDate",
            "LastLoginDate",
            "TotalLoginDays",
            "LoginStreak"
         FROM "UserStats"
         WHERE "userid" = $1`,
        [Userid]
    );

    const user = result.rows[0];

    if (!user) {
        console.log("User stats not found for user ID:", Userid);
        throw new Error("User stats not found");
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // First login
    if (!user.FirstLoginDate) {

        await pool.query(
            `UPDATE "UserStats"
             SET
                "FirstLoginDate" = CURRENT_DATE,
                "LastLoginDate" = CURRENT_DATE,
                "TotalLoginDays" = 1,
                "LoginStreak" = 1
             WHERE "userid" = $1`,
            [Userid]
        );

        return;
    }

    const lastLogin = new Date(user.LastLoginDate);
    lastLogin.setHours(0, 0, 0, 0);

    const difference =
        (today - lastLogin) / (1000 * 60 * 60 * 24);

    // Already logged in today
    if (difference === 0) {
        return;
    }

    // Logged in yesterday
    if (difference === 1) {

        await pool.query(
            `UPDATE "UserStats"
             SET
                "LastLoginDate" = CURRENT_DATE,
                "TotalLoginDays" = "TotalLoginDays" + 1,
                "LoginStreak" = "LoginStreak" + 1
             WHERE "userid" = $1`,
            [Userid]
        );

        return;
    }

    // Missed one or more days
    await pool.query(
        `UPDATE "UserStats"
         SET
            "LastLoginDate" = CURRENT_DATE,
            "TotalLoginDays" = "TotalLoginDays" + 1,
            "LoginStreak" = 1
         WHERE "userid" = $1`,
        [Userid]
    );
}