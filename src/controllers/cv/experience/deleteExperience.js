import { request, response } from "express";
import db from "../../../connector";
import { getProfileIdByUserId } from "../../../utils/findProfileId";

async function deleteExperience(req = request, res = response) {
  const experienceId = parseInt(req.params.id);
  const userId = req.userId;

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

    await db.experiences.delete({
      where: {
        id: experienceId,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Experience deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export { deleteExperience };