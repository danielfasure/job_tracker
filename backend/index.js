import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));


app.use(express.static("frontend"))



app.post("/submit",(req,res)=>{
  const  username = req.body.username;
 const   password = req.body.password;
 res.render("application_tracker.ejs",{
    daytype:username,
    day_password:password
    });
})

app.get("/home",(req,res)=>{
 res.render("index.ejs");

});

app.get("/",(req,res)=>{
    res.sendFile("/frontend/index.html");
  
});
app.get("/")

app.listen(port,()=>{
    console.log(`services running on host port ${port}`);

});




