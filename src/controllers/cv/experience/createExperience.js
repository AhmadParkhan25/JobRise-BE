import { request, response } from "express";
import db from "../../../connector";
import { getProfileIdByUserId } from "../../../utils/findProfileId";

async function createExperience(req = request, res = response) {
  const { title, company_name, start_date, end_date, description } = req.body;
  const userId = req.userId;

  try {
    const profileID = await getProfileIdByUserId(userId);

    const response = await db.experiences.create({
      data: {
        profileId: profileID,
        title: title,
        company_name: company_name,
        start_date: new Date(start_date),
        end_date: new Date(end_date),
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


export { createExperience };