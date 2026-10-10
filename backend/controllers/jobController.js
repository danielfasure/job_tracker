
import { increaseapplicationcount,decreaseapplicationcount} from "../services/StatsUser.js";

import {  AddJobDetail, CreateMinimumJob,Deletejob,AlterJobDetail ,editMinimumJob} from "../services/JobServices.js";
export async function CreateJob(req,res){
  
  const { JobTitle, CompanyName, JobDescription, DateCreated,hourtype,jobtype } = req.body;
  const userid = req.user.id;
 const job = await CreateMinimumJob(
    CompanyName,
    JobDescription,
    JobTitle,
    DateCreated,
    userid,hourtype,jobtype
);


const hey= await AddJobDetail({userid:userid,JobApplicationid:job.id})

  console.log("Successfully added job",job);
  increaseapplicationcount(userid);
  res.redirect("/applicationportal");


}
export async function editapplication(req,res){
 const { JobTitle, CompanyName, JobDescription, DateCreated,Applicationnumber,hourtype,jobtype } = req.body;
 const userid= req.user.id;
 await editMinimumJob({JobTitle:JobTitle||null,CompanyName:CompanyName||null,jobdescription:JobDescription||null,companydateapplied:DateCreated||null,applicationnumber:Applicationnumber,jobtype:jobtype||null,hourtype:hourtype||null})
res.redirect("/applicationportal")
}





export async function removeJob(req,res){
   

  const { Applicationnumber } = req.body;
  console.log(Applicationnumber)

const result = await decreaseapplicationcount({userid:req.user.userid});

 await Deletejob({applicationid:Applicationnumber});
  
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

const {Status,ApplicationRound,RoundType,Applicationnumber}= req.body;


 await AlterJobDetail({
        Status: Status || null,
        ApplicationRound: ApplicationRound,
        RoundType: RoundType || null,
        JobApplicationid: Applicationnumber
    });

res.redirect("/applicationportal")
}
