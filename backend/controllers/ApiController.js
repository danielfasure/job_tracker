import {
    getAllJobs,
    createJob,
    deleteJob
} from "../services/jobService.js";

export async function getJobs(req, res) {

    const jobs = await getAllJobs();

    res.json(jobs);
}