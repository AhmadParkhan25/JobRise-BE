import { Router } from "express";
import { validateMiddleUser } from "../middleware/validateMiddleUser";
import { CompanyOnly } from "../middleware/companyOnly";
import { createJob } from "../controllers/jobs/createJobPost";


const jobsRoute = new Router();

// Create Job
jobsRoute.post('/api/jobs', validateMiddleUser, CompanyOnly, createJob);





export default jobsRoute