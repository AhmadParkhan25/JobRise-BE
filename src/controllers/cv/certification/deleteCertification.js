import { request, response } from "express";
import db from "../../../connector";
import { getProfileIdByUserId } from "../../../utils/findProfileId";

async function deleteCertification(req = request, res = response) {
  const certificationId = parseInt(req.params.id);
  const userId = req.userId;

  try {
    const profileID = await getProfileIdByUserId(userId);

    const certification = await db.certifications.findUnique({
      where: {
        id: certificationId,
        profileId: profileID,
      },
    });

    if (!certification) {
      return res.status(404).json({
        status: "error",
        message: "Certification not found",
      });
    }

    await db.certifications.delete({
      where: {
        id: certificationId,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Certification deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export { deleteCertification };