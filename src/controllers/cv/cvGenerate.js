import { request, response } from "express";
import db from "../../connector";

async function getCVGenerate(req = request, res = response) {
  const userId = req.userId;

  try {
    const cvData = await db.profiles.findUnique({
      where: {
        user_id: userId,
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

    if (!cvData) {
      return res.status(404).json({
        status: "error",
        message: "data CV not found",
      });
    }

    const modifiedEducations = cvData.educations.map((edu) => ({
      ...edu,
      end_date: edu.end_date === null ? "present" : edu.end_date,
    }));

    const modifiedExperiences = cvData.experiences.map((exp) => ({
      ...exp,
      end_date: exp.end_date === null ? "present" : exp.end_date,
    }));

    const modifiedProjects = cvData.projects.map((project) => ({
      ...project,
      end_date: project.end_date === null ? "present" : project.end_date,
    }));

    const cvDataFinal = {
      ...cvData,
      educations: modifiedEducations,
      experiences: modifiedExperiences,
      projects: modifiedProjects,
    };

    res.status(200).json({
      status: "success",
      data: cvDataFinal,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export { getCVGenerate };