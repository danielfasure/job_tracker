


// here will be the services that handle the connection to db
   
    export async function HandlerefreshToken(){
        const refreshToken = req.cookies.jwt;
         try {
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const newAccessToken = jwt.sign(
            { id: decoded.id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );


        res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
         maxAge: 15 * 60 * 1000
});
    }catch(error){


    }
}



    


   