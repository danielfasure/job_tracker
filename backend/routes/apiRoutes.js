import express from "express";

import {
    getJobs,
    createJob,
   // deleteJob
} from "../controllers/ApiController.js";


const router = express.Router();
router.use(express.static("frontend"));

router.get("/jobs", getJobs);

router.post("/jobs/createjobs", createJob);

//router.delete("/jobs/:id", deleteJob);

export default router;