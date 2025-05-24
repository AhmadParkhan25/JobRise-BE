import { request, response } from "express";
import db from "../../../connector";

async function getJobsDetailByID(req = request, res = response) {
  const jobId = parseInt(req.params.id);

  try {
    const response = await db.jobs.findUnique({
      where: {
        id: jobId,
      },
      select:{
        id: true,
        companyId: true,
        title: true,
        company_name: true,
        company_logo: true,
        salary_min: true,
        salary_max: true,
        location: true,
        job_type: true,
        description: true,
        is_active: true,
      },
    });

    if (!response) {
      return res.status(404).json({
        status: "error",
        message: `Job with ID ${jobId} not found`,
      });
    }

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

export { getJobsDetailByID };