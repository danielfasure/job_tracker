import {  getUserJobs,CreateJobs } from "../services/JobServices.js";
import {setUser} from "../services/userServices.js";
import {updateLoginStats, setUserFirstStats,getUserStats, increaseapplicationcount,decreaseapplicationcount} from "../services/StatsUser.js";
import  passport from "passport";
import jwt from "jsonwebtoken";
import {Authentication, requireAuth} from "../services/authservices.js";

export async function register(req,res) {
    console.log("REGISTER");
   

  const {Username ,Password,Email} = req.body;
  const User =await setUser(Username,Password,Email);
  if (User===false){
    console.log("Failed to add user");
   return  res.redirect("/home")
  }
  req.login(User,async (err)=>{
    if (err) {
        console.log("Error logging in user:", err);
        return res.redirect("/home")
    }
    console.log("User logged in successfully:", req.user);
   



 
 
    
  
  
  console.log("User ID:", req.user.id);
 const stats =await setUserFirstStats(req.user.id);

console.log("Successfully added stats",stats);

 console.log("successfully added user and stats",req.user.id);
  return res.redirect("/applicationportal");
  }); 

 
}



    
