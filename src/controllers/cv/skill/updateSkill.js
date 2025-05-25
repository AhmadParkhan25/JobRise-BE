import e, { request, response } from "express";
import db from "../../../connector";
import { getProfileIdByUserId } from "../../../utils/findProfileId";

async function updateSkill(req = request, res = response) {
  const skillId = parseInt(req.params.id);
  const { name, level } = req.body;
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

    const updatedSkill = await db.skills.update({
      where: {
        id: skillId,
      },
      data: {
        name: name,
        level: level,
      },
    });

    res.status(200).json({
      status: "success",
      data: updatedSkill,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}


export { updateSkill };