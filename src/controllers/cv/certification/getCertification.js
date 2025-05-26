import { request,response } from "express";
import db from "../../../connector";
import { getProfileIdByUserId } from "../../../utils/findProfileId";

async function getCertification(req = request, res = response) {
  const userId = req.userId;
  try {
    const profileID = await getProfileIdByUserId(userId);

    const certifications = await db.certifications.findMany({
      where: {
        profileId: profileID,
      },
      select: {
        id: true,
        name: true,
        issue_by: true,
        year: true,
        id_credential_url: true,
        description: true,
      },
    });

    res.status(200).json({
      status: "success",
      data: certifications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export { getCertification };