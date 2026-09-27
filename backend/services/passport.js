
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import pool from "../db.js";
import passport from "passport";
export default function configurePassport() {


passport.use(
    new LocalStrategy(
       { usernameField: "Username",
        passwordField: "Password"
    },
        async (Username, Password, done) => {

            try {
                const result = await pool.query(
                    'SELECT * FROM "JobUser" WHERE "Username" = $1',
                    [Username]
                );

                if (result.rows.length === 0) {
                    return done(null, false);
                }
                    console.log("LOGIN USERNAME:", Username);
                    console.log("USER FOUND:", result.rows.length);
                const user = result.rows[0];

                const match = await bcrypt.compare(
                    Password,
                    user.Password
                );

                if (!match) {
                    return done(null, false);
                }

                return done(null, user);

            } catch (error) {
                return done(error);
            }
        }
    )
);

   passport.serializeUser((user, done) => {
    console.log("SERIALIZE:", user.id);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {

    console.log("DESERIALIZE:", id);

    try {
        const result = await pool.query(
            'SELECT * FROM "JobUser" WHERE "id" = $1',
            [id]
        );

        console.log("DESERIALIZE FOUND:", result.rows.length);

        if (result.rows.length === 0) {
            return done(null, false);
        }

        done(null, result.rows[0]);

    } catch (error) {
        console.error("DESERIALIZE ERROR:", error);
        done(error);
    }
});
    return passport;


}