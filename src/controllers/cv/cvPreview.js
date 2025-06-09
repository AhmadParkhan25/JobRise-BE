import { request, response } from "express";
import db from "../../connector";

async function cvPreview(req = request, res = response) {
  const applocationId = parseInt(req.params.id);
  // const userId = req.userId;

  try {
    const findProfileID = await db.applications.findUnique({
      where: {
        id: applocationId,
      },
      select: {
        profileId: true,
      },
    });

    if (!findProfileID) {
      return res.status(404).json({
        status: "error",
        message: `Application with ID ${applocationId} not found`,
      });
    };

    const cdData = await db.profiles.findUnique({
      where: {
        id: findProfileID.profileId,
      },
      select: {
        id: true,
        full_name: true,
        email: true,
        phone: true,
        bio: true,
        linkedin: true,
        portofolio_url: true,
        city: true,
        educations: true,
        experiences: true,
        projects: true,
        skills: true,
        certifications: true,
      },
    });
    if (!cdData) {
      return res.status(404).json({
        status: "error",
        message: "data CV not found",
      });
    };

    const modifiedEducations = cdData.educations.map((edu) => ({
      ...edu,
      end_date: edu.end_date === null ? "present" : edu.end_date,
    }));

    const modifiedExperiences = cdData.experiences.map((exp) => ({
      ...exp,
      end_date: exp.end_date === null ? "present" : exp.end_date,
    }));

    const modifiedProjects = cdData.projects.map((project) => ({
      ...project,
      end_date: project.end_date === null ? "present" : project.end_date,
    }));

    const cdDataFinal = {
      ...cdData,
      educations: modifiedEducations,
      experiences: modifiedExperiences,
      projects: modifiedProjects,
    };

    res.status(200).json({
      status: "success",
      data: cdDataFinal,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export { cvPreview };