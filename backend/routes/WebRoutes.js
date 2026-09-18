import express from "express";

import {
    ShowJobs,
    HomePage,
    TrackerPage,
    login,
    register
    

   // showJob
} from "../controllers/WebController.js";

const router = express.Router();
router.use(express.static("frontend"));

router.get("/jobs", ShowJobs);

router.get("/home",HomePage)

router.get("/job_dashboard",TrackerPage)
router.get("/login",login)
router.get("/register",register)

//router.get("/jobs/:id", showJob);

export default router;