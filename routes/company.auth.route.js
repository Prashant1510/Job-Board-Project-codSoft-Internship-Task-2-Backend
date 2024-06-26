import express from "express";
import { companylogin, companylogout, companysignup } from "../controllers/company.auth.controler.js";

const router = express.Router();

router.post("/companysignup", companysignup)
router.post("/companylogin", companylogin)
router.post("/companylogout", companylogout)

export default router;