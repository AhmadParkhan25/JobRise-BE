import { request, response } from "express";
import db from "../../connector";

async function getProfileCompanyByAuth(req = request, res = response) {
  try {
    const userId = req.userId;
    const response = await db.company.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        id: true,
        user_id: true,
        company_name: true,
        address: true,
        logo: true,
        website: true,
        industry: true,
        description: true,
      }
    });
    if (!response) {
      return res.status(404).json({
        status: "error",
        message: `Company Profile with ID ${userId} not found`,
      });
    };
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

export { getProfileCompanyByAuth };