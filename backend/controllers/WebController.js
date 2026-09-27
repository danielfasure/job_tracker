import {  getUserJobs,CreateJobs } from "../services/JobServices.js";
import {setUser} from "../services/userServices.js";
import {updateLoginStats, setUserFirstStats,getUserStats, increaseapplicationcount,decreaseapplicationcount} from "../services/StatsUser.js";
import  passport from "passport";
import jwt from "jsonwebtoken";
import {Authentication, requireAuth} from "../services/authservices.js";




export async function ShowUserapplication(req, res) {
const userid =req.user.id;
    const jobs = await getUserJobs(userid);

    res.render("jobs", {
        job: jobs
      
    });
}
export  function HomePage(req,res){

    res.render("index");

}
export function LoginPage(req, res, next) {
     Authentication()

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

        return res.redirect("/applicationportal");
      }(req, res, next);





// connect to my post router this function will go inisde the database and set user and add stats with the user and will  render the application pass in the user id
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
export async function CreateJob(req,res){
  if (!req.isAuthenticated()) {
    console.log("User not authenticated, redirecting to home page");
    return res.redirect("/home");
}
  const { JobTitle, CompanyName, JobDescription, DateCreated } = req.body;
  const userid = req.user.id;
 const job = await CreateJobs(
    CompanyName,
    JobDescription,
    JobTitle,
    DateCreated,
    userid
);

  console.log("Successfully added job",job);
  increaseapplicationcount(userid);
  res.redirect("/applicationportal");


}
export async function removeJob(req,res){
  if (!req.isAuthenticated()) {
    console.log("User not authenticated, redirecting to home page");
    return res.redirect("/home");
}
  const { jobId } = req.body;
 
  const result = await decreaseapplicationcount(jobId);
  console.log("Successfully removed job",result);

}

export async function applicationPagemaker(req,res,next){

 await requireAuth(req,res,next)
  
   
   const userid =req.user.id;
    await updateLoginStats(userid);
  const response = await getUserStats(userid);




 const userjobs=await getUserJobs(userid);
if (!userjobs) {
  return res.render("application_tracker", {
    stat: response,
    userid:userid,});
  }
console.log("User jobs:", userjobs);
 res.render("application_tracker",{
    stat: response,
    userid:userid,
    applications:userjobs

  });

}
export async function statsPage(req,res){
  if (!req.isAuthenticated()) {
    console.log("User not authenticated, redirecting to home page");
    return res.redirect("/home");
}

const userstats=await getUserStats(req.user.id);
res.render("statistics",{
  stat:userstats } );


}
export async function  settingPage(req,res){
  console.log("useris",req.user);
   if (!req.isAuthenticated()) {
    console.log("User not authenticated, redirecting to home page");
    return res.redirect("/home");
}
res.render("setting", { user: req.user });

}




export async function logout(req,res,next) {
  
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        res.redirect("/home");
    });
  
}


