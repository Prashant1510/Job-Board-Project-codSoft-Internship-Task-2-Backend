import express from "express"
import { userlogin, userlogout, usersignup } from "../controllers/user.auth.controler.js";

const router = express.Router();

router.post("/usersignup", usersignup,)
router.post("/userlogin", userlogin)
router.post("/userlogout", userlogout)

export default router;
