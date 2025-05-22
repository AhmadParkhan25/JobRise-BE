import { request, response } from "express";
import db from "../../../connector";
import { IsActive } from "@prisma/client";

async function getJobsActive(req = request, res = response) {
  try {
    const response = await db.jobs.findMany({
      where: {
        is_active: IsActive.active,
      },
      select: {
        id: true,
        title: true,
        company_name: true,
        company_logo: true,
        salary_min: true,
        salary_max: true,
        job_type: true,
        is_active: true,
      },
    });
    res.status(201).json({
      status: "success",
      data: response,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    })
  }
}


export { getJobsActive }