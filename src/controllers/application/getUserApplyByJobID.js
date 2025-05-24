import { request, response } from "express";
import db from "../../connector";


async function getUserApplyByJobID(req = request, res = response) {
  // const userId = req.userId;
  const jobId = parseInt(req.params.id);

  try {
    const response = await db.applications.findMany({
      where: {
        // userId: userId,
        jobId: jobId,
      },
      select: {
        id: true,
        name_user: true,
        status: true,
        createdAt: true,
      }
    });

    if (!response) {
      return res.status(404).json({
        status: "error",
        message: `Application with ID ${userId} not found`,
      });
    };

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export { getUserApplyByJobID };