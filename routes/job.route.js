import express from "express";
import { saveJobIntoDb, fetchAllJobs, fetchCompanyJobs, deleteCompanyJob, searchJobs } from "../controllers/job.controler.js";
import companyProtectRoute from "../middleware/companyProtectRoute.js"
import userProtectRoute from "../middleware/userProtectRoute.js"

const router = express.Router();

router.post("/savejob", companyProtectRoute ,saveJobIntoDb)
router.get("/fetchalljobs", userProtectRoute ,fetchAllJobs)
router.get("/fetchCompanyJobs:id", companyProtectRoute, fetchCompanyJobs)
router.delete("/deleteCompanyJobs:id", companyProtectRoute, deleteCompanyJob)
router.post("/searchSpecificJobs", userProtectRoute, searchJobs)

export default router;