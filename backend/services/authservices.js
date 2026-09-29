import pool from "../db.js";
import passport from "passport";



    export async function loginToken(req,res){
     const token= await pool.query('SELECT * FROM "Token" WHERE "userId" = $1',[userid]


        );
    if (!token.id===undefined ) {
            console.log("token")
            res.redirect("/")
    }   

    }



    export async function requireAuth(req, res, next) {

    try {

        const token = req.cookies.jwt;

      

        const decoded = jwt.verify(
            token,
            process.env.ACESSS_TOKEN_SECRET,
            (err,decoded)=>{
                req.user= decoded.id
            }
        );

        const result = await pool.query(
            'SELECT * FROM "JobUser" WHERE id = $1',
            [decoded.userId]
        );

        const user = result.rows[0];

        if (!user) {
            return res.redirect("/home");
        }

        req.user = user;

        return user.id;

    } catch (error) {

        console.error("AUTH ERROR:", error);

        return res.redirect("/home");
    }
}
