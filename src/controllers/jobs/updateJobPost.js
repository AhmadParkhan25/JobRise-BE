import { request, response } from "express";
import db from "../../connector";
import { IsActive } from "@prisma/client";

async function updateJob(req = request, res = response) {
  const { title, description, salary_min, salary_max, location, job_type } =
    req.body;
  const jobId = parseInt(req.params.id)

  const userId = req.userId;

  try {
    const findNameCompany = await db.company.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        id: true,
        company_name: true,
        user_id: true
      }
    });
    if (!findNameCompany){
      return res.status(404).json({
      status: "error",
      message: "User Harus isi Profile Company dahulu"
    });
    }

    const jobsData = await db.jobs.findUnique({
      where: {
        id: jobId
      },
      select: {
        id: true,
        companyId: true,
      }
    });

    if (!jobsData) {
    return res.status(404).json({
      status: "error",
      message: "Job tidak ditemukan"
    });
  }

    if(jobsData.companyId !== findNameCompany.id){
      return res.status(400).json({
        status: "error",
        message: "Harus di update oleh company yang sama"
      });
    }

    const companyId = findNameCompany.id;
    const companyName = findNameCompany.company_name;

    const response = await db.jobs.update({
      where: {
        id: jobId
      },
      data: {
        companyId: companyId,
        company_name: companyName,
        title: title,
        description: description,
        salary_min: salary_min,
        salary_max: salary_max,
        location: location,
        job_type: job_type,
        is_active: IsActive.active,
      },
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


export { updateJob };