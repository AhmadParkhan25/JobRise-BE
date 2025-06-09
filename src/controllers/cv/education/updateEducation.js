import { request, response } from "express";
import db from "../../../connector";
import { getProfileIdByUserId } from "../../../utils/findProfileId";

async function updateEducation(req = request, res = response) {
  const educationId = parseInt(req.params.id);
  const { name_school, major, start_date, end_date, gpa, description } = req.body;
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

    const response = await db.educations.update({
      where: {
        id: educationId,
      },
      data: {
        profileId: profileID,
        name_school: name_school,
        major: major,
        start_date: new Date(start_date),
        end_date: end_date? new Date(end_date): null,
        gpa: gpa,
        description: description,
      }
    });
    
    res.status(200).json({
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

export { updateEducation };