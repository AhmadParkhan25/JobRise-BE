import { request, response } from "express";
import db from "../../connector";


async function getCompanyJobs(req = request, res = response) {
  const userId = req.userId;
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const findUser = await db.company.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        id: true,
      },
    });
    if (!findUser) {
      return res.status(404).json({
        status: "error",
        message: `Harus isi Profile Company terlebih dahulu`,
      });
    }

    const totalJobs = await db.jobs.count({
      where: {
        companyId: findUser.id,
      },
    });

    const jobs = await db.jobs.findMany({
      where: {
        companyId: findUser.id,
      },
      select: {
        id: true,
        title: true,
        company_logo: true,
        location: true,
        salary_min: true,
        salary_max: true,
        is_active: true,
        _count: {
          select:{
            applications: true,
          }
        },
      },
      skip: offset,
      take: parseInt(limit),
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        status: "error",
        message: `No jobs found for Company ID ${userId}`,
      });
    };

    const formattedJobs = jobs.map((job) => ({
      id: job.id,
      title: job.title,
      company_logo: job.company_logo,
      location: job.location,
      salary_min: job.salary_min,
      salary_max: job.salary_max,
      is_active: job.is_active,
      total_apply: job._count.applications,
    }));

    res.status(200).json({
      status: "success",
      data: {
        jobs: formattedJobs,
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


export { getCompanyJobs };