import { request, response } from "express";
import db from "../../../connector";
import { IsActive } from "@prisma/client";


async function deactiveJobPost(req = request, res = response) {
  const jobId = parseInt(req.params.id);

  try {
    const statusJob = await db.jobs.findUnique({
      where:{
        id: jobId,
        is_active: IsActive.active
      }
    })
    if (!statusJob || statusJob.is_active === IsActive.deactive) {
      return res.status(404).json({
        status: "error",
        message: "Job tidak ditemukan / job sudah tidak aktif"
      });
    }
    const response = await db.jobs.update({
      where:{
        id: jobId,
      },
      data:{
        is_active: IsActive.deactive
      }
    });
    res.status(200).json({
      status: "success",
      message: "Job berhasil di non aktifkan",
      job_id: response.id,
      is_active: response.is_active,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}

async function activateJobPost(req = request, res = response) {
  const jobId = parseInt(req.params.id);

  try {
    const statusJob = await db.jobs.findUnique({
      where:{
        id: jobId,
        is_active: IsActive.deactive
      }
    })
    if (!statusJob || statusJob.is_active === IsActive.active) {
      return res.status(404).json({
        status: "error",
        message: "Job tidak ditemukan / job sudah aktif"
      });
    }
    const response = await db.jobs.update({
      where:{
        id: jobId,
      },
      data:{
        is_active: IsActive.active
      }
    });
    res.status(200).json({
      status: "success",
      message: "Job berhasil di aktifkan",
      job_id: response.id,
      is_active: response.is_active,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}


export { deactiveJobPost, activateJobPost };