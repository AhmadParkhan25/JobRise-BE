import { request, response } from "express";
import db from "../../connector";


async function getFavorites(req = request, res = response) {
  const userId = req.userId;
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const totalFavorites = await db.favorites.count({
      where: {
        userId: userId,
      },
    })

    const favorites = await db.favorites.findMany({
      where: {
        userId: userId,
      },
      include: {
        job: true,
      },
      skip: offset,
      take: parseInt(limit),
      orderBy: {
        createdAt: "desc",
      },
    });

    if (favorites.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No favorites found",
      });
    }

    const formattedFavorites = favorites.map((favorite) => ({
      id: favorite.id,
      job_id: favorite.job.id,
      title: favorite.job.title,
      company_name: favorite.job.company_name,
      company_logo: favorite.job.company_logo,
      salary_min: favorite.job.salary_min,
      salary_max: favorite.job.salary_max,
      location: favorite.job.location,
      job_type: favorite.job.job_type,
      description: favorite.job.description,
    }));

    res.status(200).json({
      status: "success",
      data: {
        favorites: formattedFavorites,
        totalFavorites,
        totalPages: Math.ceil(totalFavorites / limit),
        currentPage: parseInt(page),
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}


export { getFavorites };