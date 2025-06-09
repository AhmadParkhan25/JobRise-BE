import e, { request,response } from "express";
import db from "../../../connector";
import { getProfileIdByUserId } from "../../../utils/findProfileId";


async function getProject(req = request, res = response) {
  const userId = req.userId;

  try {
    const profileID = await getProfileIdByUserId(userId);

    const projects = await db.projects.findMany({
      where: {
        profileId: profileID,
      },
      select: {
        id: true,
        title: true,
        link_url: true,
        start_date: true,
        end_date: true,
        description: true,
      },
    });

    const modifiedProjects = projects.map((project) => ({
      ...project,
      end_date: project.end_date === null ? "present" : project.end_date,
    }));

    res.status(200).json({
      status: "success",
      data: modifiedProjects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export { getProject };