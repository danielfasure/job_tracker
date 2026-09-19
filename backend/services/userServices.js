import "dotenv/config";
import pool from "../db.js";
import bcrypt, { hash } from "bcrypt";

const saltRounds =10;

export async function addUserStats(userid) {
    const DaysLogedIn = 1;
   
    const MostJobsAppliedInADay =0;
     const TotalNumberOfApplication =0;
      const ActiveApplication =0;
      const NumberOfInterviewsActive=0;
     
 
const result = await pool.query(
    `INSERT INTO "UserStats" ("DaysLogedIn","MostJobsAppliedInADay","NumberOfInterviewsActive","TotalNumberOfApplication","ActiveApplication","userid") VALUES ($1,$2,$3,$4,$5,$6)` ,[DaysLogedIn,MostJobsAppliedInADay,NumberOfInterviewsActive,TotalNumberOfApplication,ActiveApplication,userid]
    
)
}

export async function getUserStats(userid) {

    const result = await pool.query(
        'SELECT "DaysLogedIn","MostJobsAppliedInADay","NumberOfInterviewsActive","TotalNumberOfApplication","ActiveApplication" FROM "UserStats" WHERE "userid"= $1 ',[userid]
    );

    return result.rows[0];
}
export async function getuserid(username) {{
    const result = await pool.query(
        'SELECT id FROM "JobUser" WHERE "Username"= $1',[username]
    )
    return result.rows[0];
}
}
export async function checkuser(Username,Password)
{
    const result = await pool.query(
        'SELECT * FROM "JobUser" WHERE "Username"=$1',[Username]
    );
    let verify ;
   
    if(result.rows.length===0){
        verify= {verify:"no"
    };

        }
              const storeduser= result.rows[0]    ;
                 const stored_password=  storeduser.Password;

            
    try {
        const match = await bcrypt.compare(Password, stored_password);

        if (match) {
            return { verify: "yes" };
        }

        return { verify: "no" };

    } catch (err) {
        console.log("error occurred", err);
        return { verify: "no" };
    }
  

        }




      
     
   


export async function setUser(Username, Password, Email) {

    const hash = await bcrypt.hash(Password, saltRounds);

    await pool.query(
        'INSERT INTO "JobUser" ("Username", "Password", "Email") VALUES ($1, $2, $3)',
        [Username, hash, Email]
    );

    const userid = await pool.query(
        'SELECT id FROM "JobUser" WHERE "Username" = $1',
        [Username]
    );

    return userid.rows[0];
}