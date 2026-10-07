
import { increaseapplicationcount,decreaseapplicationcount} from "../services/StatsUser.js";

import {  AddJobDetail, CreateMinimumJob,Deletejob,AlterJobDetail ,editMinimumJob} from "../services/JobServices.js";
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


const hey= await AddJobDetail({userid:userid,JobApplicationid:job.id})

  console.log("Successfully added job",job);
  increaseapplicationcount(userid);
  res.redirect("/applicationportal");


}
export async function editapplication(req,res){
 const { JobTitle, CompanyName, JobDescription, DateCreated,Applicationnumber } = req.body;
 console.log("added",Applicationnumber)
 const userid= req.user.id;
 await editMinimumJob({JobTitle:JobTitle||null,CompanyName:CompanyName||null,jobdescription:JobDescription||null,companydateapplied:DateCreated||null,applicationnumber:Applicationnumber})
res.redirect("/applicationportal")
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
   const CreatedExtra=  await AddJobDetail({Status:Status,ApplicationRound:ApplicationRound||null,RoundType:RoundType||null,JobApplicationID:JobApplicationID,userid:userid});
   
   return CreatedExtra


}
export async function editextraJobInfo(req,res){
const {Status,ApplicationRound,RoundType,JobApplicationid}= req.body;
console.log(Status,JobApplicationid)
const userid=req.user.id;
await AlterJobDetail({Status:Status||null,ApplicationRound:ApplicationRound||null,RoundType:RoundType||null,JobApplicationid:JobApplicationid})
res.redirect("/applicationportal")
}
