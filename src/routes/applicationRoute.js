import { Router } from "express";
import { validateMiddleUser } from "../middleware/validateMiddleUser";
import { getUserApply } from "../controllers/application/getUserApply";
import { CompanyOnly } from "../middleware/companyOnly";
import { getCompanyJobs } from "../controllers/application/getCompanyJobs";
import { getUserApplyByJobID } from "../controllers/application/getUserApplyByJobID";
import { updateStatusUser } from "../controllers/application/updateStatusUser";
import { getDetailUserApply } from "../controllers/application/getDetailUserApply";
import { createUserApply } from "../controllers/application/createUserApply";

const applicationRoute = new Router();

// USER
// get User Application
applicationRoute.get('/api/application', validateMiddleUser, getUserApply );

// get Jobs Detail By ID
applicationRoute.get('/api/application/:id', validateMiddleUser, getDetailUserApply);

// Apply Job User
applicationRoute.post('/api/jobs-active/:id/apply', validateMiddleUser, createUserApply);



// COMPANY
// get Jobs by company
applicationRoute.get('/api/application/jobs', validateMiddleUser, CompanyOnly, getCompanyJobs);

// get Jobs detail and list user apply by Auth
applicationRoute.get('/api/application/jobs/:id', validateMiddleUser, CompanyOnly, getUserApplyByJobID);

// update status application By Auth
applicationRoute.put('/api/application/:id/status', validateMiddleUser, CompanyOnly, updateStatusUser);





export default applicationRoute;