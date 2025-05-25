import { request, response } from "express";
import db from "../../../connector";
import { getProfileIdByUserId } from "../../../utils/findProfileId";

async function deleteSkill(req = request, res = response) {
  const skillId = parseInt(req.params.id);
  const userId = req.userId;

  try {
    const profileID = await getProfileIdByUserId(userId);

    const existingSkill = await db.skills.findUnique({
      where: {
        id: skillId,
        profileId: profileID,
      },
    });

    if (!existingSkill) {
      return res.status(404).json({
        status: "error",
        message: "Skill not found",
      });
    }

    await db.skills.delete({
      where: {
        id: skillId,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Skill deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export { deleteSkill };