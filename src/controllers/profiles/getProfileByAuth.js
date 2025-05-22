import { request, response } from "express";
import db from "../../connector";

async function getProfileByAuth(req = request, res = response) {
  try {
    const userId = req.userId;
    const response = await db.profiles.findUnique({
      where:{
        user_id: userId,
      },
      select: {
        id: true,
        user_id: true,
        username: true,
        email: true,
        full_name: true,
        age: true,
        address: true,
        image: true,
        phone: true,
        bio: true,
        linkedin: true,
        portofolio_url: true,
        city: true,
      }
    });
    if (!response) {
      return res.status(404).json({
        status: "error",
        message: `User Profile with ID ${userId} not found`,
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

export { getProfileByAuth };