import { request, response } from "express";
import db from "../connector";

const assignUsernameToRequest = async (req = request, res = response, next) => {
  try {
    const profile = await db.profiles.findFirst({
      where: {
        user_id: req.userId,
      },
      select: {
        username: true,
      },
    });

    if (!profile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    req.username = profile.username;
    console.log("Username assigned to request:", req.username);
    next();
  } catch (error) {
    console.error("Error assigning username:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const assignCompanyNameToRequest = async (req = request, res = response, next) => {
  try {
    const company = await db.company.findFirst({
      where: {
        user_id: req.userId,
      },
      select: {
        name: true,
      },
    });

    if (!company) {
      return res.status(404).json({ message: "Company profile not found" });
    }

    req.companyName = company.name;
    next();
  } catch (error) {
    console.error("Error assigning username:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export { assignUsernameToRequest, assignCompanyNameToRequest };