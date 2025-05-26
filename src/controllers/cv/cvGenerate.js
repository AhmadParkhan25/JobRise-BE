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

    res.status(200).json({
      status: "success",
      data: cvData,
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