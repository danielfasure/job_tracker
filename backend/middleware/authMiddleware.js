 
 import jwt from "jsonwebtoken";
 
 export async function requireAuth(req, res, next) {

    try {

        const token = req.cookies.acessToken;

console.log("ACCESS TOKEN:", req.cookies.acessToken);

        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            
        );

      
        req.user = decoded;
        console.log(req.user)
      
        next();

       

    } 
    catch (error) {

       
        if (error.name !== "TokenExpiredError") {
        
             console.error("AUTH ERROR:", error);
              return res.redirect("/");
        }

        // Access token expired
        const refreshToken = req.cookies.jwt;

        if (!refreshToken) {
            return res.redirect("/");
        }

        try {

            const decodedRefresh = jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET
            );

            const newAccessToken = jwt.sign(
                { id: decodedRefresh.id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1m" }
            );  
            res.cookie("acessToken", newAccessToken, {
            httpOnly: true,
            maxAge:  60 * 1000         
            });


req.user ={id: decodedRefresh.id};
        console.log(req.user)
         next();

         }
         catch{
                 
                 console.error(error)
                  return res.redirect("/");
            }
          
      
    }
}
