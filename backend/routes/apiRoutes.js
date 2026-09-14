import express from "express";

import {
    getJobs,
    createJob,
    deleteJob
} from "../controllers/apiController.js";

const router = express.Router();

router.get("/jobs", getJobs);

router.post("/jobs", createJob);

router.delete("/jobs/:id", deleteJob);

export default router;