import { request, response } from "express";
import db from "../../../connector";
import { getProfileIdByUserId } from "../../../utils/findProfileId";


async function createEducation(req = request, res = response) {
  const { name_school, major, start_date, end_date, gpa, description } = req.body;
  const userId = req.userId

  try {

    const profileID = await getProfileIdByUserId(userId);

    const response = await db.educations.create({
      data: {
        profileId: profileID,
        name_school: name_school,
        major: major,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
        gpa: gpa,
        description: description,
      }
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


export { createEducation };