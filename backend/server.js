import express from "express";
import "dotenv/config";
import session  from "express-session";


import path from "path";
import { fileURLToPath } from "url";

import passport from "passport";
import webRoutes from "./routes/WebRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";

import configurePassport from "./services/passport.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, "..");


const app = express();
app.use(express.static(path.join(projectRoot, "frontend")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

configurePassport();

app.use("/", webRoutes);
app.use("/api", apiRoutes);

function logger(req, res, next) {
    console.log(req.method, req.url);
    next();
}

app.use(logger);

app.set("view engine", "ejs");
app.set("views", path.join(projectRoot, "views"));

if (process.env.NODE_ENV !== "production") {
    app.listen(3000, () => {
        console.log("http://localhost:3000");
    });
}

export default app;
/*
app.get("/job", async (req, res) => {
    const result = await pool.query("SELECT * FROM jobinfo");

    res.json(result.rows);
});

app.get("/job/:id", async (req, res) => {
    const id = req.params.id;

    const result = await pool.query(
        "SELECT * FROM jobinfo WHERE id = $1",
        [id]
    );

    res.json(result.rows);
});

app.post("/job_adder", async (req, res) => {
    const { name, email } = req.body;

    const result = await pool.query(
        "INSERT INTO jobinfo (name, email) VALUES ($1, $2) RETURNING *",
        [name, email]
    );

    res.status(201).json(result.rows[0]);
});

app.put("/users/:id", async (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;

    const result = await pool.query(
        `UPDATE jobinfo
         SET name = $1, email = $2
         WHERE id = $3
         RETURNING *`,
        [name, email, id]
    );

    res.json(result.rows[0]);
});


app.delete("/users/:id", async (req, res) => {
    const id = req.params.id;

    await pool.query(
        "DELETE FROM users WHERE id = $1",
        [id]
    );

    res.status(204).send();
});
*/