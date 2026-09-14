import { getAllJobs } from "../services/jobService.js";

export async function showJobs(req, res) {

    const jobs = await getAllJobs();

    res.render("jobs", {
        jobs: jobs
    });
}