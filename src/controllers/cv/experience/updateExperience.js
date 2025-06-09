import { request, response } from "express";
import db from "../../../connector";
import { getProfileIdByUserId } from "../../../utils/findProfileId";

async function updateExperience(req = request, res = response) {
  const experienceId = parseInt(req.params.id);
  const userId = req.userId;
  const { title, company_name, start_date, end_date, description } = req.body;

  try {
    const profileID = await getProfileIdByUserId(userId);

    const existingExperience = await db.experiences.findUnique({
      where: {
        id: experienceId,
        profileId: profileID,
      },
    });

    if (!existingExperience) {
      return res.status(404).json({
        status: "error",
        message: "Experience not found",
      });
    }

    const updatedExperience = await db.experiences.update({
      where: {
        id: experienceId,
      },
      data: {
        title,
        company_name,
        start_date: new Date(start_date),
        end_date: end_date? new Date(end_date): null,
        description,
      },
    });

    res.status(200).json({
      status: "success",
      data: updatedExperience,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export { updateExperience };