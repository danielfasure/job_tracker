
import { increaseapplicationcount,decreaseapplicationcount} from "../services/StatsUser.js";

import {  CreateJobs } from "../services/JobServices.js";
export async function CreateJob(req,res){
  
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

  const { jobId } = req.body;
 
  const result = await decreaseapplicationcount(jobId);
  console.log("Successfully removed job",result);

}