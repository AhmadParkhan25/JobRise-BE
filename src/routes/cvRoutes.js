import { Router } from "express";
import { validateMiddleUser } from "../middleware/validateMiddleUser";
import { createEducation } from "../controllers/cv/education/createEducation";
import { updateEducation } from "../controllers/cv/education/updateEducation";
import { deleteEducation } from "../controllers/cv/education/deleteEducation";
import { getEducation } from "../controllers/cv/education/getEducation";
import { createExperience } from "../controllers/cv/experience/createExperience";
import { updateExperience } from "../controllers/cv/experience/updateExperience";
import { deleteExperience } from "../controllers/cv/experience/deleteExperience";
import { getExperience } from "../controllers/cv/experience/getExperience";
import { createProject } from "../controllers/cv/project/createProject";
import { updateProject } from "../controllers/cv/project/updateProject";
import { deleteProject } from "../controllers/cv/project/deleteProject";
import { getProject } from "../controllers/cv/project/getProject";
import { createSkill } from "../controllers/cv/skill/createSkill";
import { updateSkill } from "../controllers/cv/skill/updateSkill";
import { deleteSkill } from "../controllers/cv/skill/deleteSkill";
import { getSkill } from "../controllers/cv/skill/getSkill";
import { createCertification } from "../controllers/cv/certification/createCertification";
import { updateCertification } from "../controllers/cv/certification/updateCertification";
import { deleteCertification } from "../controllers/cv/certification/deleteCertification";
import { getCertification } from "../controllers/cv/certification/getCertification";


const cvRoute = new Router();

// =========================
// Education
// =========================
cvRoute.post("/api/cv/education", validateMiddleUser, createEducation);
cvRoute.put("/api/cv/education/:id", validateMiddleUser, updateEducation);
cvRoute.delete("/api/cv/education/:id", validateMiddleUser, deleteEducation);
cvRoute.get("/api/cv/education", validateMiddleUser, getEducation);

// =========================
// Experience
// =========================
cvRoute.post("/api/cv/experience", validateMiddleUser, createExperience);
cvRoute.put("/api/cv/experience/:id", validateMiddleUser, updateExperience);
cvRoute.delete("/api/cv/experience/:id", validateMiddleUser, deleteExperience);
cvRoute.get("/api/cv/experience", validateMiddleUser, getExperience);

// =========================
// Project
// =========================
cvRoute.post("/api/cv/project", validateMiddleUser, createProject);
cvRoute.put("/api/cv/project/:id", validateMiddleUser, updateProject);
cvRoute.delete("/api/cv/project/:id", validateMiddleUser, deleteProject);
cvRoute.get("/api/cv/project", validateMiddleUser, getProject);

// =========================
// Skill
// =========================
cvRoute.post("/api/cv/skill", validateMiddleUser, createSkill);
cvRoute.put("/api/cv/skill/:id", validateMiddleUser, updateSkill);
cvRoute.delete("/api/cv/skill/:id", validateMiddleUser, deleteSkill);
cvRoute.get("/api/cv/skill", validateMiddleUser, getSkill);

// =========================
// Certification
// =========================
cvRoute.post("/api/cv/certification", validateMiddleUser, createCertification);
cvRoute.put("/api/cv/certification/:id", validateMiddleUser, updateCertification);
cvRoute.delete("/api/cv/certification/:id", validateMiddleUser, deleteCertification);
cvRoute.get("/api/cv/certification", validateMiddleUser, getCertification);

export default cvRoute;