import "dotenv/config";
import pool from "../db.js";

export async function getUserStats(userid) {

    const result = await pool.query(
        'SELECT "DaysLogedIn","MostJobsAppliedInADay","NumberOfInterviewsActive","TotalNumberOfApplication","ActiveApplication" FROM "UserStats" WHERE "userid"= $1 ',[userid]
    );

    return result.rows;
}
export async function getuserid(username) {{
    const result = await pool.query(
        'SELECT id FROM "JobUser" WHERE "Username"= $1',[username]
    )
    return result.rows[0];
}
}
export async function checkuser(Password)
{
    const result = await pool.query(
        'SELECT "Password" FROM "JobUser" WHERE "Password"=$1',[Password]
    );
     return result.rows[0]; 
}

export async function setUser(Username,Password,Email) {
    {

        const result =  await pool.query(
        'INSERT INTO "JobUser" ("Username","Password","Email")  VALUES ($1, $2, $3)',[Username,Password,Email]
    )
    const userid = await pool.query(
        `SELECT id FROM "JobUser" WHERE "Username"= $1`,[Username]
    )
    return userid.rows[0];
   
    }
}
