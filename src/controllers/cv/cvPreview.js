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
    }

    res.status(200).json({
      status: "success",
      data: cdData,
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