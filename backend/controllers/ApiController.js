import {
    CreateJob,
    getAllJobs,
    

 
  //  deleteJob
} from "../services/JobServices.js";

import { 
  setUser,
  getuserid,checkuser
  
} 
  from "../services/userServices.js";


export async function getJobs(req, res) {

    const jobs = await getAllJobs();
 console.log(jobs);
    res.json(jobs);
     console.log(jobs);
}

export async function RegisterMaker(req,res) {
  const {Username,Password,Email}=req.body;
  
  const response = await setUser(Username,Password,Email);
  const userid=response.id ;
  req.session.user = {
    username: Username,
    email: Email,
    userid:userid
};
res.redirect(`/register`);

}

export async function Loginchecker(req,res){
  const{Username,Password}= req.body;
  const Userid =  await getuserid(Username);
  const verify = await checkuser(Password)
  if (verify !== null && Userid !==null) {
    res.redirect(`/home`);

  }
  console.log(Userid);
 const userid =Userid.id;
 console.log(userid)
  req.session.user= {
    userid:userid,
    username:Username
  };
res.redirect(`/login`);

}

export async function createJob(req,res){
  const {CompanyName,JobTitle,jobdescription,companydateapplied,userid} = req.body;
  

  const worked= CreateJob(CompanyName,jobdescription,JobTitle,companydateapplied,userid);
   res.redirect(`/login`)


}







