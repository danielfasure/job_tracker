import express from "express";
import "dotenv/config";
import session  from "express-session";

import bcrypt from "bcrypt";

import webRoutes from "./routes/WebRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";
 const port =3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));
app.use("/", webRoutes);
app.use("/api", apiRoutes);

function logger(req, res, next) {
    console.log(req.method, req.url);

    next();
}


app.use(logger);

app.set("view engine", "ejs");
app.set("views", "./views");



app.listen(port,()=>{
    console.log("http://localhost/"+port)
})
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