import express from "express";

import {
   
    HomePage,
     applicationPagemaker,
    register,
    ShowUserapplication,logout,CreateJob,
    statsPage,settingPage,LoginPage
    

   // showJob
} from "../controllers/WebController.js";

const router = express.Router();
router.use(express.static("frontend"));



router.get("/home",HomePage)
router.get("/",HomePage)
router.get("/applicationportal",applicationPagemaker)
router.get("/statistics",statsPage)
router.get("/setting",settingPage)

router.post("/login",LoginPage)
router.post("/register",register)
router.post("/logout",logout)
router.post("/createjob",CreateJob)

router.post("/jobs/:userid", ShowUserapplication);

export default router;