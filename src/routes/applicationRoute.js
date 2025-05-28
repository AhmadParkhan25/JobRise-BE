import { Router } from "express";
import { validateMiddleUser } from "../middleware/validateMiddleUser";
import { getUserApply } from "../controllers/application/getUserApply";
import { CompanyOnly } from "../middleware/companyOnly";
import { getUserApplyByJobID } from "../controllers/application/getUserApplyByJobID";
import { updateStatusUser } from "../controllers/application/updateStatusUser";
import { getDetailUserApply } from "../controllers/application/getDetailUserApply";
import { deletUserApplyByJobID } from "../controllers/application/deleteAllApply";

const applicationRoute = new Router();

// COMPANY
// get Jobs detail and list user apply by Auth
applicationRoute.get('/api/application/jobs/:id', validateMiddleUser, CompanyOnly, getUserApplyByJobID);

// Delete All user Apply By JobID
applicationRoute.delete('/api/application/jobs/:id', validateMiddleUser, CompanyOnly, deletUserApplyByJobID);

// update status application By Auth
applicationRoute.put('/api/application/:id/status', validateMiddleUser, CompanyOnly, updateStatusUser);


// USER
// get User Application
applicationRoute.get('/api/application', validateMiddleUser, getUserApply );

// get Jobs Detail By ID
applicationRoute.get('/api/application/:id', validateMiddleUser, getDetailUserApply);



export default applicationRoute;