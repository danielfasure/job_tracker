import {  getUserJobs, } from "../services/JobServices.js";

import {getUserStats} from "../services/StatsUser.js";


export function HomePage(req, res) {
    res.render("index");
}






export async function profilePage(req, res, next) {
 
}

export async function applicationPage(req, res) {
    try {
        const userid = req.user.id;

        const stats = await getUserStats(userid);
        const jobs = await getUserJobs(userid);

        return res.render("application_tracker", {
            stat: stats,
            userid,
            applications: jobs
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
    stat:userstats
 } );



}catch(erorr){
       console.error(error);
     res.render("error", {
        message: error.message
    });
}

 
}


export async function  settingPage(req,res){
  try{
  User=  await getuser(req.user.id) 
  res.render("setting", { user: User});

  }catch(erorr){
    console.error(error);
    res.render("error",{
        message: error.message
    })
  }

}

export async function logout(req,res,next) {
  
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        res.redirect("/home");
    });
  
}