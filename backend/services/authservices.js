import pool from "../db.js";
import passport from "passport";


export async function Authentication() {




passport.authenticate("local", (err, user, info) => {

        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        const token = jwt.sign(
            {
                userId: user.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24
        });

        return res.redirect("/applicationportal")})
    
    }
    export async function requireAuth(req, res, next) {

    try {

        const token = req.cookies.authToken;

        if (!token) {
            return res.redirect("/home");
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
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

        next();

    } catch (error) {

        console.error("AUTH ERROR:", error);

        return res.redirect("/home");
    }
}
