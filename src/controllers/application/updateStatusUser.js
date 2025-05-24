import { request, response } from "express";
import db from "../../connector";

async function updateStatusUser(req = request, res = response) {
  const applicationId = parseInt(req.params.id);
  const { status } = req.body;

  try {
    const validStatuses = ["Accepted", "Screening", "Rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updateStatus = await db.applications.update({
      where: {
        id: applicationId,
      },
      data: {
        status: status,
      },
    });
    res.status(200).json({
      status: "success",
      data: updateStatus,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}


export { updateStatusUser };