import { request, response } from "express";
import db from "../../../connector";
import { getProfileIdByUserId } from "../../../utils/findProfileId";

async function getSkill(req = request, res = response) {
  const userId = req.userId;
  try {
    const profileID = await getProfileIdByUserId(userId);

    const skills = await db.skills.findMany({
      where: {
        profileId: profileID,
      },
      select: {
        id: true,
        name: true,
        level: true,
      },
    });

    res.status(200).json({
      status: "success",
      data: skills,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export { getSkill };