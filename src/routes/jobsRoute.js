import { Router } from "express";
import { validateMiddleUser } from "../middleware/validateMiddleUser";
import { CompanyOnly } from "../middleware/companyOnly";
import { createJob } from "../controllers/jobs/createJobPost";
import { updateJob } from "../controllers/jobs/updateJobPost";
import { statusJobPost } from "../controllers/jobs/statusJobPost";
import { getJobsDetailByID } from "../controllers/jobs/getJobDetailByID";
import { getJobsActive } from "../controllers/jobs/user/getJobsActive";


const jobsRoute = new Router();

// COMPANY
// Create Job
jobsRoute.post('/api/jobs', validateMiddleUser, CompanyOnly, createJob);

// Update Job
jobsRoute.put('/api/jobs/:id', validateMiddleUser, CompanyOnly, updateJob);

// update status Job
jobsRoute.put('/api/jobs/:id/status', validateMiddleUser, CompanyOnly, statusJobPost);

// Get Job Detail By ID
jobsRoute.get('/api/jobs/:id', validateMiddleUser, getJobsDetailByID);


// USER
// get Jobs Active
jobsRoute.get('/api/jobs-active', validateMiddleUser, getJobsActive);

//  get Jobs Detail Active By ID
jobsRoute.get('/api/jobs-active/:id', validateMiddleUser, getJobsDetailByID);




export default jobsRoute