import {  getUserJobs } from "../services/JobServices.js";
import {getUserStats,authenticateUser,setUser,setUserFirstStats} from "../services/userServices.js";




export async function ShowUserapplication(req, res) {

    const jobs = await getUserJobs(req.userd);

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
    console.log(req.method);
    console.log(req.headers["content-type"]);
    console.log(req.body);

  const {Username ,Password,Email} = req.body;
  const user =await setUser(Username,Password,Email);
  if (user===false){
    res.redirect("/home")
  }
  const response = await setUserFirstStats(user.id);




  res.render("application_tracker",{
    stat: response,
    userid:user.id

  });


}
export async function applicationPagemaker(req,res){

  
  if (!req.session.user) {
    return res.redirect("/home");
}
   
   const userid =req.session.user.id;
  const response = await getUserStats(userid);

console.log("USERID:", userid);

 res.render("application_tracker",{
    stat: response,
    userid:userid

  });

}




export async function authorizeduser() {
  authenticateUser();
  
  
}

