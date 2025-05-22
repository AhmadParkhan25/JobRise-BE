import { request, response } from "express";
import db from "../../connector";
import { IsActive } from "@prisma/client";


async function getJobs(req = request, res = response) {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const jobs = await db.jobs.findMany({
      where: {
        is_active: IsActive.active,
      },
      skip: offset,
      take: parseInt(limit),
    });

    const totalJobs = await db.jobs.count({
      where: {
        is_active: IsActive.active,
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        jobs,
        totalJobs,
        totalPages: Math.ceil(totalJobs / limit),
        currentPage: parseInt(page),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}


export { getJobs };