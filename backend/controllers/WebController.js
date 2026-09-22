import {  getUserJobs } from "../services/JobServices.js";
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
  const user =await setUser(Username,Password,Email);
  if (user===false){
    res.redirect("/home")
  }
  console.log(user)
  const response = await setUserFirstStats(user.id);



 console.log(response);
  res.redirect("/home");


}
export async function applicationPagemaker(req,res){

  
  if (!req.user) {
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

