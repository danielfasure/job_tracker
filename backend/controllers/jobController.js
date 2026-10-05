
import { increaseapplicationcount,decreaseapplicationcount} from "../services/StatsUser.js";

import {  CreateMinimumJob,Deletejob } from "../services/JobServices.js";
export async function CreateJob(req,res){
  
  const { JobTitle, CompanyName, JobDescription, DateCreated } = req.body;
  const userid = req.user.id;
 const job = await CreateMinimumJob(
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
   

  const { applicationId } = req.body;
  console.log(applicationId)


 await Deletejob(applicationId);
  const result = await decreaseapplicationcount(applicationId);
  console.log("Successfully removed job",);
  res.redirect("/applicationportal")

}


export async function extraJobInfo(req,res){

  const {Status,ApplicationRound,RoundType,JobApplicationID  }= req.body;

   const CreatedExtra=  await CreateMinimumJob(Status,ApplicationRound,RoundType,JobApplicationID);
   
   return CreatedExtra


}