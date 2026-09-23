import {  getUserJobs,createJobs } from "../services/JobServices.js";
import {setUser} from "../services/userServices.js";
import {updateLoginStats, setUserFirstStats,getUserStats} from "../services/StatsUser.js";




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
  const {JobTitle,CompanyName,JobDescription,DateCreated} = req.body;
  const userid = req.user.id;
  const job = await createJobs(JobTitle,CompanyName,JobDescription,DateCreated,userid);
  console.log("Successfully added job",job);
  res.redirect("/applicationportal");


}



export async function applicationPagemaker(req,res){

  
  if (!req.isAuthenticated()) {
    console.log("User not authenticated, redirecting to home page");
    return res.redirect("/home");
}
   
   const userid =req.user.id;
    await updateLoginStats(userid);
  const response = await getUserStats(userid);

console.log("USERID:", userid);
console.log(response);

 res.render("application_tracker",{
    stat: response,
    userid:userid

  });

}




export async function logout(req,res,next) {
  
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        res.redirect("/home");
    });
  
}

