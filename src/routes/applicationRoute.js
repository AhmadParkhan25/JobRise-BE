import { Router } from "express";
import { validateMiddleUser } from "../middleware/validateMiddleUser";
import { getUserApply } from "../controllers/application/getUserApply";
import { CompanyOnly } from "../middleware/companyOnly";
import { getCompanyJobs } from "../controllers/application/getCompanyJobs";

const applicationRoute = new Router();


// USER
// get User Application
applicationRoute.get('/api/application', validateMiddleUser, getUserApply );




// COMPANY
// get Jobs by company
applicationRoute.get('/api/application/jobs', validateMiddleUser, CompanyOnly, getCompanyJobs);






export default applicationRoute;