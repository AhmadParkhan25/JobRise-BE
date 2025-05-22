import { Router } from "express";
import { validateMiddleUser } from "../middleware/validateMiddleUser";
import { CompanyOnly } from "../middleware/companyOnly";
import { createJob } from "../controllers/jobs/createJobPost";
import { updateJob } from "../controllers/jobs/updateJobPost";
import { statusJobPost } from "../controllers/jobs/statusJobPost";
import { getJobs } from "../controllers/jobs/getJobs";
import { getJobsDetailByID } from "../controllers/jobs/getJobDetailByID";
import { getJobsActive } from "../controllers/jobs/user/getJobsActive";


const jobsRoute = new Router();

// Create Job
jobsRoute.post('/api/jobs', validateMiddleUser, CompanyOnly, createJob);

// Update Job
jobsRoute.put('/api/jobs/:id', validateMiddleUser, CompanyOnly, updateJob);

// update status Job
jobsRoute.put('/api/jobs/status/:id', validateMiddleUser, CompanyOnly, statusJobPost);

// Get Job Detail By ID
jobsRoute.get('/api/jobs/:id', validateMiddleUser, getJobsDetailByID);

// Get Jobs
// jobsRoute.get('/api/jobs', getJobs);


// USER
// get Jobs Active
jobsRoute.get('/api/jobs-active', validateMiddleUser, getJobsActive);




export default jobsRoute