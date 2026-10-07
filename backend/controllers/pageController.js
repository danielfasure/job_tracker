import {  getUserJobs,getextrajobs } from "../services/JobServices.js";

import {getUserStats} from "../services/StatsUser.js";
import {getuserbyId} from "../services/userServices.js";


export function HomePage(req, res) {
    res.render("index");
}






export async function profilePage(req, res, next) {
 
}

export async function applicationPage(req, res) {
    try {
        
        const userid = req.user.id;
        console.log("User ID:", userid);

        const stats = await getUserStats(userid);
        const jobs = await getUserJobs(userid);
        const extrajobs = await getextrajobs(userid)
        console.log(jobs)
        

        return res.render("application_tracker", {
            stat: stats,
            userid: userid,
            applications: jobs,
            extrajobs:extrajobs?? []
        });

    } catch (error) {
        console.error(error);

         res.render("error", {
        message: error.message
    });

    }
}

export async function statsPage(req,res){
 try {

      const userid = req.user.id;
    const userstats= await getUserStats(userid);


    res.render("statistics",
        {
    stat:userstats,
    userid:userid
 } );



}catch(error){
       console.error(error);

       try{
        userid= req.user.id;

         res.render("error", {
        message: error.message,userid:userid
    });
       }
       catch{
        console.error("Error retrieving user ID:", error);
          res.render("error", {
        message: error.message
       });
       


 
}
}
}


export async function  settingPage(req,res){
  try{
  
 const userid=    req.user.id;
 console.log("User ID:", userid);

  const User=  await getuserbyId(userid) 
  res.render("setting", { user: User, userid: User.id });

  }catch(error){
    console.error(error);
    res.render("error",{
        message: error.message
    })
  }

}

