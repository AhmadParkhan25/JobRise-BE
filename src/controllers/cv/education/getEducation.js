import { request,response } from "express";
import db from "../../../connector";
import { getProfileIdByUserId } from "../../../utils/findProfileId";


async function getEducation(req = request, res = response) {
  const userId = req.userId;

  try {
    const profileID = await getProfileIdByUserId(userId);

    const educations = await db.educations.findMany({
      where: {
        profileId: profileID,
      },
      select:{
        id: true,
        name_school: true,
        major: true,
        start_date: true,
        end_date: true,
        gpa: true,
        description: true,
      },
    });

    const modifiedEducations = educations.map((edu) => ({
      ...edu,
      end_date: edu.end_date === null ? "present" : edu.end_date,
    }));

    res.status(200).json({
      status: "success",
      data: modifiedEducations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export { getEducation };