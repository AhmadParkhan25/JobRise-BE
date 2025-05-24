import { request, response } from "express";
import db from "../../connector";

async function createFavorite(req = request, res = response) {
  const userId = req.userId;
  const jobId = parseInt(req.params.id);

  try {
    const existingFavorite = await db.favorites.findFirst({
      where: {
        userId: userId,
        jobId: jobId,
      },
    });

    if (existingFavorite) {
      return res.status(400).json({
        status: "error",
        message: "Job already favorited",
      });
    }

    const response = await db.favorites.create({
      data: {
        userId: userId,
        jobId: jobId,
      },
    });

    res.status(201).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}


export { createFavorite };