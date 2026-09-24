import express from "express";
import  passport from "passport";
import {
   
    HomePage,
     applicationPagemaker,
    register,
    ShowUserapplication,logout,CreateJob,
    statsPage,settingPage
    

   // showJob
} from "../controllers/WebController.js";

const router = express.Router();
router.use(express.static("frontend"));



router.get("/home",HomePage)
router.get("/applicationportal",applicationPagemaker)
router.get("/statistics",statsPage)
router.get("/setting",settingPage)

router.post("/login",passport.authenticate("local", {
        successRedirect: "/applicationportal",
        failureRedirect: "/home"
    }))
router.post("/register",register)
router.post("/logout",logout)
router.post("/createjob",CreateJob)

router.post("/jobs/:userid", ShowUserapplication);

export default router;