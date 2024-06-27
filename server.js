import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./DB/connectTOMongoDB.js";
import userAuthRoutes from "./routes/user.auth.route.js";
import companyAuthRoutes from "./routes/company.auth.route.js";
import saveJobData from "./routes/job.route.js";
import fetchalljob from "./routes/job.route.js";
import fetchCompanyJobs from "./routes/job.route.js"
import deleteCompanyJobs  from "./routes/job.route.js";
import searchSpecificJobs from "./routes/job.route.js"
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin:true, credentials: true }));

app.use("/api/userauth", userAuthRoutes);
app.use("/api/companyauth", companyAuthRoutes);
app.use("/api/saveJobData", saveJobData);
app.use("/api/fetchCompanyPostedJob", fetchCompanyJobs);
app.use("/api/deleteCompanyPostedJob", deleteCompanyJobs);
app.use("/api/searchSpecificJob", searchSpecificJobs);


app.use("/api/fetchjobs", fetchalljob);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on ${PORT}`);
});
