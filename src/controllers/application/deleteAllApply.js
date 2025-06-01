import { request, response } from "express";
import db from "../../connector";

async function deletUserApplyByJobID(req = request, res = response) {
  const jobId = parseInt(req.params.id);

  try {
    const response = await db.applications.deleteMany({
      where: {
        jobId: jobId
      }
    });

    if (response.count === 0) {
      return res.status(404).json({
        status: "error",
        message: `No applications found for job ID ${jobId}`,
      });
    }

    res.status(200).json({
      status: "success",
      message: `${response.count} application(s) deleted`,
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

export { deletUserApplyByJobID }