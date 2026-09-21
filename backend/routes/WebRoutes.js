import express from "express";
import  passport from "passport";
import {
   
    HomePage,
     applicationPagemaker,
    register,
    ShowUserapplication,logout
    

   // showJob
} from "../controllers/WebController.js";

const router = express.Router();
router.use(express.static("frontend"));



router.get("/home",HomePage)
router.get("/applicationportal",applicationPagemaker)

router.post("/login",passport.authenticate("local", {
        successRedirect: "/applicationportal",
        failureRedirect: "/home"
    }))
router.post("/register",register)
router.post("/logout",logout)

router.post("/jobs/:userid", ShowUserapplication);

export default router;