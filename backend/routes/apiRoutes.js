import express from "express";

import {
    getJobs,
    createJob,
    Loginchecker,RegisterMaker
   // deleteJob
} from "../controllers/ApiController.js";



const router = express.Router();
router.use(express.static("frontend"));

router.get("/jobs", getJobs);

router.post("/jobs/createjobs", createJob);

//router.delete("/jobs/:id", deleteJob);
router.post("/user/createuser",RegisterMaker)
router.post("/user/loginuser",Loginchecker)
export default router;