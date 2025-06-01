import { request, response } from "express";
import db from "../../../connector";
import { getProfileIdByUserId } from "../../../utils/findProfileId";

async function createCertification(req = request, res = response) {
  const {  name, issued_by, year, id_credential_url, description } = req.body;
  const userId = req.userId;
  try {
    const profileID = await getProfileIdByUserId(userId);

    const response = await db.certifications.create({
      data: {
        profileId: profileID,
        name: name,
        issued_by: issued_by,
        year: year,
        id_credential_url: id_credential_url,
        description: description,
      },
    });

    res.status(201).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export { createCertification };