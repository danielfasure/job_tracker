import express from "express";

import {
   
   
    
    register,
    ShowUserapplication,logout,CreateJob,
    statsPage,settingPage
    

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

router.post("/login",LoginPage)
router.post("/register",register)
router.post("/logout",logout)
router.post("/createjob",CreateJob)

router.post("/jobs/:userid", ShowUserapplication);

export default router;