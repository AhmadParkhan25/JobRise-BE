import { request, response } from "express";
import db from "../../connector";


async function userApplication(req = request, res = response) {
  const userId = req.userId;
  const jobId = parseInt(req.params.id);

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
    if (!findNameCompany) {
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

    if (jobsData.companyId !== findNameCompany.id) {
      return res.status(400).json({
        status: "error",
        message: "Harus di update oleh company yang sama"
      });
    }

    const applicationData = await db.application.findMany({
      where: {
        jobId: jobId
      },
      select:{
        id:true,
        name:true,
        email:true,
        phone:true,
        cv:true,
        cover_letter:true,
        createdAt:true
      }
    });

    if (!applicationData) {
      return res.status(404).json({
        status: "error",
        message: "Application tidak ditemukan"
      });
    }

    res.status(200).json({
      status: "success",
      data:{
          applicationData
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}