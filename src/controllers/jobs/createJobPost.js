import { request, response } from "express";
import db from "../../connector";
import { IsActive } from "@prisma/client";



async function createJob(req = request, res = response) {
  const {title, description, salary_min, salary_max, location, job_type} = req.body;

  const userId = req.userId;

  const findNameCompany = await db.company.findUnique({
    where: {
      user_id: userId,
    },
    select: {
      id: true,
      company_name: true,
      logo: true,
    }
  });
  if (!findNameCompany){
      return res.status(404).json({
      status: "error",
      message: "User Harus isi Profile Company dahulu"
    });
    }

  const companyId = findNameCompany.id
  const companyName = findNameCompany.company_name
  const companyLogo = findNameCompany.logo

  try {
    const response = await db.jobs.create({
      data: {
        companyId: companyId,
        company_name: companyName,
        company_logo: companyLogo,
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


export { createJob };