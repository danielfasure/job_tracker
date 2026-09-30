 
 import jwt from "jsonwebtoken";
 
 export async function requireAuth(req, res, next) {

    try {

        const token = req.cookies.acessToken;

      

        const decoded = jwt.verify(
            token,
            process.env.ACESSS_TOKEN_SECRET,
            
        );

      
        req.user = decoded;
        console.error(req.user)
      


       

    } 
    catch (error) {

        console.error("AUTH ERROR:", error);
        if (error.name !== "TokenExpiredError") {
            return res.redirect("/");
        }

        // Access token expired
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.redirect("/");
        }

        try {

            const decodedRefresh = jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET
            );

            const newAccessToken = jwt.sign(
                { userid: decodedRefresh.userid },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "2m" }
            );  

         req.user ={ id:decodedRefresh.id}

         }
         catch{
                 return res.redirect("/");
            }
            console.error(error)

        return res.redirect("/home");
    }
}
