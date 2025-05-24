import { request, response } from "express";
import db from "../../connector";


async function deleteFavorite(req = request, res = response) {
  const userId = req.userId;
  const jobId = parseInt(req.params.id);

  try {
    // const existingFavorite = await db.favorites.findFirst({
    //   where: {
    //     userId: userId,
    //     jobId: jobId,
    //   },
    // });
    const existingFavorite = await db.favorites.findUnique({
      where: {
        id: jobId,
        userId: userId,
      },
    });

    if (!existingFavorite) {
      return res.status(404).json({
        status: "error",
        message: "Favorite not found",
      });
    }

    await db.favorites.delete({
      where: {
        id: jobId,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Favorite deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}


export { deleteFavorite };