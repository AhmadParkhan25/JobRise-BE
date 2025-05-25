import { request, response } from "express";
import db from "../../../connector";
import { getProfileIdByUserId } from "../../../utils/findProfileId";

async function createProject(req = request, res = response) {
  const { title, link_url, start_date, end_date, description } = req.body;
  const userId = req.userId;
  try {
    const profileID = await getProfileIdByUserId(userId);

    const response = await db.projects.create({
      data: {
        profileId: profileID,
        title: title,
        link_url: link_url,
        start_date: start_date,
        end_date: end_date,
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

export { createProject };