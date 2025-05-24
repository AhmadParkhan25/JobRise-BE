import { request, response } from "express";
import db from "../../connector";


async function getDetailUserApply(req = request, res = response) {
  const userId = req.userId;
  const applicationId = parseInt(req.params.id);

  try {
    const response = await db.applications.findUnique({
      where: {
        userId: userId,
        id: applicationId,
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
        job: true,
      }
    });
    if (!response) {
      return res.status(404).json({
        status: "error",
        message: `Application with ID ${userId} not found`,
      });
    };

    const formattedResponse = {
      id: response.id,
      status: response.status,
      job_id: response.job.id,
      title: response.job.title,
      company_name: response.job.company_name,
      company_logo: response.job.company_logo,
      salary_min: response.job.salary_min,
      salary_max: response.job.salary_max,
      location: response.job.location,
      job_type: response.job.job_type,
      description: response.job.description,
    };

    res.status(200).json({
      status: "success",
      data: formattedResponse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}


export { getDetailUserApply };