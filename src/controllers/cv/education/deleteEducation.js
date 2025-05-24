import { request, response } from "express";
import db from "../../../connector";
import { getProfileIdByUserId } from "../../../utils/findProfileId";


async function deleteEducation(req = request, res = response) {
  const educationId = parseInt(req.params.id);
  const userId = req.userId;

  try {
    const profileID = await getProfileIdByUserId(userId);

    const existingEducation = await db.educations.findUnique({
      where: {
        id: educationId,
        profileId: profileID,
      },
    });

    if (!existingEducation) {
      return res.status(404).json({
        status: "error",
        message: "Education not found",
      });
    }

    await db.educations.delete({
      where: {
        id: educationId,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Education deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}


export { deleteEducation };