import { getAllJobs } from "../services/JobServices.js";
import {getUserStats} from "../services/userServices.js";

export async function ShowJobs(req, res) {

    const jobs = await getAllJobs();

    res.render("jobs", {
        job: jobs
    });
}

export async function HomePage(req,res){
    res.render("index")

}

export async function TrackerPage(req,res){
    res.render("application_tracker")
}

export async function register(req,res) {
  
  const userid =req.session.user.userid;
  const response = await getUserStats(userid);

console.log("SESSION USER:", req.session.user);
console.log("USERID:", userid);

  res.render("application_tracker",{
    stat: response,
    userid:userid

  });


}
export async function login(req,res){
  const userid =req.session.user.userid;
  const response = await getUserStats(userid);
  console.log("SESSION USER:", req.session.user);
console.log("USERID:", userid);

res.render("application_tracker",{
    stat: response,
    userid:userid

  });

}

