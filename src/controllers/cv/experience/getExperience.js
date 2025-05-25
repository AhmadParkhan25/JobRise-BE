import { request,response } from "express";
import db from "../../../connector";
import { getProfileIdByUserId } from "../../../utils/findProfileId";

async function getExperience(req = request, res = response) {
  const userId = req.userId;

  try {
    const profileID = await getProfileIdByUserId(userId);

    const experiences = await db.experiences.findMany({
      where: {
        profileId: profileID,
      },
      select: {
        id: true,
        title: true,
        company_name: true,
        start_date: true,
        end_date: true,
        description: true,
      },
    });

    res.status(200).json({
      status: "success",
      data: experiences,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export { getExperience };