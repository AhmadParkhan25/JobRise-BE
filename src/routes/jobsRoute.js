import { Router } from "express";
import { validateMiddleUser } from "../middleware/validateMiddleUser";
import { CompanyOnly } from "../middleware/companyOnly";
import { createJob } from "../controllers/jobs/company/createJobPost";
import { updateJob } from "../controllers/jobs/company/updateJobPost";
import { activateJobPost, deactiveJobPost } from "../controllers/jobs/company/statusJobPost";
import { getJobsDetailByID } from "../controllers/jobs/company/getJobDetailByID";
import { getJobsActive } from "../controllers/jobs/user/getJobsActive";
import { createUserApply } from "../controllers/application/createUserApply";
import { getCompanyJobs } from "../controllers/application/getCompanyJobs";
import { jobList } from "../controllers/system_recomendation/joblist";


const jobsRoute = new Router();

// COMPANY
// Create Job
jobsRoute.post('/api/jobs', validateMiddleUser, CompanyOnly, createJob);

// get Jobs by Auth company
jobsRoute.get('/api/jobs', validateMiddleUser, CompanyOnly, getCompanyJobs);

// Get Job Detail By ID
jobsRoute.get('/api/jobs/:id', validateMiddleUser, getJobsDetailByID);

// Update Job
jobsRoute.put('/api/jobs/:id', validateMiddleUser, CompanyOnly, updateJob);

// update status to deactive Job
jobsRoute.put('/api/jobs/:id/status-deactive', validateMiddleUser, CompanyOnly, deactiveJobPost);

// update status to activate Job
jobsRoute.put('/api/jobs/:id/status-active', validateMiddleUser, CompanyOnly, activateJobPost);


// USER
// get Jobs Active featured Landing Page
jobsRoute.get('/api/jobs-featured', getJobsActive);

//  get Jobs Detail Active By ID
jobsRoute.get('/api/jobs-active/:id', validateMiddleUser, getJobsDetailByID);

// Apply Job User
jobsRoute.post('/api/jobs-active/:id/apply', validateMiddleUser, createUserApply);

// Jobs Recomendation
jobsRoute.get('/api/jobs-active', validateMiddleUser, jobList);


export default jobsRoute