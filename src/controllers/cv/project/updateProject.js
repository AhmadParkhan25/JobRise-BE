import { request, response } from "express";
import db from "../../../connector";
import { getProfileIdByUserId } from "../../../utils/findProfileId";

async function updateProject(req = request, res = response) {
  const projectId = parseInt(req.params.id);
  const { title, link_url, start_date, end_date, description } = req.body;
  const userId = req.userId;

  try {
    const profileID = await getProfileIdByUserId(userId);

    const existingProject = await db.projects.findUnique({
      where: {
        id: projectId,
        profileId: profileID,
      },
    });

    if (!existingProject) {
      return res.status(404).json({
        status: "error",
        message: "Project not found",
      });
    }

    const updatedProject = await db.projects.update({
      where: {
        id: projectId,
      },
      data: {
        title: title,
        link_url: link_url,
        start_date: start_date,
        end_date: end_date,
        description: description,
      },
    });

    res.status(200).json({
      status: "success",
      data: updatedProject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export { updateProject };