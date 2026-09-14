import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(express.urlencoded({extended:true}));



app.use(express.static("frontend"));


const client = new pg.Client({
    user: "daniel",
    host: "localhost",
    database: "job_tracker_db",
    password: "Ayomikun12!",
    port: 5432
});

client.connect();








function query(req, res) {

    client.query("SELECT * FROM jobinfo", (err, result) => {

        if (err) {
            console.error("Error doing this query", err.stack);
            return res.status(500).send("Database error");
            
        }

        const jobs = result.rows;

        res.render("tracker.ejs", { job: jobs });

        
    });
}








app.post("/portal",(req,res)=>{
  const {data} = req.body;
  
  console.log()
 res.render("application_tracker.ejs",)
    
})

app.get("/portal",(req,res)=>{
 res.render("application_tracker.ejs");

});

app.get("/home",(req,res)=>{
 res.render("index.ejs");

});


// withoutmiddle ware 
/*app.get("/",(req,res)=>{
    res.sendFile("/frontend/index.html");
  
}); */

app.get("/tracker",  (req,res)=>{
    query(req,res)
    
})

app.listen(port,()=>{
    console.log(`services running on host port ${port}`);


});




