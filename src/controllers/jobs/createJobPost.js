import { request, response } from "express";
import db from "../../connector";
import { IsActive } from "@prisma/client";



async function jobPost(req = request, res = response) {
  const {title, description, salary_min, salary_max, location, job_type} = req.body;

  const userId = req.userId;

  const findNameCompany = await db.company.findFirst({
    where: {
      user_id: userId
    },
    select: {
      company_name,
    }
  });

  try {
    const response = await db.jobs.create({
      data: {
        company: findNameCompany.company_name,
        title: title,
        description: description,
        salary_min: salary_min,
        salary_max: salary_max,
        location: location,
        job_type: job_type,
        is_active: IsActive.active,
      }
    });
    res.status(201).json({
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


export { jobPost };