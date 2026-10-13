import {  getUserJobs,getextrajobs,getUserJobsPaginated,
    countUserJobs } from "../services/JobServices.js";

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

        // 1. Choose how many jobs appear on each page.
        const limit = 10;

        // 2. Find out which page the user requested.
        const requestedPage = Math.max(
            1,
            Number.parseInt(req.query.page, 10) || 1
        );

        // 3. Get the total number of applications.
        const totalJobs = await countUserJobs(userid);

        // 4. Work out how many pages are needed.
        const totalPages = Math.ceil(totalJobs / limit);

        // 5. Prevent requests for pages that do not exist.
        const currentPage = Math.min(
            requestedPage,
            Math.max(totalPages, 1)
        );

        // 6. Work out how many jobs to skip.
        const offset = (currentPage - 1) * limit;

        // 7. Fetch only the jobs for this page.
        const stats = await getUserStats(userid);

        const jobs = await getUserJobsPaginated(
            userid,
            limit,
            offset
        );

        // 8. Keep your existing extra information.
        const extrajobs = await getextrajobs(userid);
        console.log("Extra page", currentPage, "of", totalPages, "for user", userid);
        

        // 9. Send everything to EJS.
        return res.render("application_tracker", {
            stat: stats,
            userid: userid,
            applications: jobs,
            extrajobs: extrajobs ?? [],
            currentPage,
            totalPages
        });

    } catch (error) {
        console.error(error);

        return res.render("error", {
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

