import "dotenv/config";
import pool from "../db.js";




export async function setUserFirstStats(Username) {
    const result = await pool.query(
        'SELECT id FROM "JobUser" WHERE "Username"= $1',[Username]
    )
    if (result.rows.length === 0) {
    return false;
}
const id = result.rows[0].id;
    
    const DaysLogedIn = 1;
   
    const MostJobsAppliedInADay =0;
     const TotalNumberOfApplication =0;
      const ActiveApplication =0;
      const NumberOfInterviewsActive=0;
     
 
const result2 = await pool.query(
    `INSERT INTO "UserStats" ("DaysLogedIn","MostJobsAppliedInADay","NumberOfInterviewsActive","TotalNumberOfApplication","ActiveApplication","userid") VALUES ($1,$2,$3,$4,$5,$6) RETURNING *` ,[DaysLogedIn,MostJobsAppliedInADay,NumberOfInterviewsActive,TotalNumberOfApplication,ActiveApplication,id]
    
)
return result2.rows[0]
} 


export async function getUserStats(userid) {

    const result = await pool.query(
        'SELECT "DaysLogedIn","MostJobsAppliedInADay","NumberOfInterviewsActive","TotalNumberOfApplication","ActiveApplication" FROM "UserStats" WHERE "userid"= $1 ',[userid]
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


export async function updateLoginStats(userId) {

    const result = await pool.query(
        `SELECT 
            "FirstLoginDate",
            "LastLoginDate",
            "TotalLoginDays",
            "LoginStreak"
         FROM "UserStats"
         WHERE "userid" = $1`,
        [userId]
    );

    const user = result.rows[0];

    if (!user) {
        throw new Error("User not found");
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // First login
    if (!user.FirstLoginDate) {

        await pool.query(
            `UPDATE "JobUser"
             SET
                "FirstLoginDate" = CURRENT_DATE,
                "LastLoginDate" = CURRENT_DATE,
                "TotalLoginDays" = 1,
                "LoginStreak" = 1
             WHERE "id" = $1`,
            [userId]
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
             WHERE "id" = $1`,
            [userId]
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
         WHERE "id" = $1`,
        [userId]
    );
}