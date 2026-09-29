import {  getUserJobs,CreateJobs } from "../services/JobServices.js";
import {setUser,getuser} from "../services/userServices.js";
import {updateLoginStats, setUserFirstStats,getUserStats, increaseapplicationcount,decreaseapplicationcount} from "../services/StatsUser.js";
import  passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {Authentication, requireAuth} from "../services/authservices.js";


export async function Login(req,res){
    try {
        const {Username,Password}= req.body

        user = getuser(Username);
        const match = await bcrypt.compare(Password,user.Password)
        if (match){
            const accessToken = jwt.sign({
            "userid":user.id},
            process.env.ACESSS_TOKEN_SECRET,
            {expiresIn:'30s'})

         const refreshToken = jwt.sign({
            "userid":user.id},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'});
            res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
});


        }

        

    } catch (error) {
        cosole.error(error)
        res.redirect("/")
    }





}