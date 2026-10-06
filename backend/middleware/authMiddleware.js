 
 import jwt from "jsonwebtoken";
 
 export async function requireAuth(req, res, next) {


    const token = req.cookies.acessToken;

    console.log("ACCESS TOKEN:", token);

    // No access token
    if (!token) {

        console.log("ACCESS TOKEN MISSING");

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
                maxAge: 60 * 1000
            });

            req.user = {
                id: decodedRefresh.id
            };

            return next();

        } catch (error) {

            console.error("REFRESH ERROR:", error);

            return res.redirect("/");
        }
    }

    // Access token exists
    try {

        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET
        );

        req.user = decoded;

        return next();

    } catch (error) {

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
                maxAge: 60 * 1000
            });

            req.user = {
                id: decodedRefresh.id
            };

            return next();

        } catch (error) {

            console.error("REFRESH ERROR:", error);

            return res.redirect("/");
        }
    }
}
    

