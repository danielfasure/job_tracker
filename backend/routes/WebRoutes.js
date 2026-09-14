import express from "express";

import {
    showJobs,
    showJob
} from "../controllers/webController.js";

const router = express.Router();

router.get("/jobs", showJobs);

router.get("/jobs/:id", showJob);

export default router;