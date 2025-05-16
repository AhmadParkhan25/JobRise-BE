import { request, response } from "express";
import db from "../../connector";
import { EmailVerifiedStatus } from "@prisma/client";


async function emailVerification(req = request, res = response) {
  try {
    const userId = req.userId;
    const findEmail = await db.users.findUnique({
      where: {
        id: userId
      },
      select: {
        email: true
      }
    });

    // const verificationCode = Math.floor(100000 +Math.random() * 900000).toString();
    const verificationCode = Math.floor(Math.random() * 1000000).toString();

    const response = await db.users.update({
      where: {
        id: userId
      },
      data: {
        email: findEmail.email,
        otp: verificationCode,
        email_verified: EmailVerifiedStatus.yes
      }
    });
    if (!response) {
      return res.status(404).json({
        status: "error",
        message: `User with ID ${id} not found`
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

export { emailVerification }