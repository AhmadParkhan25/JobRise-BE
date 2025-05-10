import { request, response } from "express";
import db from "../../connector";

async function getUsers(req = request, res = response) {
  try {
    const response = await db.users.findMany({
      select: {
        id: true,
        email: true,
        role: true
      }
    });
    res.status(201).json({
      status: "success",
      data: response,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    })
  }
}

export { getUsers }