import {  getUserJobs,CreateJobs } from "../services/JobServices.js";
import {setUser,getuser} from "../services/userServices.js";
import {updateLoginStats, setUserFirstStats,getUserStats, increaseapplicationcount,decreaseapplicationcount} from "../services/StatsUser.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function register(req,res) {
    console.log("REGISTER");
   

  const {Username ,Password,Email} = req.body;
  const User =await setUser(Username,Password,Email);
  if (User===false){
    console.log("Failed to add user");
   return  res.redirect("/home")
  }


  console.log("User ID:", req.user.id);
 const stats =await setUserFirstStats(req.user.id);

console.log("Successfully added stats",stats);

 console.log("successfully added user and stats",req.user.id);
  return res.redirect("/applicationportal");
  

 
}
export async function Loginchecker(req,res){
    try {
        const {Username,Password}= req.body
        const user =  await getuser(Username)
        console.log(Password)

        console.log(user.Password)
        const match = await bcrypt.compare(Password,user.Password)
        if (match){
            const accessToken = jwt.sign({
            "id":user.id},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'30s'})
            res.cookie("acessToken", accessToken, {
              httpOnly: true,
             maxAge: 2 * 60 * 1000 //2min
            });

         const refreshToken = jwt.sign({
            "id":user.id},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'});
            res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 //1 day
});
  return res.redirect("/applicationportal");


        }
        res.redirect("/")
        

    } catch (error) {
        console.error(error)
        res.render("/")
    }





}

export async function logout(req,res) {
  
   

    res.clearCookie("acessToken");
    res.clearCookie("jwt");

    return res.redirect("/");
}
  


    
