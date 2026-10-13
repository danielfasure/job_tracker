import {  getextrajobs,getFilteredUserJobs,countFilteredUserJobs,JOB_CATEGORIES} from "../services/JobServices.js";

import {getUserStats} from "../services/StatsUser.js";
import {getuserbyId} from "../services/userServices.js";


export function HomePage(req, res) {
    res.render("index");
}






export async function profilePage(req, res, next) {
 
}




// Keep your existing imports for getUserStats and getextrajobs.

export async function applicationPage(req, res) {
    try {
        const userid = req.user.id;

        // SEARCH
        const search =
            typeof req.query.search === "string"
                ? req.query.search.slice(0, 100)
                : "";

        // STATUS FILTER
        const allowedStatuses = [
            "pending",
            "interview",
            "rejected",
            "offer"
        ];

        const requestedStatus =
            typeof req.query.status === "string"
                ? req.query.status.toLowerCase()
                : "";

        const status = allowedStatuses.includes(requestedStatus)
            ? requestedStatus
            : "";

        // CATEGORY FILTER
        const requestedCategory =
            typeof req.query.category === "string"
                ? req.query.category
                : "";

        const category = JOB_CATEGORIES.includes(
            requestedCategory
        )
            ? requestedCategory
            : "";

        // All filters are passed to both SQL functions
        const filters = {
            search,
            status,
            category
        };

        // PAGINATION
        const limit = 10;

        const parsedPage = Number.parseInt(
            req.query.page,
            10
        );

        const requestedPage =
            Number.isSafeInteger(parsedPage) && parsedPage > 0
                ? parsedPage
                : 1;

        // Count matching jobs before calculating pages
        const totalJobs = await countFilteredUserJobs(
            userid,
            filters
        );

        const totalPages = Math.ceil(totalJobs / limit);

        const currentPage = Math.min(
            requestedPage,
            Math.max(totalPages, 1)
        );

        const offset = (currentPage - 1) * limit;

        // Load page of matching jobs and existing page data
        const stats = await getUserStats(userid);

        const jobs = await getFilteredUserJobs(
            userid,
            filters,
            limit,
            offset
        );

        const extrajobs = await getextrajobs(userid);

        return res.render("application_tracker", {
            stat: stats,
            userid,
            applications: jobs,
            extrajobs: extrajobs ?? [],

            currentPage,
            totalPages,
            totalJobs,

            search,
            status,
            category,
            categories: JOB_CATEGORIES
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
    userid:userid,categories: JOB_CATEGORIES
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
  res.render("setting", { user: User, userid: User.id,categories: JOB_CATEGORIES });

  }catch(error){
    console.error(error);
    res.render("error",{
        message: error.message
    })
  }

}

