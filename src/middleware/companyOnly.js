import { request, response } from "express";
import db from "../connector";
import { Role } from "@prisma/client";

const CompanyOnly = async (req = request, res = response, next) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized. User ID not found.",
      });
    }
    const user = await db.users.findUnique({
      where:{
        id: userId
      }
    });

    if(!user){
      return res.status(404).json({
        status: "error",
        message: "User Company Not Found",
      });
    };

    if (user.role !== "company") {
      return res.status(403).json({
        status: "error",
        message: "Access Denied",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export { CompanyOnly };