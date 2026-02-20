import {Router} from "express";
import { getSession } from "../middleware/auth.ts";


const router = Router()


router.get("/account", getSession, async (req, res, next)=>{
    
    return res.json({
        user: req.user,
        message: "welcome to the protected route"
    })
})

export default router