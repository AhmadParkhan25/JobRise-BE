import { request, response } from "express";
import db from "../../../connector";
import { getProfileIdByUserId } from "../../../utils/findProfileId";


async function deleteProject(req = request, res = response) {
  const projectId = parseInt(req.params.id);
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

    await db.projects.delete({
      where: {
        id: projectId,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export { deleteProject };