import { getAllJobs } from "../services/JobServices.js";

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