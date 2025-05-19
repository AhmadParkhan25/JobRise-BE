import { Router } from "express";
import { validateMiddleUser } from "../middleware/validateMiddleUser";
import { CompanyOnly } from "../middleware/companyOnly";
import { profileCompany, uploadCompany } from "../controllers/profiles/profileCompany";
import authRoute from "./authRoute";
import { profileUser, uploadUser } from "../controllers/profiles/profile";

const profileRoute = new Router();

// ProfileUser
// authRoute.post('/api/profile', upload.single("image"), validateMiddleUser, profileUser );
authRoute.post('/api/profile', uploadUser.single("image"), validateMiddleUser, profileUser);

// ProfileCompany
authRoute.post('/api/profile-company',uploadCompany.single("logo"), validateMiddleUser, CompanyOnly, profileCompany);

export default profileRoute;