import { request, response } from "express";
import db from "../../connector";
import { Status } from "@prisma/client";



async function createUserApply(req = request, res = response) {
  const userId = req.userId;
  const jobId = parseInt(req.params.id);

  try {

    const findProfile = await db.profiles.findFirst({
      where: {
        user_id: userId
      },
      select: {
        id: true,
        full_name: true,
      }
    });
    if (!findProfile) {
      return res.status(404).json({
        status: "error",
        message: `Harus isi Profile terlebih dahulu`,
      });
    }


    const response = await db.applications.create({
      data: {
        userId: userId,
        jobId: jobId,
        profileId: findProfile.id,
        name_user: findProfile.full_name,
        status: Status.Screening
      }
    })

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


export { createUserApply };