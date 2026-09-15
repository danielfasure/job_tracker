import express from "express";

import {
    ShowJobs,
    HomePage,
    TrackerPage
    

   // showJob
} from "../controllers/WebController.js";

const router = express.Router();
router.use(express.static("frontend"));

router.get("/jobs", ShowJobs);

router.get("/home",HomePage)

router.get("/job_dashboard",TrackerPage)

//router.get("/jobs/:id", showJob);

export default router;