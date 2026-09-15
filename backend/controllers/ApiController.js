import {
    CreateJob,
    getAllJobs,
  //  createJob,
  //  deleteJob
} from "../services/JobServices.js";

export async function getJobs(req, res) {

    const jobs = await getAllJobs();

    res.json(jobs);
}
export async function createJob(req,res){
  const {jobname,jobdescription,datewhenapplied} = req.body;
  const worked= CreateJob(jobname,jobdescription,datewhenapplied);
   res.redirect("/job_dashboard")
  res.json(worked);

}