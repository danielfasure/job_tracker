import express from "express";

import {
   
   
    
    
    ShowUserapplication,CreateJob,
    
    

   // showJob
} from "../controllers/WebController.js";

import * as pageController from "../controllers/pageController.js"

const router = express.Router();
router.use(express.static("frontend"));



router.get("/home",pageController.HomePage)
router.get("/",pageController.HomePage)
router.get("/applicationportal",pageController.applicationPage)
router.get("/statistics",pageController.statsPage)
router.get("/setting",pageController.settingPage)

router.post("/login",pageController.HomePage)
router.post("/register",pageController.HomePage)
router.post("/logout",pageController.logout)
router.post("/createjob",CreateJob)

router.post("/jobs/:userid", ShowUserapplication);

export default router;