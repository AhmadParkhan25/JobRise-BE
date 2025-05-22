import { Router } from "express";
import { validateMiddleUser } from "../middleware/validateMiddleUser";
import { CompanyOnly } from "../middleware/companyOnly";
import { profileCompany, uploadCompany } from "../controllers/profiles/profileCompany";
import authRoute from "./authRoute";
import { profileUser, uploadUser } from "../controllers/profiles/profile";
import { getProfileByAuth } from "../controllers/profiles/getProfileByAuth";
import { getProfileCompanyByAuth } from "../controllers/profiles/getProfileCompanyByAuth";
import { updateProfile, uploadUpdateUser } from "../controllers/profiles/updateProfile";
import { assignUsernameToRequest } from "../middleware/assignToRequest";
import { updateCompany, uploadUpdateCompany } from "../controllers/profiles/updateCompany";

const profileRoute = new Router();

// ProfileUser
authRoute.post('/api/profile', uploadUser.single("image"), validateMiddleUser, profileUser);

// ProfileCompany
authRoute.post('/api/profile-company',uploadCompany.single("logo"), validateMiddleUser, CompanyOnly, profileCompany);

// get Profile User
authRoute.get('/api/profile', validateMiddleUser, getProfileByAuth);

// get Profile Company
authRoute.get('/api/profile-company', validateMiddleUser, CompanyOnly, getProfileCompanyByAuth);

// update Profile User
authRoute.put('/api/profile-update', validateMiddleUser, assignUsernameToRequest, uploadUpdateUser.single("image"), updateProfile);

// update Profile Company
authRoute.put('/api/profile-company-update', validateMiddleUser, CompanyOnly, uploadUpdateCompany.single("logo"), updateCompany);

export default profileRoute;