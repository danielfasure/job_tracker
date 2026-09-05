import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "node:url";
const __dirname =dirname(fileURLToPath(import.meta.url));
const __parentDirectory = path.join(__dirname, "..");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));


app.use(express.static("frontend"))

app.get("/",(req,res)=>{
    res.sendFile(__parentDirectory+"/frontend/index.html");
  
});
app.get("/")

app.listen(port,()=>{
    console.log(`services running on host port ${port}`);

});




