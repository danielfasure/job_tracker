import express from "express";


import * as pageController from "../controllers/pageController.js"
import * as UserController from "../controllers/userController.js"
import {requireAuth} from "../middleware/authMiddleware.js"
import * as jobController from "../controllers/jobController.js"
const router = express.Router();
router.use(express.static("frontend"));



router.get("/home",pageController.HomePage)
router.get("/",pageController.HomePage)
router.get("/applicationportal",requireAuth,pageController.applicationPage)
router.get("/statistics",requireAuth,pageController.statsPage)
router.get("/setting",requireAuth,pageController.settingPage)

router.post("/login",UserController.Loginchecker)
router.post("/register",UserController.register)
router.post("/logout",UserController.logout)
router.post("/createjob",requireAuth,jobController.CreateJob)


export default router;