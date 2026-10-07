
import { increaseapplicationcount,decreaseapplicationcount} from "../services/StatsUser.js";

import {  AddJobDetail, CreateMinimumJob,Deletejob } from "../services/JobServices.js";
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
console.log("JOB:", job);
console.log("JOB ID:", job.id);
job.id
const hey= await AddJobDetail({userid:userid,JobApplicationid:job.id})

  console.log("Successfully added job",job);
  increaseapplicationcount(userid);
  res.redirect("/applicationportal");


}





export async function removeJob(req,res){
   

  const { applicationId } = req.body;
  console.log(applicationId)

const result = await decreaseapplicationcount(applicationId);
 await Deletejob(applicationId);
  
  console.log("Successfully removed job",);
  res.redirect("/applicationportal")

}


export async function extraJobInfo(req,res){

  const {Status,ApplicationRound,RoundType,JobApplicationID  }= req.body;
 const userid=req.user.id;
   const CreatedExtra=  await AddJobDetail({Status:Status,ApplicationRound:ApplicationRound,RoundType:RoundType,JobApplicationID:JobApplicationID,userid:userid});
   
   return CreatedExtra


}
