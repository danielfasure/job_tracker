import express from "express";

import {
    ShowJobs,
    HomePage,
  ShowUserJobs,
    login,
    register
    

   // showJob
} from "../controllers/WebController.js";

const router = express.Router();
router.use(express.static("frontend"));



router.get("/home",HomePage)


router.get("/login",login)
router.get("/register",register)

router.get("/jobs/:userid", ShowUserJobs);

export default router;