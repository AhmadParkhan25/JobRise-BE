import { request, response } from "express";
import db from "../../connector";
import axios from "axios";
import { IsActive } from "@prisma/client";

async function jobList(req = request, res = response) {
  try {
    const userId = req.userId;

    const allActiveJobs = await db.jobs.findMany({
      where: {
        is_active: IsActive.active,
      },
      select: {
        id: true,
        title: true,
        company_name: true,
        company_logo: true,
        job_type: true,
        salary_min: true,
        salary_max: true,
      }
    });

    // Kirim request GET ke ML endpoint
    const mlResponse = await axios.get(
      `https://jobrise-ml-recomendation-system-production-9992.up.railway.app/predict?user_id=${userId}&top_k=12`
    );

    // Ambil data response dari hasil ML
    const aiResponse = mlResponse.data;

    const userSkills = aiResponse.user_skills;
    console.log("User Skills from AI Response:", userSkills);

    if (!Array.isArray(userSkills) || userSkills.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "No skills found for user. Showing all active jobs.",
        data: allActiveJobs,
      });
    } else {
      return res.status(200).json({
        status: "success",
        message: "AI job recommendations based on skills.",
        data: aiResponse,
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

export { jobList };
