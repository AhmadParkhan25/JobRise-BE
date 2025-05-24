import { request, response } from "express";
import db from "../../connector";

async function getUserApply(req = request, res = response) {
  const userId = req.userId;
  const { page = 1, limit = 10 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  try {
    const totalApplications = await db.applications.count({
      where: {
        userId: userId,
      },
    });

    const userApplications = await db.applications.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
        job: true,
      },
      skip: skip,
      take: parseInt(limit),
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!userApplications || userApplications.length === 0) {
      return res.status(404).json({
        status: "error",
        message: `No apply Job found for user ID ${userId}`,
      });
    }

    const formattedApplications = userApplications.map((item) => ({
      id: item.id,
      status: item.status,
      createdAt: item.createdAt,
      job_id: item.job.id,
      title: item.job.title,
      company_logo: item.job.company_logo,
      salary_min: item.job.salary_min,
      salary_max: item.job.salary_max,
      location: item.job.location,
    }));

    res.status(200).json({
      status: "success",
      data: {
        applications: formattedApplications,
        totalApplications,
        totalPages: Math.ceil(totalApplications / limit),
        currentPage: parseInt(page),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export { getUserApply };
