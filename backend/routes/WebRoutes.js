import express from "express";

import {
   
    HomePage,
     applicationPagemaker,
    authorizeduser,register,
    ShowUserapplication
    

   // showJob
} from "../controllers/WebController.js";

const router = express.Router();
router.use(express.static("frontend"));



router.get("/home",HomePage)
router.get("/applicationportal",applicationPagemaker)

router.post("/login",applicationPagemaker)
router.post("/register",register)

router.post("/jobs/:userid", ShowUserapplication);

export default router;